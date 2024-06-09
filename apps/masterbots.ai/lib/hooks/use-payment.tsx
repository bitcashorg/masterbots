import React, { createContext, useState } from 'react'

interface PaymentContextProps {
  card: any
  loading: boolean
  error: any
  plan: any
  handlePlan: (plan: any) => void
  handleSetCard: (card: any) => void
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
}

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined)
interface PaymentProviderProps {
  children: React.ReactNode
}

export function usePayment() {
  const context = React.useContext(PaymentContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
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
  
  
  const handleSetConfirmationToken = (token: string | undefined ) => {
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
    const response = await fetch('/api/payment/intent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return response.json();
  }


  return (
    <PaymentContext.Provider
      value={{
        handleDeleteCustomer,
        secret,
        handleSetSecret,
        handleSetConfirmationToken,
        confirmationToken,
        handleSetLoading,
        user,
        handleSetUser,
        card,
        loading,
        error,
        plan,
        handlePlan,
        handleSetCard,
        handlePaymentIntent,
        paymentIntent,
        handleSetError
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}
