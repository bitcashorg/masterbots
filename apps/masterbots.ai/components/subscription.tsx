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
export default function Subscription({user}: {user: any}) {
  const {
    open,
    dialogRef,
    close,
    Next,
    Prev,
    isDialogOpen,
    goTo,
    currentStep
  } = useWizard(6, true)

  const { handleSetUser } = usePayment()
  handleSetUser(user)
  useEffect(() => {
    open()
  }, [isDialogOpen])

  const steps: WizardStep[] = [
    { component: Plans, name: 'Plans' },
    { component: WrappedPaymentInformation, name: 'Payment' },
    { component: Checkout, name: 'Checkout' },
    { component: LoadingState, name: 'Loading' },
    { component: SuccessContent, name: 'Success' },
    { component: ErrorContent, name: 'Error' }
  ]

  return (
    <div className="flex items-center justify-center h-screen">
      <DialogWizard
        goTo={goTo}
        dialogOpen={isDialogOpen}
        close={close}
        next={Next}
        prev={Prev}
        steps={steps}
        dialogRef={dialogRef}
        currentStep={currentStep}
        headerTitle="Masterbots Subscription plans"
      />
    </div>
  )
}
