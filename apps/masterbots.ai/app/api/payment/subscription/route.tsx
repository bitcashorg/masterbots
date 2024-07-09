import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

export const runtime = "edge"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not set.');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-04-10'
});

// Get Subscription Details by Payment Intent ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentIntentId = searchParams.get('paymentIntentId');

    if (!paymentIntentId) {
      return new NextResponse(JSON.stringify({ error: 'paymentIntentId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['payment_method'],
    });

    if (!paymentIntent) {
      return new NextResponse(JSON.stringify({ error: 'Payment Intent not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const invoice = await stripe.invoices.retrieve(paymentIntent.invoice as string);

    if (!invoice) {
      return new NextResponse(JSON.stringify({ error: 'Invoice not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subscriptionId = invoice.subscription;

    if (!subscriptionId) {
      return new NextResponse(JSON.stringify({ error: 'Subscription ID not found in invoice' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId as string, {
      expand: ['items.data.plan', 'customer'],
    });

    const card = paymentIntent.payment_method;

    return new NextResponse(JSON.stringify({ card, subscription }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    const stripeError = error?.raw || error;
    return new NextResponse(JSON.stringify({ error: stripeError?.message }), {
      status: stripeError?.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Use PUT to check if a customer has an active subscription or not by email address
export async function PUT(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return new NextResponse(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Search for an existing customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });

    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      return new NextResponse(JSON.stringify({ error: 'Customer not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      return new NextResponse(JSON.stringify({ active: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new NextResponse(JSON.stringify({ active: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error: any) {
    console.error('Error checking subscription:', error);
    const stripeError = error?.raw || error;
    return new NextResponse(JSON.stringify({ error: stripeError?.message }), {
      status: stripeError?.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
