import SuccessAnim from "@/lib/animations/success-green.json";
import { usePayment } from "@/lib/hooks/use-payment";
import Lottie from "lottie-react";
import Link from "next/link";
import type { WizardStepProps } from './ui/wizard'
export function SuccessContent({ close }: WizardStepProps ) {
  const { paymentIntent } = usePayment()

  const handleClose = () => {
    close()
  }

  return (
    <div
      className="flex flex-col w-full justify-center items-center inner-content  dark:bg-[url(/success-bg-dark.png)] bg-[url(/success-bg.png)] my-auto "
    >
      <div className="w-[240px] h-[240px]">
        <Lottie animationData={SuccessAnim} loop={false} />
      </div>
      <div className="flex flex-col w-[300px] text-black dark:text-white text-center">
        <h2 className="font-medium text-[24px] ">Successfully subscribed to Masterbots Pro!</h2>
        <span>We will send your receipt via email. </span>
        <span>AND </span>
        <span className="text-[#71717A]"> You can <Link target="_blank" rel="noopener noreferrer" href={`/u/s/subs/${paymentIntent.id}`} className="text-blue-600">view receipt online</Link> </span>
      </div>

      <div className='dark:bg-black border mt-5  w-full border-t-black bg-white p-5 flex justify-center items-center space-x-4'>
        <button 
         onClick={handleClose}
         type='button' 
         className='dark:bg-white  bg-black text-white dark:text-black rounded-full font-bold py-2 px-6 min-w-[10rem]'>
          Close
        </button>
      </div>

    </div>
  )
}