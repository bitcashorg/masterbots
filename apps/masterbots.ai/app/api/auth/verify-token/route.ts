'use server'

import crypto from 'node:crypto'
import { sendEmailVerification } from '@/lib/email'
import { getHasuraClient } from 'mb-lib'
import { type NextRequest, NextResponse } from 'next/server'

// * You can also force server runtime if needed
// export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
	try {
		const { userId, email, jwt } = await req.json()

		if (!jwt) {
			return NextResponse.json(
				{ error: 'Authentication required to create verification token' },
				{ status: 401 },
			)
		}

		if (!userId || !email) {
			return NextResponse.json(
				{ error: 'Missing required fields: userId or email' },
				{ status: 400 },
			)
		}

		const client = getHasuraClient()

		// Generate verification token
		const expiryDays = 15
		const verificationToken = crypto.randomBytes(32).toString('hex')
		const tokenExpiry = new Date()
		tokenExpiry.setDate(tokenExpiry.getDate() + expiryDays)

		// First create the token
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

		if (!insertTokenOne) {
			return NextResponse.json(
				{ error: 'Failed to insert verification token' },
				{ status: 500 },
			)
		}

		// Then create the user-token relationship
		await client.mutation({
			insertUserTokenOne: {
				__args: {
					object: {
						userId,
						token: verificationToken,
					},
				},
				userId: true,
				token: true,
			},
		})

		// (Optional) Send verification email here
		await sendEmailVerification(email, verificationToken)

		return NextResponse.json(
			{
				success: true,
				message:
					'Verification link has been sent to your email, check your inbox to continue',
				token: verificationToken,
			},
			{ status: 200 },
		)
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error('Error in verify-token API route:', error)
		return NextResponse.json(
			{
				success: false,
				error:
					error.message ||
					'An error occurred while creating verification token',
			},
			{ status: 500 },
		)
	}
}
