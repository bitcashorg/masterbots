'use server'

import crypto from 'node:crypto'
import { insertAdminUserPreferences } from '@/app/actions/admin.actions'
import { sendEmailVerification } from '@/lib/email'
import { generateUsername } from '@/lib/username'
import { delayFetch } from '@/lib/utils'
import bcryptjs from 'bcryptjs'
import { appConfig } from 'mb-env'
import { getHasuraClient, toSlug } from 'mb-lib'
import { type NextRequest, NextResponse } from 'next/server'

// * Add explicit runtime configuration
// export const runtime = 'edge'

export async function POST(req: NextRequest) {
	const { email, password, username } = await req.json()
	let newUsername = username || email.split('@')[0]

	if (!email || !password) {
		return NextResponse.json(
			{ error: 'Missing email or password' },
			{ status: 400 },
		)
	}

	const client = getHasuraClient()

	try {
		// * Check if user email exists
		const { user } = await client.query({
			user: {
				__args: {
					where: {
						_or: [{ email: { _eq: email } }],
					},
				},
				username: true,
				email: true,
			},
		})

		if (user.length && user[0].email === email) {
			return NextResponse.json(
				{ error: 'Email is already registered' },
				{ status: 409 },
			)
		}

		// * Generate unique username if needed
		let foundFreeUsername = false
		newUsername = generateUsername(newUsername)
		let sequence = 0

		while (!foundFreeUsername) {
			if (sequence > 0) {
				newUsername = `${newUsername}${sequence}`
			}

			await delayFetch(100)
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
				newUsername = generateUsername(newUsername)
			}

			sequence++
		}

		// * Hash password
		const salt = await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		try {
			// * Insert new user
			const { insertUserOne } = await client.mutation({
				insertUserOne: {
					__args: {
						object: {
							email,
							username: newUsername,
							slug: toSlug(newUsername),
							password: hashedPassword,
							// profilePicture: `https://api.dicebear.com/9.x/identicon/svg?seed=${newUsername}`,
							profilePicture: `https://robohash.org/${newUsername}?bgset=bg2`,
							dateJoined: new Date().toISOString(),
							isVerified: true, // Set as verified directly
							lastLogin: new Date().toISOString(), // Set initial login timestamp
						},
					},
					userId: true,
				},
			})

			if (!insertUserOne) {
				throw new Error(
					'Failed to create your account, either the email or username is already taken.',
				)
			}

			const insertPreferenceResults = await insertAdminUserPreferences({
				userId: insertUserOne.userId,
				preferencesSet: {
					// * Default preferences
					webSearch: false,
					deepExpertise: false,
					preferredComplexity: 'general',
					preferredLength: 'detailed',
					preferredTone: 'neutral',
					preferredType: 'mix',
				},
			})

			if (!insertPreferenceResults) {
				// console.error('Failed to create your account ——> ', error)
				throw new Error(
					'Failed to create your account, an error occurred while creating your profile.',
				)
			}

			if (!appConfig.features.enableVerificationEmail) {
				console.info(
					'🔵 Verification email is disabled. Skipping email verification.',
				)
				return NextResponse.json(
					{
						message: 'User created successfully. Now logging you in...',
						userId: insertUserOne.userId,
						requiresVerification: false,
					},
					{ status: 201 },
				)
			}

			// * Generate verification token
			const verificationToken = crypto.randomBytes(32).toString('hex')
			const tokenExpiry = new Date()
			tokenExpiry.setDate(tokenExpiry.getDate() + 15) // 15 days to verify

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
		} catch (error) {
			console.error('Error creating user:', error)
			return NextResponse.json(
				{ error: (error as Error).message },
				{ status: 500 },
			)
		}
	} catch (error) {
		console.error('Error creating user:', error)
		return NextResponse.json(
			{
				error: 'An error occurred while attempting to create your new account.',
			},
			{ status: 500 },
		)
	}
}
