import { LoadingState } from '@/components/loading-state'
import { usePayment } from '@/lib/hooks/use-payment'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useWizard } from './hook/useWizard'

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
  const { dialogRef } = useWizard(steps, dialogOpen)

  return (
    <AnimatePresence>
      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#27272A80]"
          />
          <motion.dialog
            key="dialog"
            ref={dialogRef}
            open={dialogOpen}
            {...animationStepProps}
            className="rounded-lg shadow-lg min-h-[540px] w-11/12 max-w-2xl z-50 bg-gray-100 dark:bg-[#27272A]  border border-black"
          >
            <div className="flex justify-between items-center dark:bg-[#1E293B] bg-gray-200 dark:text-white text-black px-5 ">
              <h3 className="font-medium text-[24px] capitalize">
                {headerTitle}
              </h3>
              <button type="button" onClick={() => handleCloseWizard()}>
                {' '}
                <span className="text-[44px] ">&times;</span>{' '}
              </button>
            </div>
            {/* {error ? (
              <motion.div key="wizard-error-container" {...animationStepProps}>
                <div>{error}</div>
              </motion.div>
            ) : (
              steps
                ?.filter((_, index) => index === currentStep)
                .map(step => (
                  <motion.div key={step.name} {...animationStepProps}>
                    <div>
                      <step.component
                        next={Next}
                        prev={Prev}
                        close={close}
                        goTo={goTo}
                        currentStep={currentStep}
                        lastStep={lastStep}
                      />
                    </div>
                  </motion.div>
                ))
            )} */}
            <Content
              errorComponent={errorComponent}
              steps={steps}
              dialogOpen={dialogOpen}
            />
          </motion.dialog>
        </div>
      )}
    </AnimatePresence>
  )
}

function Content({ errorComponent, steps, dialogOpen }: { errorComponent?: JSX.Element, steps: WizardStep[], dialogOpen: boolean }) {
  const { error, loading } = usePayment()
  const { close, Next, Prev, goTo, lastStep, currentStep } = useWizard(steps, dialogOpen)
  const defaultErrorComponent = () => (
    <div>{error}</div>
  )
  const ErrorComponent = (() => errorComponent) || defaultErrorComponent

  if (error && error !== '') {
    return (
      <motion.div
        key="wizard-error-container"
        {...animationStepProps}
      >
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
