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

  // * Check if user exists
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

  // * Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex')
  const resetTokenExpiry = new Date(Date.now() + 3600000) //* 1 hour from activation

  // * Store reset token in the database
  try {
    await client.mutation({
      updateUser: {
        __args: {
          where: {
            email: {
              _eq: email
            }
          },
          _set: {
            resetToken,
            resetTokenExpiry
          }
        },
        affected_rows: true
      }
    })

    // * Send password reset email
    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json(
      { message: 'Password reset email sent' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error initiating password reset:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
