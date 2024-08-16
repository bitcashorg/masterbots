import { generateUsername } from '@/lib/username'
import bcryptjs from 'bcryptjs'
import { getHasuraClient, toSlug } from 'mb-lib'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password, username } = await req.json()

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
          _or: [
            {
              email: {
                _eq: email
              }
            },
            {
              username: {
                _eq: username
              }
            }
          ]

        }
      },
      username: true,
      email: true
    }
  })

  if (user.length && user[0].username === username) {
    return NextResponse.json({ error: 'Username is already taken' }, { status: 409 })
  }
  if (user.length && user[0].email === email) {
    return NextResponse.json({ error: 'Email is already registered' }, { status: 409 })
  }

  //* Hash password before storing using bcrypt (salted hash)
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)

  //* Insert new user into the database with hashed password
  try {
    let foundFreeUsername = false
    let newUsername = generateUsername(username)

    while (!foundFreeUsername) {
      const { user } = await client.query({
        user: {
          __args: {
            where: {
              username: {
                _eq: newUsername
              }
            }
          },
          username: true
        }
      })

      if (!user.length) {
        foundFreeUsername = true
      } else {
        newUsername = generateUsername(username)
      }
    }

    const { insertUserOne } = await client.mutation({
      insertUserOne: {
        __args: {
          object: {
            email,
            username: newUsername,
            slug: toSlug(newUsername),
            password: hashedPassword,
            profilePicture: 'https://robohash.org/' + newUsername + '?set=set3'
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
