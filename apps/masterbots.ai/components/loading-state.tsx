import Lottie from "lottie-react";
import LoadingAnim from "@/lib/animations/loading-blue.json";
export function LoadingState() {
    return(
        <div
        className="flex flex-col w-full justify-center items-center inner-content  dark:bg-[url(/success-bg-dark.png)] bg-[url(/success-bg.png)] my-auto "
     >  
            <div className="w-[240px] h-[240px]">
                <Lottie animationData={LoadingAnim}  />
             </div>
            <div className="flex flex-col w-[300px] text-black dark:text-white text-center">
                 <h2 className="font-medium text-[24px] ">Processing subscription
payment</h2>
            </div>

            <div className='dark:bg-black border mt-5 w-full border-t-black bg-white p-5 flex justify-center items-center space-x-4'>
                <button  type='submit'  className=' bg-gray-400 text-white dark:text-black rounded-full font-bold py-2 px-6 min-w-[10rem]'>
                Paying subscription
                </button>
            </div>
        
    </div>
    )
}