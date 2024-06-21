import { usePayment } from '@/lib/hooks/use-payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'


interface StripeElementProps {
  children: React.ReactNode
}

export function StripeElement({ children }: StripeElementProps) {
  const { secret, stripe_public_key } = usePayment()
  const [theme, setTheme] = useState<'night' | 'stripe' | 'flat'>('stripe');
  const stripePromise = loadStripe(
    stripe_public_key || ''
  )

  useEffect(() => {
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'stripe';
    setTheme(preferredTheme);
  }, [theme]);

  const options = {
    clientSecret: secret,
    appearance: {
      theme,
      labels: 'floating' as const,
    },
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
