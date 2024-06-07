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
  paymentIntent: string
  user: {
    id: string
    image: string
    name: string
    email: string
    hasuraJwt: string
  }
  handleSetUser: (user: any) => void
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

  return (
    <PaymentContext.Provider
      value={{
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
