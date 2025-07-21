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

		const card = paymentIntent.payment_method

		return new Response(
			JSON.stringify({
				card,
				subscription,
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
