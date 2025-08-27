'use client'

import { Button } from '@/components/ui/button'
import { useSonner } from '@/lib/hooks/useSonner'
import { validateEmail } from '@/lib/utils'
import { Input } from '@masterbots/mb-ui'
import { Label } from '@masterbots/mb-ui'
import type React from 'react'
import { useState } from 'react'

export default function ForgotPasswordForm() {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [emailError, setEmailError] = useState('')
	const { customSonner } = useSonner()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setEmailError('')

		if (!validateEmail(email)) {
			setEmailError('Please enter a valid email address')
			return
		}

		setIsLoading(true)

		try {
			const response = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})

			const data = await response.json()

			if (response.ok) {
				customSonner({ type: 'success', text: data.message })
				setEmail('')
			} else {
				customSonner({ type: 'error', text: data.error || 'An error occurred' })
			}
		} catch (error) {
			console.error('Error:', error)
			customSonner({ type: 'error', text: 'An unexpected error occurred' })
		} finally {
			setIsLoading(false)
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
					onChange={(e) => {
						setEmail(e.target.value)
						if (emailError) setEmailError('')
					}}
					required
				/>
				{emailError && <p className="text-sm text-red-500">{emailError}</p>}
			</div>
			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? 'Sending...' : 'Send Reset Email'}
			</Button>
		</form>
	)
}
