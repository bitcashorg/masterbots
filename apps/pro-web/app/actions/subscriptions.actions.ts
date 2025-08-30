import { parseWordwareResponse } from '@/components/shared/wordware-chat'
import { plans as fallbackPlans } from '@/lib/utils'
import {
	type Card,
	type PlanList,
	type Subscription,
	initialStateSubscription,
} from '@/types'

export async function checkIfCustomerHasActiveSub(email: string) {
	const response = await fetch('/api/payment/subscription', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	})

	const data: {
		error?: string
		active: boolean
	} = await response.json()

	if (data.error) {
		console.error('Error while checking customer data: ', data.error)
		return true
	}

	return Boolean(!data.active)
}

export async function getUserCurrentSubscription(email: string) {
	try {
		const response = await fetch('/api/payment/subscription', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		})

		const data: {
			error?: string
			active: boolean
			subscription?: Subscription
		} = await response.json()

		if (data.error) {
			console.error('Error while checking customer data: ', data.error)
			return null
		}

		return data.active ? data.subscription : null
	} catch (error) {
		console.error('Error fetching user subscription:', error)
		return null
	}
}

export async function getSubscriptionPlans({
	handleSetStripePublishKey,
	handleSetStripeSecret,
}: {
	handleSetStripePublishKey: (key: string) => void
	handleSetStripeSecret: (key: string) => void
}) {
	let plans: PlanList[] = []

	try {
		const response = await fetch('/api/payment/plans', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data: {
			plans: PlanList[]
			stripeSecret: string
			stripe_publishable: string
			error?: string
		} = await response.json()

		handleSetStripePublishKey(data.stripe_publishable)
		handleSetStripeSecret(data.stripeSecret)

		// Sort plans by price (free plans first, then by amount)
		data.plans.sort((a: PlanList, b: PlanList) => {
			const amountA = a.unit_amount ?? 0
			const amountB = b.unit_amount ?? 0
			// Free plans come first, then sort by amount
			if (amountA === 0 && amountB !== 0) return -1
			if (amountA !== 0 && amountB === 0) return 1
			return amountA - amountB
		})

		//? If we have plans from Stripe, we use them
		if (data.plans.length > 0) {
			plans = data.plans as PlanList[]
		} else {
			//? Fallback to utility plans if no Stripe plans are available
			console.warn('No plans found in Stripe, using fallback plans')
			plans = fallbackPlans.map((plan) => ({
				id: plan.id,
				active: true,
				created: Date.now(),
				product: {
					name: `${plan.duration.charAt(0).toUpperCase() + plan.duration.slice(1)} Plan`,
					description: plan.features_title,
					marketing_features: plan.features.map((feature) => ({
						name: feature,
					})),
				},
				unit_amount: Math.round(plan.price * 100),
				recurring: {
					interval: plan.duration,
					trial_period_days: 0,
				},
			})) as PlanList[]
		}
	} catch (error) {
		console.error('Error fetching plans:', error)
		//? If there's an error, use fallback plans
		console.warn('Error fetching plans from Stripe, using fallback plans')
		plans = fallbackPlans.map((plan) => ({
			id: plan.id,
			active: true,
			created: Date.now(),
			product: {
				name: `${plan.duration.charAt(0).toUpperCase() + plan.duration.slice(1)} Plan`,
				description: plan.features_title,
				marketing_features: plan.features.map((feature) => ({ name: feature })),
			},
			unit_amount: Math.round(plan.price * 100),
			recurring: {
				interval: plan.duration,
				trial_period_days: 0,
			},
		})) as PlanList[]
	}

	return plans
}

export const fetchPayment = async (intentid: string) => {
	let subscription: Subscription = initialStateSubscription
	let card: Card = { last4: '' }

	try {
		const response = await fetch(
			`/api/payment/subscription?paymentIntentId=${intentid}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data: {
			subscription: Subscription
			card: { card: Card }
		} = await response.json()

		subscription = data.subscription
		card = data.card.card
	} catch (error) {
		console.error('Error fetching plans:', error)
	}
	return { subscription, card }
}

export async function getPromptDetails(promptId: string) {
	let data = null
	let error = null
	let inputs = {}

	try {
		if (!promptId) {
			throw new Error('Prompt ID is required')
		}

		const response = await fetch(`/api/wordware/describe?promptId=${promptId}`)
		data = await response.json()
		if (!response.ok) {
			throw new Error(data.error || 'Failed to fetch prompt details')
		}

		inputs = data.inputs.reduce(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(acc: any, input: { label: any }) => ({
				// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
				...acc,
				[input.label]: '',
			}),
			{},
		)
	} catch (err) {
		console.error('Error fetching prompt details:', error)
		error = (err as Error).message
	}

	return { data, error, inputs }
}

export async function runWordWarePrompt({
	promptId,
	inputs,
}: {
	promptId: string

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	inputs: Record<string, any>
}) {
	let fullResponse = ''
	let error = null

	try {
		const response = await fetch('/api/wordware/run', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ promptId, inputs }),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const reader = response.body?.getReader()
		if (!reader) {
			throw new Error('No reader available')
		}

		while (true) {
			const { done, value } = await reader.read()
			if (done) break
			const chunk = new TextDecoder().decode(value)
			fullResponse += chunk
		}

		const parsed = parseWordwareResponse(fullResponse)
		return { fullResponse, parsed, error }
	} catch (err) {
		console.error('Error running prompt:', err)
		error = (err as Error).message
		return { fullResponse, parsed: null, error }
	}
}
