import type { NextRequest } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with your secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
	throw new Error('Stripe secret key is not set.')
}
const stripe = new Stripe(stripeSecretKey || '', {
	apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
	try {
		const { email, name, planId, trialPeriodDays, promotion_code } = await req.json()

		// Validate request data
		if (!email || !name || !planId) {
			return new Response(
				JSON.stringify({ error: 'Email, name, and plan ID are required' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			)
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
			// Create a new customer
			customer = await stripe.customers.create({
				email,
				name,
			})
		}
		//? Create a subscription with the provided plan ID and trial period
		const subscriptionData: any = {
			customer: customer.id,
			items: [
				{ price: planId }, // Use 'price' instead of 'plan' as per Stripe's latest API
			],
			trial_period_days: trialPeriodDays || 0,
			payment_behavior: 'default_incomplete',
			expand: ['latest_invoice.payment_intent'],
		}

		//? Add promotion code if provided
		if (promotion_code) {
			subscriptionData.promotion_code = promotion_code
		}

		const subscription = await stripe.subscriptions.create(subscriptionData)

		// Get the client secret from the PaymentIntent if there is one
		const invoice = subscription?.latest_invoice
		if (typeof invoice !== 'string' && invoice?.payment_intent) {
			const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent
			return new Response(
				JSON.stringify({ client_secret: paymentIntent?.client_secret }),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}
	} catch (error: unknown) {
		console.error('Error creating subscription:', error)
		const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
		const statusCode =
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			error instanceof Error && (error as any).raw?.statusCode
				? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
					(error as any).raw.statusCode
				: 500

		return new Response(JSON.stringify({ error: errorMessage }), {
			status: statusCode,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

// # This is useful when you want to delete a customer and cancel all their subscriptions at once only if they have no active subscriptions
export async function DELETE(req: NextRequest) {
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

		if (customers.data.length === 0) {
			return new Response(JSON.stringify({ error: 'Customer not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		const customer = customers.data[0]

		// List all subscriptions for the customer
		const subscriptions = await stripe.subscriptions.list({
			customer: customer.id,
			limit: 100,
		})

		let hasActiveSubscription = false
		for (const subscription of subscriptions.data) {
			if (subscription.status === 'incomplete') {
				await stripe.subscriptions.cancel(subscription.id)
			} else if (subscription.status === 'active') {
				hasActiveSubscription = true
			}
		}

		if (!hasActiveSubscription) {
			// Delete the customer if there are no active subscriptions
			await stripe.customers.del(customer.id)
			return new Response(
				JSON.stringify({
					message: 'Customer and incomplete subscriptions deleted',
				}),
				{
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		return new Response(
			JSON.stringify({
				message:
					'Incomplete subscriptions deleted, customer has active subscriptions',
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	} catch (error: unknown) {
		console.error('Error deleting customer or subscriptions:', error)
		const errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
		const statusCode =
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			error instanceof Error && (error as any).raw?.statusCode
				? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
					(error as any).raw.statusCode
				: 500

		return new Response(JSON.stringify({ error: errorMessage }), {
			status: statusCode,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
