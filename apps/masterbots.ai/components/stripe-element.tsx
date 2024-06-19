import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { usePayment } from '@/lib/hooks/use-payment'
import React, { useEffect, useState } from 'react'

const stripePromise = loadStripe(
  process.env.STRIPE_PUBLISHABLE_KEY || ''
)
interface StripeElementProps {
  children: React.ReactNode
}

export function StripeElement({ children }: StripeElementProps) {
  const { secret } = usePayment()
  const [theme, setTheme] = useState<'night' | 'stripe' | 'flat'>('stripe');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setTheme('night');
    } else {
      setTheme('stripe');
    }
  }, []);
  
  const options = {
    clientSecret: secret,
    appearance: {
      theme: theme,
    },
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
