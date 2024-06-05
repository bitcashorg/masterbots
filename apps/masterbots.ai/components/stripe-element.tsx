import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
interface StripeElementProps {
  children: React.ReactNode
}
export function StripeElement({ children }: StripeElementProps) {
  const options = {
    clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
