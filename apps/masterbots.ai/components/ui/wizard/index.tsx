'use client'
interface Step {
  content: JSX.Element;
}

interface DialogWizardProps {
  steps: Step[];
  dialogRef: any;
  children: any;
}

const DialogWizard: React.FC<DialogWizardProps> = ({ steps, dialogRef, children}) => {
   
    return (
        <dialog ref={dialogRef} className="rounded-lg shadow-lg p-6 w-11/12 max-w-2xl">
         { children}
      </dialog>
    )
};

export default DialogWizard;
