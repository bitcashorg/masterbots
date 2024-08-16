'use client'

import { LoginButton } from '@/components/login-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { appConfig } from 'mb-env'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInForm() {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget as HTMLFormElement)
    const email = form.get('email') as string
    const password = form.get('password') as string

    setErrorMessage(null)
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      setErrorMessage('Invalid email or password. Please try again')
    } else {
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
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
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      {appConfig.enableAuth.google && (
        <>
          <div className="flex w-full items-center gap-4 my-2 text-center">
            <hr className="w-full" />
            <b className="text-muted-foreground">or</b>
            <hr className="w-full" />
          </div>
          <LoginButton className="w-full" />
        </>
      )}
    </form>
  )
}
