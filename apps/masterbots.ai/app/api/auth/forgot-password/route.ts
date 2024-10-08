import { getHasuraClient } from 'mb-lib'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const client = getHasuraClient()

  // * Checks if user exists
  const { user } = await client.query({
    user: {
      __args: {
        where: {
          email: {
            _eq: email
          }
        }
      },
      userId: true,
      email: true
    }
  })

  if (!user.length) {
    return NextResponse.json(
      {
        message:
          'If an account with that email exists, we have sent a password reset link'
      },
      { status: 200 }
    )
  }

  // * Generates reset token
  const resetToken = crypto.randomBytes(32).toString('hex')
  const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

  try {
    const result = await client.mutation({
      insertToken: {
        __args: {
          objects: [
            {
              token: resetToken,
              tokenExpiry: resetTokenExpiry
            }
          ]
        },
        returning: {
          token: true,
          tokenExpiry: true
        }
      },
      insertUserToken: {
        __args: {
          objects: [
            {
              userId: user[0].userId,
              token: resetToken
            }
          ]
        },
        returning: {
          userId: true,
          token: true
        }
      }
    })

    if (
      !result.insertToken?.returning.length ||
      !result.insertUserToken?.returning.length
    ) {
      throw new Error('Failed to insert token')
    }

    // * Send password reset email
    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json(
      { message: 'Password reset email sent' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error initiating password reset:', error)
    return NextResponse.json(
      { error: 'An error occurred while sending the reset email' },
      { status: 500 }
    )
  }
}
