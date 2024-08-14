import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { getHasuraClient } from 'mb-lib'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Missing email or password' },
      { status: 400 }
    )
  }

  //* Initialize the Hasura client for interacting with the database based on the environment
  const client = getHasuraClient()

  //* Checks if user already exists
  const { user } = await client.query({
    user: {
      __args: {
        where: {
          email: {
            _eq: email
          }
        }
      },
      userId: true
    }
  })

  if (user && user.length > 0) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  //* Hash password before storing using bcrypt (salted hash)
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)

  //* Insert new user into the database with hashed password
  try {
    const { insertUserOne } = await client.mutation({
      insertUserOne: {
        __args: {
          object: {
            email,
            // TODO: autogenerate username from email if not filled.
            username: email.split('@')[0],
            slug: email
              .split('@')[0]
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '_'),
            password: hashedPassword
          }
        },
        userId: true
      }
    })

    if (insertUserOne) {
      return NextResponse.json(
        { message: 'User created successfully', userId: insertUserOne.userId },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
