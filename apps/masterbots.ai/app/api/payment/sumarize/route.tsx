import type { NextRequest } from 'next/server'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export const runtime = 'edge'

export async function POST(req: NextRequest) {
    try {
      const { confirmation_token_id } = await req.json();
  
      if (confirmation_token_id) {
        const details = await stripe.confirmationTokens.retrieve(confirmation_token_id)

        return new Response(JSON.stringify(summarizePaymentDetails(details)), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

    } catch (error) {
      console.error('Error creating payment intent:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }


function summarizePaymentDetails(confirmationToken: any) {
    // Use confirmationToken.payment_method_preview to derive the applicable summary fields for your UI
  }