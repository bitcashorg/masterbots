'use client'
import DialogWizard from '@/components/ui/wizard'
import type { WizardStep } from '@/components/ui/wizard'
import { useWizard } from '@/components/ui/wizard/hook'
import { useEffect } from 'react'
import { Plans } from './plans';
import  { SubscriptionSuccess } from './subscription-succes';

export default function Subscription() {
  const { open, dialogRef, close, Next, Prev, isDialogOpen, goTo,currentStep } = useWizard(2, true)

  useEffect(() => {
    open()
    goTo(1)
  }, [isDialogOpen])

  const steps: WizardStep[] = [
    { component: Plans, name: 'Step 1' },
    { component: SubscriptionSuccess, name: 'Step 2' }
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
        headerTitle='Masterbots Subscription plans'
      />
    </div>
  )
}
