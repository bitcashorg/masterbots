'use client'
import DialogWizard from '@/components/ui/wizard'
import { useWizard } from '@/components/ui/wizard/hook'
import { useEffect } from 'react'


export default function Subscription() {

    const steps = [
        { content: <p>Step 1: Welcome to the wizard</p> }
      ];
 const { open, dialogRef,close } = useWizard(steps.length, true);
      
  useEffect(() => {
        open();
    },[]);

    function closeWizard() {
        close();
        console.log('closeDialog');
    }

      return (  
        <div className="flex items-center justify-center h-screen">
        <DialogWizard steps={steps} dialogRef={dialogRef}  >
            <button onClick={closeWizard} className="px-4 py-2 bg-blue-600 text-white rounded">
                close Wizard
            </button>
        </DialogWizard>
      </div>
      );
}