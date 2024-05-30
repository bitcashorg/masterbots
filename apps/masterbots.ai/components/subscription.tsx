'use client'
import DialogWizard, { WizardStep } from '@/components/ui/wizard'
import { useWizard } from '@/components/ui/wizard/hook'
import { useEffect } from 'react'
import { Plans } from './plans'

export default function Subscription() {
  const { open, dialogRef, close, Next, Prev, isDialogOpen } = useWizard(1, true)

  useEffect(() => {
    open()
  }, [isDialogOpen])


  const steps: WizardStep[] = [{ component: Plans, name: 'Step 1' }]

  return (
    <div className="flex items-center justify-center h-screen">
      <DialogWizard
        dialogOpen={isDialogOpen}
        close={close}
        next={Next}
        prev={Prev}
        steps={steps}
        dialogRef={dialogRef}
        headerTitle='Masterbots Subscription plans'
      />
    </div>
  )
}
