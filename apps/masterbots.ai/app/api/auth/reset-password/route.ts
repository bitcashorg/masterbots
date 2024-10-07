import { getHasuraClient } from 'mb-lib'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()

  if (!token || !password) {
    return NextResponse.json(
      { error: 'Token and password are required' },
      { status: 400 }
    )
  }

  const client = getHasuraClient()

  // * Finds user with the reset token
  const { user } = await client.query({
    user: {
      __args: {
        where: {
          resetToken: {
            _eq: token
          },
          resetTokenExpiry: {
            _gt: new Date().toISOString()
          }
        }
      },
      userId: true
    }
  })

  if (!user.length) {
    return NextResponse.json(
      { error: 'Invalid or expired reset token' },
      { status: 400 }
    )
  }

  // * Hash the new password
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)

  // * Updates the user's password and clear the reset token
  try {
    await client.mutation({
      updateUser: {
        __args: {
          where: {
            userId: {
              _eq: user[0].userId
            }
          },
          _set: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
          }
        },
        affected_rows: true
      }
    })

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}