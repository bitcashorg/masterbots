import Stripe from 'stripe'

// Initialize Stripe with your secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
	throw new Error('Stripe secret key is not set.')
}
const stripe = new Stripe(stripeSecretKey || '', {
	apiVersion: '2024-04-10',
})

export async function GET() {
	try {
		// Fetch all plans (prices)
		const prices = await stripe.prices.list({
			expand: ['data.product'],
		})
		const stripe_publishable = process.env.STRIPE_PUBLISHABLE_KEY

		return new Response(
			JSON.stringify({
				plans: prices.data,
				stripe_publishable,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		)
	} catch (error) {
		console.error('Error fetching plans:', error)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
