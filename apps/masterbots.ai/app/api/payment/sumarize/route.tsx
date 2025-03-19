import type { NextRequest } from 'next/server'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
	throw new Error('Stripe secret key is not set.')
}

const stripe = require('stripe')(stripeSecretKey)
// export const runtime = 'edge'

export async function POST(req: NextRequest) {
	try {
		const { confirmation_token_id } = await req.json()

		if (confirmation_token_id) {
			const details = await stripe.confirmationTokens.retrieve(
				confirmation_token_id,
			)

			return new Response(JSON.stringify(summarizePaymentDetails(details)), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			})
		}
	} catch (error) {
		console.error('Error creating payment intent:', error)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

function summarizePaymentDetails(confirmationToken: any) {
	// Use confirmationToken.payment_method_preview to derive the applicable summary fields for your UI
}
