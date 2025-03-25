'use server'

import crypto from 'node:crypto'
import { sendEmailVerification } from '@/lib/email'
import { generateUsername } from '@/lib/username'
import bcryptjs from 'bcryptjs'
import { getHasuraClient, toSlug } from 'mb-lib'
import { type NextRequest, NextResponse } from 'next/server'

// * Add explicit runtime configuration
// export const runtime = 'edge'

export async function POST(req: NextRequest) {
	const { email, password, username } = await req.json()

	if (!email || !password) {
		return NextResponse.json(
			{ error: 'Missing email or password' },
			{ status: 400 },
		)
	}

	const client = getHasuraClient()

	try {
		// * Check if user exists
		const { user } = await client.query({
			user: {
				__args: {
					where: {
						_or: [{ email: { _eq: email } }, { username: { _eq: username } }],
					},
				},
				username: true,
				email: true,
			},
		})

		if (user.length && user[0].username === username) {
			return NextResponse.json(
				{ error: 'Username is already taken' },
				{ status: 409 },
			)
		}
		if (user.length && user[0].email === email) {
			return NextResponse.json(
				{ error: 'Email is already registered' },
				{ status: 409 },
			)
		}

		// * Generate unique username if needed
		let foundFreeUsername = false
		let newUsername = generateUsername(username)

		while (!foundFreeUsername) {
			const { user } = await client.query({
				user: {
					__args: {
						where: {
							username: { _eq: newUsername },
						},
					},
					username: true,
				},
			})

			if (!user.length) {
				foundFreeUsername = true
			} else {
				newUsername = generateUsername(username)
			}
		}

		// * Hash password
		const salt = await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		// * Insert new user with isVerified=true (bypass email verification)
		const { insertUserOne } = await client.mutation({
			insertUserOne: {
				__args: {
					object: {
						email,
						username: newUsername,
						slug: toSlug(newUsername),
						password: hashedPassword,
						profilePicture: `https://api.dicebear.com/9.x/identicon/svg?seed=${newUsername}`,
						dateJoined: new Date().toISOString(),
						isVerified: true, // Set as verified directly
						lastLogin: new Date().toISOString(), // Set initial login timestamp
					},
				},
				userId: true,
			},
		})

		if (insertUserOne) {
			// Skip email verification and simply return success with credentials
			// This allows the frontend to auto-login after signup
			return NextResponse.json(
				{
					message: 'User created successfully.',
					userId: insertUserOne.userId,
					requiresVerification: false, // No verification needed
					username: newUsername,
					email: email,
					success: true,
				},
				{ status: 201 },
			)
		}

		return NextResponse.json(
			{ error: 'Failed to create user' },
			{ status: 500 },
		)
	} catch (error) {
		console.error('Error creating user:', error)
		return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
	}
}
