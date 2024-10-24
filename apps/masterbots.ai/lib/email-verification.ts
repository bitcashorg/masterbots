import { getHasuraClient } from 'mb-lib'
import { getAppUrl, sendEmailVerification } from './email'
import crypto from 'node:crypto'

export async function handleUnverifiedUsers() {
  const client = getHasuraClient()

  try {
    // * Get users who haven't verified their email within 15 days
    const fifteenDaysAgo = new Date()
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15)

    const { user } = await client.query({
      user: {
        __args: {
          where: {
            isVerified: { _eq: false },
            dateJoined: { _lt: fifteenDaysAgo.toISOString() }
          }
        },
        userId: true,
        email: true
      }
    })

    // * Delete unverified users
    if (user.length > 0) {
      await client.mutation({
        deleteUser: {
          __args: {
            where: {
              userId: { _in: user.map(u => u.userId) }
            }
          },
          returning: {
            userId: true
          }
        }
      })
    }

    return { deletedUsers: user.length }
  } catch (error) {
    console.error('Error handling unverified users:', error)
    throw error
  }
}

export async function sendVerificationEmail(email: string, userId: string) {
  const client = getHasuraClient()

  try {
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const tokenExpiry = new Date()
    tokenExpiry.setDate(tokenExpiry.getDate() + 15) // 15 days expiry

    // * First create the token
    const { insertTokenOne } = await client.mutation({
      insertTokenOne: {
        __args: {
          object: {
            token: verificationToken,
            tokenExpiry: tokenExpiry.toISOString()
          }
        },
        token: true
      }
    })

    if (insertTokenOne) {
      // * Then create the user-token relationship
      await client.mutation({
        insertUserTokenOne: {
          __args: {
            object: {
              userId,
              token: verificationToken
            }
          },
          userId: true,
          token: true
        }
      })

      // * Send verification email
      const baseUrl = getAppUrl()
      const verificationUrl = `${baseUrl}/auth/verify?token=${verificationToken}`
      await sendEmailVerification(email, verificationUrl)
    }

    return true
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
}