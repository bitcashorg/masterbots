'use client'
import DialogWizard from '@/components/ui/wizard'
import type { WizardStep } from '@/components/ui/wizard'
import { useEffect } from 'react'
import { Plans } from './plans'
import { SuccessContent } from './succes-content'
import { ErrorContent } from './error-content'
import { LoadingState } from './loading-state'
import { Checkout } from './checkout'
import { WrappedPaymentInformation } from './payment-information'
import { usePayment } from '@/lib/hooks/use-payment'
import { useRouter, usePathname } from 'next/navigation'


export default function Subscription({user}: {user: any}) {

  const router = useRouter();
  const pathname = usePathname()
  const { handleSetUser, handleDeleteCustomer, secret} = usePayment()
  handleSetUser(user)

  useEffect(() => {
    if (pathname !== '/c/p/payment') {
      router.replace('/c/p/payment', { shallow: true })
    }
  }, [router])

  const steps: WizardStep[] = [
    { component: Plans, name: 'Plans' },
    { component: WrappedPaymentInformation, name: 'Payment' },
    { component: Checkout, name: 'Checkout' },
    { component: LoadingState, name: 'Loading' },
    { component: SuccessContent, name: 'Success' },
    { component: ErrorContent, name: 'Error' }
  ]
  const handleCloseWizard = async () => {
    console.log({secret})
    if(secret) {
    const del = await handleDeleteCustomer(user.email)
    if(del) return router.push('/chat'); 
    }
    router.push('/chat')
 
  }
  return (
    <div className="flex items-center justify-center  ">
      <DialogWizard
        handleCloseWizard={handleCloseWizard}
        dialogOpen={true}
        steps={steps}
        headerTitle="Masterbots Subscription plans"
      />
    </div>
  )
}
