import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { usePayment } from '@/lib/hooks/use-payment'
import React, { useEffect, useState } from 'react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)
interface StripeElementProps {
  children: React.ReactNode
}

export function StripeElement({ children }: StripeElementProps) {
  const { paymentIntent } = usePayment()
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
    clientSecret: paymentIntent,
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
