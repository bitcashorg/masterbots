import Lottie from "lottie-react";
import SuccessAnim from "@/lib/animations/success-green.json";
import { usePayment } from "@/lib/hooks/use-payment";
export function SuccessContent() {

    const { paymentIntent } = usePayment()
    return(
        <div
        className="flex flex-col w-full justify-center items-center inner-content  dark:bg-[url(/success-bg-dark.png)] bg-[url(/success-bg.png)] my-auto "
     >  
            <div className="w-[240px] h-[240px]">
                <Lottie animationData={SuccessAnim}   />
             </div>
            <div className="flex flex-col w-[300px] text-black dark:text-white text-center">
                 <h2 className="font-medium text-[24px] ">Successfully subscribed to Masterbots Pro!</h2>
                 <span>We will send your receipt via email. </span>
                 <span className="text-[#71717A]">Your subscription payment intent id is: <br/>{paymentIntent?.id}</span>
            </div>

            <div className='dark:bg-black border mt-5  w-full border-t-black bg-white p-5 flex justify-center items-center space-x-4'>
                <button  type='submit'  className='dark:bg-white  bg-black text-white dark:text-black rounded-full font-bold py-2 px-6 min-w-[10rem]'>
                    Close
                </button>
            </div>
        
    </div>
    )
}