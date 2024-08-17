'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function SignUpForm() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget as HTMLFormElement)
    const email = form.get('email') as string
    const password = form.get('password') as string
    const username = form.get('username') as string

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username })
    })

    if (response.ok) {
      router.push('/auth/signin') // Redirect to sign in page on success
    } else {
      const data = await response.json()
      toast.error(`Failed to sign up: ${data.error}`)
      console.error(data.error)
    }
  }

  // TODO: FE verification for email and username before sending to BE...
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="john_doe28"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" variant="required">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" variant="required">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          min="8"
          onBlur={validatePassword}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="passwordVerify" variant="required">Verify Password</Label>
        <Input
          id="passwordVerify"
          name="passwordVerify"
          type="password"
          min="8"
          onBlur={verifyPassword}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form >
  )
}

function validatePassword(e: React.FocusEvent<HTMLInputElement>) {
  const password = e.target.value

  if (password.length < 8) {
    e.target.setCustomValidity('Password must be at least 8 characters long')
    e.target.reportValidity()
  } else {
    e.target.setCustomValidity('')
  }
}

function verifyPassword(e: React.FocusEvent<HTMLInputElement>) {
  const form = new FormData(e.currentTarget.form as HTMLFormElement)
  const password = form.get('password') as string
  const passwordVerify = e.target.value

  // ? https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity
  if (passwordVerify && password !== passwordVerify) {
    e.target.setCustomValidity('Passwords do not match')
    e.target.reportValidity()
  } else {
    e.target.setCustomValidity('')
  }
}