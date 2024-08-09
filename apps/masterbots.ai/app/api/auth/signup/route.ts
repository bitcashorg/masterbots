import bcrypt from 'bcrypt'
import { createMbClient } from 'mb-genql'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Missing email or password' },
      { status: 400 }
    )
  }

  // TODO: Use drizzle instead for admin actions...
  const client = createMbClient({ env: 'local', adminSecret: 'lfg' }) // Adjust environment as needed

  // Check if user already exists
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

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Insert new user
  try {
    const { insertUserOne } = await client.mutation({
      insertUserOne: {
        __args: {
          object: {
            email,
            // TODO: autogenerate username from email if not filled.
            username: email.split('@')[0],
            slug: email.split('@')[0].toLowerCase().replace(/\+/g, '_'),
            password: hashedPassword
          }
        },
        userId: true

      }
    })

    if (insertUserOne) {
      return NextResponse.json(
        { message: 'User created successfully' },
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