'use client'
import DialogWizard from '@/components/ui/wizard'
import type { WizardStep } from '@/components/ui/wizard'
import { useWizard } from '@/components/ui/wizard/hook'
import { useEffect } from 'react'
import { Plans } from './plans'
import { SuccessContent } from './succes-content'
import { ErrorContent } from './error-content'

export default function Subscription() {
  const {
    open,
    dialogRef,
    close,
    Next,
    Prev,
    isDialogOpen,
    goTo,
    currentStep
  } = useWizard(2, true)

  useEffect(() => {
    open()
    goTo(2)
  }, [isDialogOpen])

  const steps: WizardStep[] = [
    { component: Plans, name: 'Plans' },
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
