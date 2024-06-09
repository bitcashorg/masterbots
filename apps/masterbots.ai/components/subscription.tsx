'use client'
import DialogWizard from '@/components/ui/wizard'
import type { WizardStep } from '@/components/ui/wizard'
import { useWizard } from '@/components/ui/wizard/hook'
import { useEffect } from 'react'
import { Plans } from './plans'
import { SuccessContent } from './succes-content'
import { ErrorContent } from './error-content'
import { LoadingState } from './loading-state'
import { Checkout } from './checkout'
import { WrappedPaymentInformation } from './payment-information'
import { usePayment } from '@/lib/hooks/use-payment'
import { useRouter } from 'next/navigation'
export default function Subscription({user}: {user: any}) {

  const router = useRouter();
  const { handleSetUser, handleDeleteCustomer} = usePayment()
  handleSetUser(user)

  const steps: WizardStep[] = [
    { component: Plans, name: 'Plans' },
    { component: WrappedPaymentInformation, name: 'Payment' },
    { component: Checkout, name: 'Checkout' },
    { component: LoadingState, name: 'Loading' },
    { component: SuccessContent, name: 'Success' },
    { component: ErrorContent, name: 'Error' }
  ]
  const handleCloseWizard = async () => {
    const del = await handleDeleteCustomer(user.email)
    if(del) return router.push('/chat'); 
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <DialogWizard
        handleCloseWizard={handleCloseWizard}
        dialogOpen={true}
        steps={steps}
        headerTitle="Masterbots Subscription plans"
      />
    </div>
  )
}
