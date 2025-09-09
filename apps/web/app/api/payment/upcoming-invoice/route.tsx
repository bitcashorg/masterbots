import type { NextRequest } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
	throw new Error('Stripe secret key is not set.')
}
const stripe = new Stripe(stripeSecretKey || '', {
	apiVersion: '2024-04-10',
})

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)
		const email = searchParams.get('email')
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

		const upcoming = await stripe.invoices.retrieveUpcoming({
			customer: customer.id,
		})

		return new Response(
			JSON.stringify({
				amount_due: upcoming.amount_due,
				currency: upcoming.currency,
				next_payment_attempt: upcoming.next_payment_attempt,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	} catch (error: unknown) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const stripeError = (error as any)?.raw || error
		return new Response(
			JSON.stringify({
				error:
					(stripeError as Error)?.message || 'Failed to fetch upcoming invoice',
			}),
			{
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				status: ((stripeError as any)?.statusCode as number) || 500,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	}
}
