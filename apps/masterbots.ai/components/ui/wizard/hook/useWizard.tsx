'use client'
import { useState, useRef, MutableRefObject, useEffect } from 'react';
interface UseWizardReturn {
  currentStep: number;
  Next: () => void;
  Prev: () => void;
  open: () => void;
  close: () => void;
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
  isDialogOpen: boolean;
 goTo: (index: number) => void;
}

export const useWizard = (stepsLength: number, showModal: boolean): UseWizardReturn => {

  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(showModal);
  const dialogRef = useRef<HTMLDialogElement | null>(null);


  useEffect(() => {
    const dialogNode = dialogRef.current
    if (isDialogOpen && !dialogNode?.open) {
      dialogNode?.showModal()
      console.log('openDialog');
    } else {
      dialogNode?.close()
    }
  }, [isDialogOpen])


  const Next = () => {
    if (currentStep < stepsLength - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      dialogRef.current?.close();
    }
  };

  const Prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const open = () => {
    dialogRef.current?.showModal();
    setIsDialogOpen(true);
  };

  const close = () => {
    dialogRef.current?.close();
    setIsDialogOpen(false);
  };


  const goTo = (index: number) => setCurrentStep(index)
  return {
    currentStep,
    Next,
    Prev,
    open,
    close,
    dialogRef,
    isDialogOpen,
    goTo
  };
};
