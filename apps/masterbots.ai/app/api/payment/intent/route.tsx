import { NextRequest } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  try {
    const { email, name, planId, trialPeriodDays } = await req.json();

    // Validate request data
    if (!email || !name || !planId) {
      return new Response(JSON.stringify({ error: 'Email, name, and plan ID are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create a new customer
    const customer = await stripe.customers.create({
      email,
      name,
    });

    // Create a subscription with the provided plan ID and trial period
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        { price: planId }, // Use 'price' instead of 'plan' as per Stripe's latest API
      ],
      trial_period_days: trialPeriodDays || 0,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    // Get the client secret from the PaymentIntent if there is one
    const invoice = subscription?.latest_invoice;
    if (typeof invoice !== 'string' && invoice?.payment_intent) {
      const  paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
       return new Response(JSON.stringify({ client_secret: paymentIntent?.client_secret }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    
    } else {
      return new Response(JSON.stringify({ error:'Payment intent not found on the latest invoice' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(JSON.stringify({ error: error?.raw?.message }), {
      status: error?.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
