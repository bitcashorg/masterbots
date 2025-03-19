import crypto from 'node:crypto'
import { sendEmailVerification } from '@/lib/email'
import { getHasuraClient } from 'mb-lib'
import { NextResponse } from 'next/server'

export async function GET() {
	const client = getHasuraClient()

	try {
		const now = new Date()
		const fifteenDaysAgo = new Date(now)
		fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15)

		const fourteenDaysAgo = new Date(now)
		fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

		// * Find users who registered ~14 days ago and haven't verified
		const { user } = await client.query({
			user: {
				__args: {
					where: {
						isVerified: { _eq: false },
						dateJoined: {
							_gte: fourteenDaysAgo.toISOString(),
							_lt: new Date(
								fourteenDaysAgo.getTime() + 24 * 60 * 60 * 1000,
							).toISOString(),
						},
					},
				},
				userId: true,
				email: true,
				dateJoined: true,
			},
		})

		// * Send reminder emails to users approaching the 15-day limit
		const reminderResults = await Promise.allSettled(
			user.map(async (unverifiedUser) => {
				try {
					const verificationToken = crypto.randomBytes(32).toString('hex')
					const tokenExpiry = new Date(now)
					tokenExpiry.setDate(tokenExpiry.getDate() + 1) // 24-hour expiry for final reminder

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
						},
					})

					if (insertTokenOne) {
						// * create the user-token relationship
						await client.mutation({
							insertUserTokenOne: {
								__args: {
									object: {
										userId: unverifiedUser.userId,
										token: verificationToken,
									},
								},
								userId: true,
								token: true,
							},
						})

						// * Send final reminder email
						await sendEmailVerification(
							unverifiedUser.email,
							verificationToken,
							'FINAL REMINDER: Verify your email or your account will be blocked tomorrow',
						)

						return { success: true, email: unverifiedUser.email }
					}
				} catch (error) {
					console.error(
						`Failed to process reminder for user ${unverifiedUser.email}:`,
						error,
					)
					return { success: false, email: unverifiedUser.email, error }
				}
			}),
		)

		// * Block users who haven't verified after 15 days instead of deleting them
		const { updateUser } = await client.mutation({
			updateUser: {
				__args: {
					where: {
						isVerified: { _eq: false },
						dateJoined: { _lt: fifteenDaysAgo.toISOString() },
						isBlocked: { _eq: false }, // ? Only update users who aren't already blocked
					},
					_set: {
						isBlocked: true,
					},
				},
				returning: {
					userId: true,
					email: true,
				},
			},
		})

		// * Clean up any expired tokens
		await client.mutation({
			deleteToken: {
				__args: {
					where: {
						tokenExpiry: { _lt: now.toISOString() },
					},
				},
			},
		})

		// * Process results
		const successfulReminders = reminderResults.filter(
			(result) => result.status === 'fulfilled' && result.value?.success,
		).length
		const failedReminders = reminderResults.filter(
			(result) => result.status === 'rejected' || !result.value?.success,
		).length

		return NextResponse.json({
			message: 'Cron job completed successfully',
			remindersSent: {
				successful: successfulReminders,
				failed: failedReminders,
				total: user.length,
			},
			usersBlocked: updateUser?.returning?.length || 0,
			timestamp: now.toISOString(),
		})
	} catch (error) {
		console.error('Error in unverified users cron job:', error)
		return NextResponse.json(
			{
				error: 'Failed to process unverified users',
				details: process.env.NODE_ENV === 'development' ? error : undefined,
				timestamp: new Date().toISOString(),
			},
			{ status: 500 },
		)
	}
}
