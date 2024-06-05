import React,{ createContext, useState }  from 'react';


interface PaymentContextProps {
    payment: any;
    loading: boolean;
    error: any;
    plan: any;
    createPaymentIntent: (data: any) => void;
    handlePlan: (plan: any) => void;
}

const PaymentContext = createContext<PaymentContextProps | undefined>(
    undefined
  )
interface PaymentProviderProps {
    children: React.ReactNode;
}

export function usePayment() {
    const context = React.useContext(PaymentContext)
    if (!context) {
      throw new Error('useSidebarContext must be used within a SidebarProvider')
    }
    return context
  }
  
export  function PaymentProvider({children} : PaymentProviderProps) {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  const createPaymentIntent = async (data: any) => {
    try {
        setLoading(true);
        const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
      setPayment(json);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const handlePlan = (plan: any) => {
    setPlan(plan);
  }

  return (
    <PaymentContext.Provider value={{payment, loading, error, plan, handlePlan, createPaymentIntent}}>
      {children}
    </PaymentContext.Provider>
  );
}

