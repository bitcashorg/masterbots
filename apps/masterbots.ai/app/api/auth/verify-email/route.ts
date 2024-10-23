import { type NextRequest, NextResponse } from 'next/server'
import { getHasuraClient } from 'mb-lib'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json(
      { error: 'Verification token is required' },
      { status: 400 }
    )
  }

  const client = getHasuraClient()

  try {
    // * Finds token and associated user with the token
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
        user: {
          userId: true
        }
      }
    })

    if (!userToken || !userToken[0]) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // * Update user's verification status and last login
    const { updateUser } = await client.mutation({
      updateUser: {
        __args: {
          where: {
            userId: { _eq: userToken[0].userId }
          },
          _set: {
            isVerified: true,
            last_login: new Date().toISOString()
          }
        },
        returning: {
          userId: true
        }
      }
    })

    // * Delete the used token
    await client.mutation({
      deleteUserToken: {
        __args: {
          where: {
            token: { _eq: token }
          }
        },
        returning: {
          token: true
        }
      }
    })

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error verifying email:', error)
    return NextResponse.json(
      { error: 'An error occurred while verifying email' },
      { status: 500 }
    )
  }
}
