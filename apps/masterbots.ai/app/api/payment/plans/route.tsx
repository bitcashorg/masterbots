import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

export async function GET() {
  try {
    // Fetch all plans (prices)
    const prices = await stripe.prices.list({
      expand: ['data.product'],
    });

    return new Response(JSON.stringify({ plans: prices.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}