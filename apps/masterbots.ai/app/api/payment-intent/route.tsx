import type { NextRequest } from 'next/server'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export const runtime = 'edge'

export async function POST(req: Request) {
    const json = await req.json()
    const { amount, currency } = json
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency
  })
  return  new Response(JSON.stringify({ client_secret: paymentIntent.client_secret }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}