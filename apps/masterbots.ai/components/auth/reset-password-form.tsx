'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import PasswordStrengthMeter from '@/components/shared/password-strength-meter'
import { isPasswordStrong } from '@/lib/password'
import { Eye, EyeOff } from 'lucide-react'
import { useSetState } from 'react-use'

interface FormState {
  password: string
  confirmPassword: string
  isLoading: boolean
  passwordError: string
  showPassword: boolean
  showConfirmPassword: boolean
}

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, setState] = useSetState<FormState>({
    password: '',
    confirmPassword: '',
    isLoading: false,
    passwordError: '',
    showPassword: false,
    showConfirmPassword: false
  })

  const router = useRouter()

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setState({
      password: newPassword,
      passwordError:
        newPassword && !isPasswordStrong(newPassword)
          ? 'Password is not strong enough'
          : ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState({ isLoading: true })

    if (!isPasswordStrong(state.password)) {
      toast.error('Please choose a stronger password')
      setState({ isLoading: false })
      return
    }

    if (state.password !== state.confirmPassword) {
      toast.error('Passwords do not match')
      setState({ isLoading: false })
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: state.password })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        router.push('/auth/signin')
      } else {
        toast.error(data.error || 'An error occurred')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setState({ isLoading: false })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            onChange={handlePasswordChange}
            required
            minLength={8}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setState({ showPassword: !state.showPassword })}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            {state.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <PasswordStrengthMeter password={state.password} />
        {state.passwordError && (
          <p className="text-xs text-red-500">{state.passwordError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={state.showConfirmPassword ? 'text' : 'password'}
            value={state.confirmPassword}
            onChange={e => setState({ confirmPassword: e.target.value })}
            required
            minLength={8}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() =>
              setState({ showConfirmPassword: !state.showConfirmPassword })
            }
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            {state.showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={state.isLoading || !!state.passwordError}
      >
        {state.isLoading ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  )
}
