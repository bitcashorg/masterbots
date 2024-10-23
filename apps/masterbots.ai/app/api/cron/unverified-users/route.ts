import { NextResponse } from 'next/server'
import { getHasuraClient } from 'mb-lib'
import { sendEmailVerification } from '@/lib/email'
import crypto from 'node:crypto'

export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

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
                fourteenDaysAgo.getTime() + 24 * 60 * 60 * 1000
              ).toISOString()
            }
          }
        },
        userId: true,
        email: true,
        dateJoined: true
      }
    })

    // * Send reminder emails to users approaching the 15-day limit
    for (const unverifiedUser of user) {
      const verificationToken = crypto.randomBytes(32).toString('hex')
      const tokenExpiry = new Date(now)
      tokenExpiry.setDate(tokenExpiry.getDate() + 1) // 24-hour expiry for final reminder

      // * Creates new verification token
      await client.mutation({
        insertToken: {
          __args: {
            objects: [
              {
                token: verificationToken,
                tokenExpiry: tokenExpiry.toISOString(),
                type: 'email_verification'
              }
            ]
          }
        },
        insertUserToken: {
          __args: {
            objects: [
              {
                userId: unverifiedUser.userId,
                token: verificationToken
              }
            ]
          }
        }
      })

      // * Sends final reminder email
      await sendEmailVerification(
        unverifiedUser.email,
        verificationToken,
        'FINAL REMINDER: Verify your email or your account will be deleted in 15 days'
      )
    }

    //* Delete users who haven't verified after 15 days
    const { deleteUser } = await client.mutation({
      deleteUser: {
        __args: {
          where: {
            isVerified: { _eq: false },
            dateJoined: { _lt: fifteenDaysAgo.toISOString() }
          }
        },
        returning: {
          userId: true,
          email: true
        }
      }
    })

    return NextResponse.json({
      message: 'Cron job completed successfully',
      remindersSent: user.length,
      usersDeleted: deleteUser?.returning.length
    })
  } catch (error) {
    console.error('Error in unverified users cron job:', error)
    return NextResponse.json(
      { error: 'Failed to process unverified users' },
      { status: 500 }
    )
  }
}
