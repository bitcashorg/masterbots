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

interface PromoState {
	code: string
	applied: boolean
	codeId: string | undefined
	trialDays: number
	discountInfo: string
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
	// Cancellation and invoices helpers
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	cancelSubscription: (email: string, atPeriodEnd?: boolean) => Promise<any>
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	fetchInvoices: (email: string) => Promise<any>
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	resumeSubscription: (email: string) => Promise<any>
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	fetchUpcomingInvoice: (email: string) => Promise<any>
	stripePublishkey: string
	handleSetStripePublishKey: (stripePublishkey: string) => void
	// Promotion code related props
	promo: PromoState
	handleSetPromo: (updates: Partial<PromoState>) => void
	handleResetPromo: () => void
	handleValidatePromoCode: (code: string) => Promise<{
		valid: boolean
		error?: string
		promotionCodeId?: string
		trialPeriodDays?: number
		discountInfo?: string
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		couponDetails?: any
	}>
	handleApplyPromoCode: () => void
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
	const [stripePublishkey, setStripePublishKey] = useState<string>('')

	// Unified promotion code state
	const [promo, setPromo] = useState<PromoState>({
		code: '',
		applied: false,
		codeId: undefined,
		trialDays: 0,
		discountInfo: '',
	})

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

	const handleSetStripePublishKey = (stripePublishkey: string) => {
		setStripePublishKey(stripePublishkey)
	}

	const cancelSubscription = async (email: string, atPeriodEnd = true) => {
		try {
			const response = await fetch('/api/payment/subscription', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, at_period_end: atPeriodEnd }),
			})

			return await response.json()
		} catch (error) {
			console.error('Error cancelling subscription:', error)
			throw new Error('Failed to cancel subscription. Please try again.')
		}
	}

	const fetchInvoices = async (email: string) => {
		try {
			const res = await fetch(
				`/api/payment/invoices?email=${encodeURIComponent(email)}`,
			)
			return await res.json()
		} catch (error) {
			console.error('Error fetching invoices:', error)
			throw new Error('Failed to fetch invoices.')
		}
	}

	const resumeSubscription = async (email: string) => {
		try {
			const res = await fetch('/api/payment/subscription', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})
			return await res.json()
		} catch (error) {
			console.error('Error resuming subscription:', error)
			throw new Error('Failed to resume subscription.')
		}
	}

	const fetchUpcomingInvoice = async (email: string) => {
		try {
			const res = await fetch(
				`/api/payment/upcoming-invoice?email=${encodeURIComponent(email)}`,
			)
			return await res.json()
		} catch (error) {
			console.error('Error fetching upcoming invoice:', error)
			throw new Error('Failed to fetch upcoming invoice.')
		}
	}

	//? Unified promotion code handlers
	const handleSetPromo = (updates: Partial<PromoState>) => {
		setPromo((prev) => ({ ...prev, ...updates }))
	}

	const handleResetPromo = () => {
		setPromo({
			code: '',
			applied: false,
			codeId: undefined,
			trialDays: 0,
			discountInfo: '',
		})
	}

	const handleValidatePromoCode = async (code: string) => {
		try {
			const response = await fetch('/api/payment/validate-promo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ promoCode: code }),
			})

			const data = await response.json()
			if (data.valid) {
				//? Update promo state with validation details but don't mark as applied yet
				handleSetPromo({
					codeId: data.promotionCodeId,
					trialDays: data.trialPeriodDays || 0,
					discountInfo: data.discountInfo || '',
				})
			}
			return data
		} catch (error) {
			console.error('Error validating promotion code:', error)
			return { valid: false, error: 'Error validating promotion code' }
		}
	}

	const handleApplyPromoCode = () => {
		//? Mark the validated promotion code as applied
		handleSetPromo({
			applied: true,
		})
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
				stripePublishkey,
				promo,
				handleSetPromo,
				handleResetPromo,
				handlePlan,
				handleSetCard,
				handleSetError,
				handleSetSecret,
				handleSetLoading,
				handlePaymentIntent,
				handleDeleteCustomer,
				cancelSubscription,
				fetchInvoices,
				resumeSubscription,
				fetchUpcomingInvoice,
				handleSetStripePublishKey,
				handleSetConfirmationToken,
				handleValidatePromoCode,
				handleApplyPromoCode,
			}}
		>
			{children}
		</PaymentContext.Provider>
	)
}
