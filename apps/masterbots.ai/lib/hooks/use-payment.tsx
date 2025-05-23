'use client'

import type { StripePlan } from '@/types/types'
import React, { createContext, useState } from 'react'

type CardProps =
	| {
			last4: string
	  }
	| undefined

type USER = {
	id: string
	image: string
	name: string
	email: string
	hasuraJwt: string
}

interface PaymentContextProps {
	card: CardProps | null
	loading: boolean
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error: any
	plan: StripePlan | null | undefined
	handlePlan: (plan: StripePlan | undefined) => void
	handleSetCard: (card: CardProps) => void
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	handlePaymentIntent: (paymentIntent: any) => void
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	handleSetError: (error: any) => void
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	paymentIntent: any
	handleSetLoading: (loading: boolean) => void
	handleSetConfirmationToken: (confirmationToken: string | undefined) => void
	confirmationToken: string | undefined
	secret: string
	handleSetSecret: (secret: string) => void
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	handleDeleteCustomer: (email: string) => Promise<any>
	stripeSecret: string
	handleSetStripeSecret: (stripeSecret: string) => void
	stripePublishkey: string
	handleSetStripePublishKey: (stripePublishkey: string) => void
}

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined)

interface PaymentProviderProps {
	children: React.ReactNode
}

export function usePayment() {
	const context = React.useContext(PaymentContext)
	if (!context) {
		throw new Error('usePayment must be used within a PaymentProvider')
	}
	return context
}

export function PaymentProvider({ children }: PaymentProviderProps) {
	const [card, setCard] = useState<CardProps | null>(null)
	const [loading, setLoading] = useState(false)
	const [plan, setPlan] = useState<StripePlan | null | undefined>(null)
	const [error, setError] = useState('')
	const [paymentIntent, setPaymentIntent] = useState('')
	const [confirmationToken, setConfirmationToken] = useState<
		string | undefined
	>('')
	const [secret, setSecret] = useState<string>('')
	const [stripeSecret, setStripeSecret] = useState<string>('')
	const [stripePublishkey, setStripePublishKey] = useState<string>('')

	const handleSetConfirmationToken = (token: string | undefined) => {
		setConfirmationToken(token)
	}
	const handleSetLoading = (loading: boolean) => {
		setLoading(loading)
	}
	const handlePlan = (plan: StripePlan | undefined) => {
		setPlan(plan)
	}
	const handleSetCard = (payment: CardProps) => {
		setCard(payment)
	}
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handlePaymentIntent = (paymentIntent: any) => {
		setPaymentIntent(paymentIntent)
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleSetError = (error: any) => {
		setError(error)
	}

	const handleSetSecret = (secret: string) => {
		setSecret(secret)
	}

	const handleDeleteCustomer = async (email: string) => {
		try {
			const response = await fetch('/api/payment/intent', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			})
			const data = await response.json()
			return data
		} catch (error) {
			console.error('Error deleting customer:', error)
			throw new Error('Failed to delete customer. Please try again.')
		}
	}

	const handleSetStripeSecret = (stripeSecret: string) => {
		setStripeSecret(stripeSecret)
	}
	const handleSetStripePublishKey = (stripePublishkey: string) => {
		setStripePublishKey(stripePublishkey)
	}

	return (
		<PaymentContext.Provider
			value={{
				plan,
				card,
				error,
				secret,
				loading,
				paymentIntent,
				confirmationToken,
				stripeSecret,
				stripePublishkey,
				handlePlan,
				handleSetCard,
				handleSetError,
				handleSetSecret,
				handleSetLoading,
				handlePaymentIntent,
				handleDeleteCustomer,
				handleSetStripeSecret,
				handleSetStripePublishKey,
				handleSetConfirmationToken,
			}}
		>
			{children}
		</PaymentContext.Provider>
	)
}
