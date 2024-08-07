'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/login-button'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      // Handle error (show message to user)
      console.error(result.error)
    } else {
      router.push('/') // Redirect to home on success
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      <div className='space-y-2 text-center'>
      <p className='text-muted-foreground'>Or</p>
      </div>
      <LoginButton className="w-full" />
    </form>
  )
}