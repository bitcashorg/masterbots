'use client'

import { LoginButton } from '@/components/shared/login-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { appConfig } from 'mb-env'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInForm() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

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
        <Label htmlFor="email" variant="required">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" variant="required">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      <Link
        href="/auth/forgot-password"
        className="flex justify-end mt-6 text-sm text-fuchsia-800 hover:underline"
      >
        Forgot Password?
      </Link>
      {appConfig.enableAuth.google && (
        <>
          <div className="flex items-center w-full gap-4 my-2 text-center">
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