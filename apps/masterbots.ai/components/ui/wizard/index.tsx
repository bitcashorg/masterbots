import { LoadingState } from '@/components/loading-state'
import { usePayment } from '@/lib/hooks/use-payment'
import { motion } from 'framer-motion'
import React from 'react'
import { useWizard } from './hook/useWizard'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog'

export interface WizardStepProps {
  next: () => void
  prev: () => void
  close: () => void
  goTo: (index: number) => void
  lastStep: number
  currentStep: number
}

export interface WizardStep {
  name: string
  component: React.ComponentType<WizardStepProps>
}

interface DialogWizardProps {
  steps: WizardStep[]
  error?: string
  dialogOpen: boolean
  headerTitle: string
  handleCloseWizard: () => void
  errorComponent?: JSX.Element
}
const animationStepProps = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
  transition: { duration: 0.24 }
}

const DialogWizard: React.FC<DialogWizardProps> = ({
  steps,
  dialogOpen,
  headerTitle,
  handleCloseWizard,
  errorComponent
}) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={handleCloseWizard}>
      <DialogContent className="flex flex-col  rounded-sm max-h-screen md:min-h-[540px] w-full md:w-11/12 p-0 md:max-w-2xl z-50 bg-gray-100 dark:bg-[#27272A] border border-iron dark:border-mirage overflow-y-auto ">
        <DialogHeader className="sticky top-0 flex md:px-10 z-50 md:max-h-auto max-h-20 md:justify-between mb-0   dark:bg-[#1E293B] bg-gray-200 dark:text-white text-black p-5 pb-10">
          <DialogTitle>{headerTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow md:mb-0 mb-20">
          <Content
            errorComponent={errorComponent}
            steps={steps}
            dialogOpen={dialogOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Content({
  errorComponent,
  steps,
  dialogOpen
}: {
  errorComponent?: JSX.Element
  steps: WizardStep[]
  dialogOpen: boolean
}) {
  const { error, loading } = usePayment()
  const { close, Next, Prev, goTo, lastStep, currentStep } = useWizard(
    steps,
    dialogOpen
  )
  const defaultErrorComponent = () => <div>{error}</div>
  const ErrorComponent = (() => errorComponent) || defaultErrorComponent

  if (error && error !== '') {
    return (
      <motion.div key="wizard-error-container" {...animationStepProps}>
        <ErrorComponent />
      </motion.div>
    )
  }

  if (loading) return <LoadingState />

  return steps
    ?.filter((_, index) => index === currentStep)
    .map(step => (
      <motion.div
        key={step.name}
        className="min-h-[480px]"
        {...animationStepProps}
      >
        <step.component
          next={Next}
          prev={Prev}
          close={close}
          goTo={goTo}
          currentStep={currentStep}
          lastStep={lastStep}
        />
      </motion.div>
    ))
}

export default DialogWizard
