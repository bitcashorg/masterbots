/**
 * StripeElement Component
 *
 * A wrapper component that integrates Stripe's Elements for secure payment
 * processing. It provides the necessary context and configuration for
 * rendering Stripe payment elements.
 *
 * Key Features:
 * - Loads Stripe with the provided publishable key
 * - Configures the appearance of Stripe elements based on user preferences
 * - Supports dark mode and light mode themes
 *
 * Functionality:
 * - Sets the theme for Stripe elements based on the user's color scheme preference
 * - Passes the client secret to Stripe for secure payment processing
 *
 * Props:
 * - children: React nodes to be rendered within the Stripe Elements context
 */
import { usePayment } from '@/lib/hooks/use-payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import type React from 'react'
import { useEffect, useState } from 'react'

interface StripeElementProps {
  children: React.ReactNode
}

export function StripeElement({ children }: StripeElementProps) {
  const { secret, stripePublishkey } = usePayment()
  const [theme, setTheme] = useState<'night' | 'stripe' | 'flat'>('stripe')
  const stripeLoader = loadStripe(stripePublishkey || '')

  useEffect(() => {
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'night'
      : 'stripe'
    setTheme(preferredTheme)
  }, [])

  const options = {
    clientSecret: secret,
    appearance: {
      theme,
      labels: 'floating' as const
    }
  }
  return (
    <Elements stripe={stripeLoader} options={options}>
      {children}
    </Elements>
  )
}
