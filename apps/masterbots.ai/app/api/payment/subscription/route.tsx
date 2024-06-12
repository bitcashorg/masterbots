import type { NextRequest } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10'
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const paymentIntentId = searchParams.get('paymentIntentId')

    if (!paymentIntentId) {
      return new Response(
        JSON.stringify({ error: 'paymentIntentId is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId,
      // expand card details
      {
        expand: ['payment_method']
      }
    );

    if (!paymentIntent) {
      return new Response(
        JSON.stringify({ error: 'Payment Intent not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const invoice = await stripe.invoices.retrieve(
      paymentIntent.invoice as string
    )

    if (!invoice) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const subscriptionId = invoice.subscription

    if (!subscriptionId) {
      return new Response(
        JSON.stringify({ error: 'Subscription ID not found in invoice' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const subscription = await stripe.subscriptions.retrieve(
      subscriptionId as string,
      {
        expand: ['items.data.plan', 'customer'] // Expand the plan details
      }
    )


    const card = paymentIntent.payment_method;


    return new Response(JSON.stringify(
      {
        card,
        subscription,
      }
    ), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: any) {
    console.error('Error creating subscription:', error)
    const stripeError = error?.raw || error
    return new Response(JSON.stringify({ error: stripeError?.message }), {
      status: stripeError?.statusCode || 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
