'use client'
import DialogWizard from '@/components/ui/wizard'
import type { WizardStep } from '@/components/ui/wizard'
import { use, useEffect, useState } from 'react'
import { Plans } from './plans'
import { SuccessContent } from './succes-content'
import { ErrorContent } from './error-content'
import { LoadingState } from './loading-state'
import { Checkout } from './checkout'
import { WrappedPaymentInformation } from './payment-information'
import { usePayment } from '@/lib/hooks/use-payment'
import {  useRouter } from 'next/navigation'

export default function Subscription({ user }: { user: { email: string; name:string } }) {
  const { handleSetUser, handleDeleteCustomer } = usePayment()
  const [openDialog, setOpenDialog] = useState(false)
  handleSetUser(user)

  const router = useRouter()

  const steps: WizardStep[] = [
    { component: Plans, name: 'Plans' },
    { component: WrappedPaymentInformation, name: 'Payment' },
    { component: Checkout, name: 'Checkout' },
    { component: LoadingState, name: 'Loading' },
    { component: SuccessContent, name: 'Success' },
    { component: ErrorContent, name: 'Error' }
  ]

  const handleCloseWizard = async () => {
    const del = await handleDeleteCustomer(user?.email)
    if (del) return router.push('/chat')
  }


  async function CheckIfCustomerHasActiveSub(){
  
    const response = await fetch('/api/payment/subscription', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    });
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return;
    }
    if (!data.active) {
      setOpenDialog(true);
    }
  }

  useEffect(() => {
    CheckIfCustomerHasActiveSub();
  }, [openDialog]);

  return (
    <div className="flex items-center justify-center  ">
      <DialogWizard
        handleCloseWizard={() => handleCloseWizard()}
        dialogOpen={openDialog}
        steps={steps}
        headerTitle="Masterbots Subscription plans"
      />
    </div>
  )
}
