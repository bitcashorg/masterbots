'use client'

import { StripePlan } from '@/lib/types'
import React, { createContext, useState } from 'react'

type CardProps = {
  last4: string
} | undefined


interface PaymentContextProps {
  card: CardProps | null
  loading: boolean
  error: any
  plan: StripePlan | null | undefined
  handlePlan: (plan: StripePlan | undefined) => void
  handleSetCard: (card: CardProps) => void
  handlePaymentIntent: (paymentIntent: any) => void
  handleSetError: (error: any) => void
  paymentIntent: any
  user: {
    id: string
    image: string
    name: string
    email: string
    hasuraJwt: string
  }
  handleSetUser: (user: any) => void
  handleSetLoading: (loading: boolean) => void
  handleSetConfirmationToken: (confirmationToken: string | undefined) => void
  confirmationToken: string
  secret: string
  handleSetSecret: (secret: string) => void
  handleDeleteCustomer: (email: string) => Promise<any>
  stripeSecret: string
  handleSetStripeSecret: (stripeSecret: string) => void
  stripePublishkey: string
  handleSetStripePublishKey: (stripePublishkey: string) => void
}

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined)
interface PaymentProviderProps {
  children: React.ReactNode
}

export function usePayment() {
  const context = React.useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}

export function PaymentProvider({ children }: PaymentProviderProps) {
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState('')
  const [paymentIntent, setPaymentIntent] = useState("")
  const [user, setUser] = useState({
    id: '',
    image: '',
    name: '',
    email: '',
    hasuraJwt: ''
  })
  const [confirmationToken, setConfirmationToken] = useState<any>("")
  const [secret, setSecret] = useState<string>("")
  const [stripeSecret, setStripeSecret] = useState<string>('')
  const [stripePublishkey, setStripePublishKey] = useState<string>('')


  const handleSetConfirmationToken = (token: string | undefined) => {
    setConfirmationToken(token)
  }
  const handleSetLoading = (loading: boolean) => {
    setLoading(loading)
  }
  const handlePlan = (plan: any) => {
    setPlan(plan)
  }
  const handleSetCard = (payment: any) => {
    setCard(payment)
  }
  const handlePaymentIntent = (paymentIntent: any) => {
    setPaymentIntent(paymentIntent)
  }

  const handleSetError = (error: any) => {
    setError(error)
  }
  const handleSetUser = (user: any) => {
    setUser(user)
  }

  const handleSetSecret = (secret: string) => {
    setSecret(secret)
  }

  const handleDeleteCustomer = async (email: string) => {
    try {
      const response = await fetch('/api/payment/intent', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error('Error deleting customer:', error)
      throw new Error('Failed to delete customer. Please try again.');
    }
  }

  const handleSetStripeSecret = (stripeSecret: string) => {
    setStripeSecret(stripeSecret)
  }
  const handleSetStripePublishKey = (stripePublishkey: string) => {
    setStripePublishKey(stripePublishkey)
  }


  return (
    <PaymentContext.Provider
      value={{
        plan,
        card,
        user,
        error,
        secret,
        loading,
        paymentIntent,
        confirmationToken,
        stripeSecret,
        stripePublishkey,
        handlePlan,
        handleSetUser,
        handleSetCard,
        handleSetError,
        handleSetSecret,
        handleSetLoading,
        handlePaymentIntent,
        handleDeleteCustomer,
        handleSetStripeSecret,
        handleSetStripePublishKey,
        handleSetConfirmationToken,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}
