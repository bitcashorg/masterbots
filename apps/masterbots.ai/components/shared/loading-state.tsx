import LoadingAnim from "@/lib/animations/loading-blue.json";
import Lottie from "lottie-react";

export function LoadingState() {
  return (
    <div
      className="flex flex-col w-full min-h-[480px] justify-center items-center inner-content  dark:bg-[url(/success-bg-dark.png)] bg-[url(/success-bg.png)] my-auto py-5 "
    >
      <div className="w-[240px] h-[240px]">
        <Lottie animationData={LoadingAnim} />
      </div>
      <div className="flex flex-col w-[300px] text-black dark:text-white text-center">
        <h2 className="font-medium text-[24px] ">Processing subscription
          payment</h2>
      </div>

    </div>
  )
}