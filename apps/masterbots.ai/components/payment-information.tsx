import { StripeElement } from "./stripe-element"
import { PaymentElement } from '@stripe/react-stripe-js';
export function PaymentInformation() {
  return (
    <StripeElement>
    <form className="h-full w-full  dark:bg-[#18181B]  bg-[#F4F4F5]">
      <div className="max-w-[24rem]  mx-auto">
        <div className="text-center pt-2 text-gray-600 ">
          <span className="font-bold text-[16px] ">
            Subscribe using <span className="text-[#837de6]">Stripe</span>{' '}
          </span>
        </div>
        {/* <PaymentElement /> */}
      </div>
      <div className="dark:bg-black border  border-t-black bg-white p-5 flex justify-center items-center space-x-10">
        <button
          type="button"
          className="text-black dark:text-white font-bold hover:border-b  border-black pb-2  text-center"
        >
          Go Back
        </button>
        <button
          type="submit"
          className="dark:bg-white  bg-black text-white dark:text-black rounded-full font-bold py-2 px-4"
        >
          Pay Subscription
        </button>
      </div>
    </form>
    </StripeElement>
  )
}
