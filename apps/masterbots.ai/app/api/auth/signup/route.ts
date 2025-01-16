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

		// * Generate verification token
		const verificationToken = crypto.randomBytes(32).toString('hex')
		const tokenExpiry = new Date()
		tokenExpiry.setDate(tokenExpiry.getDate() + 15) // 15 days to verify

		// * Insert new user
		const { insertUserOne } = await client.mutation({
			insertUserOne: {
				__args: {
					object: {
						email,
						username: newUsername,
						slug: toSlug(newUsername),
						password: hashedPassword,
						profilePicture:
							'https://api.dicebear.com/9.x/identicon/svg?seed=' + newUsername,
						dateJoined: new Date().toISOString(),
					},
				},
				userId: true,
			},
		})

		if (insertUserOne) {
			// * First create the token
			const { insertTokenOne } = await client.mutation({
				insertTokenOne: {
					__args: {
						object: {
							token: verificationToken,
							tokenExpiry: tokenExpiry.toISOString(),
						},
					},
					token: true,
					tokenExpiry: true,
				},
			})

			if (insertTokenOne) {
				// * Then create the user-token relationship
				await client.mutation({
					insertUserTokenOne: {
						__args: {
							object: {
								userId: insertUserOne.userId,
								token: verificationToken,
							},
						},
						userId: true,
						token: true,
					},
				})

				// * Send verification email
				await sendEmailVerification(email, verificationToken)

				return NextResponse.json(
					{
						message:
							'User created successfully. Please check your email to verify your account.',
						userId: insertUserOne.userId,
						requiresVerification: true,
					},
					{ status: 201 },
				)
			}
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
