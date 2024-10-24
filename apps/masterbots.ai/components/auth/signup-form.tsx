/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface SignupState {
  email: string;
  password: string;
  username: string;
  passwordVerify: string;
  isLoading: boolean;
  showVerificationNotice: boolean;
}

export default function SignUpForm() {
  const [state, setState] = useState<SignupState>({
    email: '',
    password: '',
    username: '',
    passwordVerify: '',
    isLoading: false,
    showVerificationNotice: false
  })

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState(prev => ({ ...prev, isLoading: true }))

    if (state.password !== state.passwordVerify) {
      toast.error('Passwords do not match')
      setState(prev => ({ ...prev, isLoading: false }))
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          username: state.username
        })
      })

      const data = await response.json()

      if (response.ok) {
        setState(prev => ({ ...prev, showVerificationNotice: true }))
        toast.success('Account created successfully! Please check your email to verify your account.')
      } else {
        toast.error(data.error || 'Failed to sign up')
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred')
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  if (state.showVerificationNotice) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">Verify Your Email</h2>
        <p>
          We've sent a verification link to <strong>{state.email}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Please check your email and click the verification link to activate your account.
          The verification link will expire in 15 days.
        </p>
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/auth/signin')}
          >
            Go to Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="john_doe28"
          value={state.username}
          onChange={handleInputChange}
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
          value={state.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" variant="required">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          min="8"
          required
          value={state.password}
          onChange={handleInputChange}
          onBlur={validatePassword}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="passwordVerify" variant="required">Verify Password</Label>
        <Input
          id="passwordVerify"
          name="passwordVerify"
          type="password"
          min="8"
          required
          value={state.passwordVerify}
          onChange={handleInputChange}
          onBlur={verifyPassword}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={state.isLoading}
      >
        {state.isLoading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
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

  if (passwordVerify && password !== passwordVerify) {
    e.target.setCustomValidity('Passwords do not match')
    e.target.reportValidity()
  } else {
    e.target.setCustomValidity('')
  }
}