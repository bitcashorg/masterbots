import type { NextRequest } from 'next/server'
import { Stripe } from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
	throw new Error('Stripe secret key is not set.')
}
const stripe = new Stripe(stripeSecretKey || '', {
	apiVersion: '2024-04-10',
})

export const runtime = 'edge'

// # Get Subscription Details by Payment Intent ID
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)
		const paymentIntentId = searchParams.get('paymentIntentId')

		if (!paymentIntentId) {
			return new Response(
				JSON.stringify({ error: 'paymentIntentId is required' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		const paymentIntent = await stripe.paymentIntents.retrieve(
			paymentIntentId,
			// expand card details
			{
				expand: ['payment_method'],
			},
		)

		if (!paymentIntent) {
			return new Response(
				JSON.stringify({ error: 'Payment Intent not found' }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		const invoice = await stripe.invoices.retrieve(
			paymentIntent.invoice as string,
		)

		if (!invoice) {
			return new Response(JSON.stringify({ error: 'Invoice not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const subscriptionId = invoice.subscription

		if (!subscriptionId) {
			return new Response(
				JSON.stringify({ error: 'Subscription ID not found in invoice' }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		const subscription = await stripe.subscriptions.retrieve(
			subscriptionId as string,
			{
				expand: ['items.data.plan', 'customer'], // Expand the plan details
			},
		)

		//? Transform subscription to simplified
		const subCustomer = subscription.customer as Stripe.Customer
		const subPlan = subscription.items.data[0]?.plan as Stripe.Plan &
			Stripe.Plan.Tier
		const subProduct = subPlan?.product as Stripe.Product
		const transformedSubscription = {
			customer: {
				name: subCustomer?.name || '',
			},
			plan: {
				amount:
					(typeof subPlan?.unit_amount === 'number'
						? subPlan?.unit_amount
						: subPlan?.amount) || 0,
				interval: subPlan?.interval || 'month',
				product: {
					name: subProduct?.name || 'Pro Plan',
				},
			},
			current_period_start: subscription.current_period_start,
			current_period_end: subscription.current_period_end,
			status: subscription.status,
		}

		//? Extract card preview from payment method
		const paymentMethod = paymentIntent.payment_method as unknown as {
			card?: {
				last4?: string
				brand?: string
				exp_month?: number
				exp_year?: number
			}
		}
		const card = { card: paymentMethod?.card || { last4: '' } }

		return new Response(
			JSON.stringify({
				card,
				subscription: transformedSubscription,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		)

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error('Error creating subscription:', error)
		const stripeError = error?.raw || error
		return new Response(JSON.stringify({ error: stripeError?.message }), {
			status: stripeError?.statusCode || 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

// Use PUT to check if a customer has an active subscription or not by email address
export async function PUT(req: NextRequest) {
	try {
		const { email } = await req.json()
		if (!email) {
			return new Response(JSON.stringify({ error: 'Email is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		// Search for an existing customer by email
		const customers = await stripe.customers.list({
			email,
			limit: 1,
		})

		let customer: Stripe.Customer
		if (customers.data.length > 0) {
			// Use the existing customer
			customer = customers.data[0]
		} else {
			return new Response(JSON.stringify({ error: 'Customer not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const subscriptions = await stripe.subscriptions.list({
			customer: customer.id,
			status: 'all',
			limit: 100,
		})

		//? Filter for active or trialing subscriptions
		const activeSubscriptions = subscriptions.data.filter(
			(sub) => sub.status === 'active' || sub.status === 'trialing',
		)

		if (activeSubscriptions.length > 0) {
			const subscription = activeSubscriptions[0]
			//? Expand the subscription to get plan details
			const expandedSubscription = await stripe.subscriptions.retrieve(
				subscription.id,
				{
					expand: ['items.data.plan', 'customer'],
				},
			)

			//? Transform the subscription data to match the expected format
			const customer = expandedSubscription.customer as Stripe.Customer
			const plan = expandedSubscription.items.data[0]?.plan as Stripe.Plan &
				Stripe.Plan.Tier
			const product = plan?.product as Stripe.Product

			const transformedSubscription = {
				customer: {
					name: customer?.name || '',
				},
				plan: {
					amount: plan?.unit_amount || 0,
					interval: plan?.interval || 'month',
					product: {
						name: product?.name || 'Pro Plan',
					},
				},
				current_period_start: expandedSubscription.current_period_start,
				current_period_end: expandedSubscription.current_period_end,
				status: expandedSubscription.status,
				cancel_at_period_end: expandedSubscription.cancel_at_period_end,
			}

			return new Response(
				JSON.stringify({
					active: true,
					subscription: transformedSubscription,
				}),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}
		return new Response(JSON.stringify({ active: false }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error('Error checking subscription:', error)
		const stripeError = error?.raw || error
		return new Response(JSON.stringify({ error: stripeError?.message }), {
			status: stripeError?.statusCode || 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

// Cancel a customer's active subscription(s)
export async function DELETE(req: NextRequest) {
	try {
		const { email, at_period_end } = await req.json()
		if (!email) {
			return new Response(JSON.stringify({ error: 'Email is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const customers = await stripe.customers.list({
			email,
			limit: 1,
		})

		if (customers.data.length === 0) {
			return new Response(JSON.stringify({ error: 'Customer not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const customer = customers.data[0]

		const subscriptions = await stripe.subscriptions.list({
			customer: customer.id,
			status: 'all',
			limit: 100,
		})

		const activeOrTrialing = subscriptions.data.filter(
			(s) =>
				s.status === 'active' ||
				s.status === 'trialing' ||
				s.status === 'past_due',
		)

		if (activeOrTrialing.length === 0) {
			return new Response(
				JSON.stringify({ message: 'No cancellable subscriptions found' }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		const results = [] as Array<{
			id: string
			status: string
			cancel_at_period_end?: boolean
		}>
		for (const sub of activeOrTrialing) {
			if (at_period_end) {
				const updated = await stripe.subscriptions.update(sub.id, {
					cancel_at_period_end: true,
				})
				results.push({
					id: updated.id,
					status: updated.status,
					cancel_at_period_end: updated.cancel_at_period_end || false,
				})
			} else {
				const cancelled = await stripe.subscriptions.cancel(sub.id)
				results.push({ id: cancelled.id, status: cancelled.status })
			}
		}

		return new Response(JSON.stringify({ success: true, results }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error: unknown) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const stripeError = (error as any)?.raw || error
		return new Response(
			JSON.stringify({
				error:
					(stripeError as Error)?.message || 'Failed to cancel subscription',
			}),
			{
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				status: ((stripeError as any)?.statusCode as number) || 500,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	}
}

// Resume a customer's subscription(s) that are set to cancel at period end
export async function PATCH(req: NextRequest) {
	try {
		const { email } = await req.json()
		if (!email) {
			return new Response(JSON.stringify({ error: 'Email is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const customers = await stripe.customers.list({ email, limit: 1 })
		if (customers.data.length === 0) {
			return new Response(JSON.stringify({ error: 'Customer not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const customer = customers.data[0]
		const subscriptions = await stripe.subscriptions.list({
			customer: customer.id,
			status: 'all',
			limit: 100,
		})

		const toResume = subscriptions.data.filter((s) => s.cancel_at_period_end)
		const results = [] as Array<{
			id: string
			cancel_at_period_end: boolean
			status: string
		}>
		for (const sub of toResume) {
			const updated = await stripe.subscriptions.update(sub.id, {
				cancel_at_period_end: false,
			})
			results.push({
				id: updated.id,
				cancel_at_period_end: updated.cancel_at_period_end,
				status: updated.status,
			})
		}

		return new Response(JSON.stringify({ success: true, results }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error: unknown) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const stripeError = (error as any)?.raw || error
		return new Response(
			JSON.stringify({
				error:
					(stripeError as Error)?.message || 'Failed to resume subscription',
			}),
			{
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				status: ((stripeError as any)?.statusCode as number) || 500,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	}
}
