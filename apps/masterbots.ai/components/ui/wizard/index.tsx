'use client'
import { AnimatePresence, motion } from 'framer-motion'

export interface WizardStepProps {
  next: () => void
  prev: () => void
  close: () => void
}

export interface WizardStep {
  name: string
  component: React.ComponentType<WizardStepProps>;
}

interface DialogWizardProps {
  steps: WizardStep[]
  dialogRef: any
  error?: string
  next: () => void
  prev: () => void
  close: () => void,
  dialogOpen: boolean
}
const animationStepProps = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
  transition: { duration: 0.24 }
}

const DialogWizard: React.FC<DialogWizardProps> = ({
  steps,
  dialogRef,
  error,
  next,
  prev,
  close,
  dialogOpen
}) => {
  return (
    // <div className="fixed inset-0 flex items-center justify-center z-50">
    // <div className="fixed inset-0 bg-[#27272A80]"></div>
    //  <dialog
    //     ref={dialogRef}
    //     className="rounded-lg shadow-lg p-6 w-11/12 max-w-2xl"
    //   >
    //      <AnimatePresence mode="popLayout" initial>
    
    //     {error ? (
    //       <motion.div key="wizard-error-container" {...animationStepProps}>
    //         <div>{error}</div>
    //       </motion.div>
    //     ) : (
    //       steps?.map((step, index) => (
    //         <motion.div key={step.name} {...animationStepProps}>
    //          <div key={index} >
    //            <step.component next={next} prev={prev}  close={close} />
    //          </div>

    //         </motion.div>
    //       ))
    //     )}

    // </AnimatePresence>
    //   </dialog>
    // </div>

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
            {...animationStepProps}
            className="rounded-lg shadow-lg p-6 w-11/12 max-w-2xl z-50"
          >
         {error ? (
          <motion.div key="wizard-error-container" {...animationStepProps}>
            <div>{error}</div>
          </motion.div>
        ) : (
          steps?.map((step, index) => (
            <motion.div key={step.name} {...animationStepProps}>
             <div key={index} >
               <step.component next={next} prev={prev}  close={close} />
             </div>

            </motion.div>
          ))
        )}
          </motion.dialog>
        </div>
        )}
     
    </AnimatePresence>
  )
}

export default DialogWizard
