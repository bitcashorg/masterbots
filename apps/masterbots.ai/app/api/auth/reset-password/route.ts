import { getHasuraClient } from 'mb-lib'
import { type  NextRequest, NextResponse } from 'next/server'
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

  try {
    // * Finds token and associated user
    const { userToken } = await client.query({
      userToken: {
        __args: {
          where: {
            token: { _eq: token },
            tokenByToken: {
              tokenExpiry: { _gt: new Date().toISOString() }
            }
          },
          limit: 1
        },
        token: true,
        userId: true,
        tokenByToken: {
          tokenExpiry: true
        },
        user: {
          userId: true
        }
      }
    })

    if (!userToken || !userToken[0]) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    const userId = userToken[0].userId

    // * Hash the new password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // * Update the user's password
    const updateUserResult = await client.mutation({
      updateUser: {
        __args: {
          where: {
            userId: { _eq: userId }
          },
          _set: {
            password: hashedPassword
          }
        },
        affectedRows: true,
        returning: {
          userId: true
        }
      }
    })

    // * Deletes the used token
    const deleteTokenResult = await client.mutation({
      deleteUserToken: {
        __args: {
          where: {
            token: { _eq: token }
          }
        },
        affectedRows: true,
        returning: {
          token: true
        }
      }
    })

    const isUpdateSuccessful =
      (updateUserResult?.updateUser?.affectedRows ?? 0) > 0
    const isDeleteSuccessful =
      (deleteTokenResult?.deleteUserToken?.affectedRows ?? 0) > 0

    if (isUpdateSuccessful && isDeleteSuccessful) {
      return NextResponse.json(
        { message: 'Password reset successful' },
        { status: 200 }
      )
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      console.error('Unexpected result')
      throw new Error('Failed to update user password or delete token')
    }
  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json(
      { error: 'An error occurred while resetting the password' },
      { status: 500 }
    )
  }
}
