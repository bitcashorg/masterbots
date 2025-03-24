/* eslint-disable react/no-unescaped-entities */
'use client'

import { PasswordStrengthMeter } from '@/components/shared/password-strength-meter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSonner } from '@/lib/hooks/useSonner'
import { isPasswordStrong, verifyPassword } from '@/lib/password'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'

interface SignupState {
	email: string
	password: string
	username: string
	passwordVerify: string
	isLoading: boolean
	showVerificationNotice: boolean
	showPassword: boolean
	showPasswordVerify: boolean
}

export default function SignUpForm() {
	const [state, setState] = useState<SignupState>({
		email: '',
		password: '',
		username: '',
		passwordVerify: '',
		isLoading: false,
		showVerificationNotice: false,
		showPassword: false,
		showPasswordVerify: false,
	})
	const { customSonner } = useSonner()
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setState((prev) => ({ ...prev, isLoading: true }))

		if (state.password !== state.passwordVerify) {
			customSonner({ type: 'error', text: 'Passwords do not match' })
			setState((prev) => ({ ...prev, isLoading: false }))
			return
		}

		if (!isPasswordStrong(state.password)) {
			customSonner({ type: 'error', text: 'Please choose a stronger password' })
			setState((prev) => ({ ...prev, isLoading: false }))
			return
		}

		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: state.email,
					password: state.password,
					username: state.username.toLowerCase(),
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || data.message || 'Failed to sign up')
			}

			setState((prev) => ({ ...prev, showVerificationNotice: true }))
			customSonner({
				type: 'success',
				text: data.message,
			})

			const loginResult = await signIn('credentials', {
				email: state.email,
				password: state.password,
				redirect: false,
			})

			if (loginResult?.error) {
				console.error('Auto-login failed:', loginResult.error)
				customSonner({
					type: 'error',
					text: 'Account created but login failed. Please try signing in manually.',
				})
				router.push('/auth/signin')
				throw new Error(loginResult.error)
			}

			customSonner({ type: 'success', text: 'You are now logged in!' })
			router.push('/')
		} catch (error) {
			console.error(error)
			customSonner({ type: 'error', text: (error as Error).message })
		} finally {
			setState((prev) => ({ ...prev, isLoading: false }))
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setState((prev) => ({ ...prev, [name]: value }))
	}

	const togglePasswordVisibility = (
		field: 'showPassword' | 'showPasswordVerify',
	) => {
		setState((prev) => ({ ...prev, [field]: !prev[field] }))
	}

	if (state.showVerificationNotice) {
		return (
			<div className="space-y-4 text-center">
				<h2 className="text-2xl font-bold">Verify Your Email</h2>
				<p>
					We&apos;ve sent a verification link to <strong>{state.email}</strong>
				</p>
				<p className="text-sm text-gray-600">
					Please check your email and click the verification link to activate
					your account. The verification link will expire in 15 days.
				</p>
				<div className="pt-4">
					<Button variant="outline" onClick={() => router.push('/auth/signin')}>
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
					placeholder="john_doe123"
					value={state.username}
					onChange={handleInputChange}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="email" variant="required">
					Email
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="john.doe@example.com"
					required
					value={state.email}
					onChange={handleInputChange}
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
						type={state.showPassword ? 'text' : 'password'}
						min="8"
						required
						value={state.password}
						onChange={handleInputChange}
						className="pr-10"
					/>
					<button
						type="button"
						onClick={() => togglePasswordVisibility('showPassword')}
						className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
					>
						{state.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				</div>
				<PasswordStrengthMeter password={state.password} />
			</div>
			<div className="space-y-2">
				<Label htmlFor="passwordVerify" variant="required">
					Verify Password
				</Label>
				<div className="relative">
					<Input
						id="passwordVerify"
						name="passwordVerify"
						type={state.showPasswordVerify ? 'text' : 'password'}
						min="8"
						required
						value={state.passwordVerify}
						onChange={handleInputChange}
						onBlur={verifyPassword}
						className="pr-10"
					/>
					<button
						type="button"
						onClick={() => togglePasswordVisibility('showPasswordVerify')}
						className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
					>
						{state.showPasswordVerify ? (
							<EyeOff size={20} />
						) : (
							<Eye size={20} />
						)}
					</button>
				</div>
			</div>
			<Button type="submit" className="w-full" disabled={state.isLoading}>
				{state.isLoading ? 'Signing up...' : 'Sign Up'}
			</Button>
		</form>
	)
}
