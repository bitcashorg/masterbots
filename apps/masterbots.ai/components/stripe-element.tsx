import { usePayment } from '@/lib/hooks/use-payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'


interface StripeElementProps {
  children: React.ReactNode
}

export function StripeElement({ children }: StripeElementProps) {
  const { secret, stripePublishkey } = usePayment()
  const [theme, setTheme] = useState<'night' | 'stripe' | 'flat'>('stripe');
  const stripeLoader = loadStripe(
    stripePublishkey || ''
  )

  useEffect(() => {
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'stripe';
    setTheme(preferredTheme);
  }, []);

  const options = {
    clientSecret: secret,
    appearance: {
      theme,
      labels: 'floating' as const,
    },
  };
  return (
    <Elements stripe={stripeLoader} options={options}>
      {children}
    </Elements>
  )
}
