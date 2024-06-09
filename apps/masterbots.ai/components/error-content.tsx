import Lottie from "lottie-react";
import ErrorAnim from "@/lib/animations/loading-error.json";
import { usePayment } from "@/lib/hooks/use-payment";
import  type { WizardStepProps } from "./ui/wizard";

export function ErrorContent({ lastStep, goTo, currentStep}: WizardStepProps) {
    const { error } = usePayment()
    const Retry = () => {
        console.log({lastStep})
        goTo(lastStep)
    }

    return(
        <div
        className="flex flex-col w-full justify-center items-center inner-content  dark:bg-[url(/success-bg-dark.png)] bg-[url(/success-bg.png)] my-auto "
     >  
            <div className="w-[240px] h-[240px] ">
                <Lottie animationData={ErrorAnim}  />
             </div>
            <div className="flex flex-col w-[300px] text-black dark:text-white text-center">
                 <h2 className="font-medium text-[24px] ">Failed to process your subscription payment:</h2>
                 <span className="text-[#F93333] text-[16px] ">{ error}</span>
            </div>

            <div className='dark:bg-black border mt-5 w-full border-t-black bg-white p-5 flex justify-center items-center space-x-4'>
                <button  onClick={Retry} type='button'  className='dark:bg-white  bg-black text-white dark:text-black rounded-full font-bold py-2 px-6 min-w-[10rem]'>
                    Retry
                </button>
            </div>
        
    </div>
    )
}