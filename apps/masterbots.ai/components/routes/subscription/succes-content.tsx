/**
 * SuccessContent Component
 * 
 * A component that displays a success message after a user successfully subscribes
 * to a subscription plan. It provides visual feedback and options for the user
 * to view their receipt and close the success dialog.
 * 
 * Key Features:
 * - Displays a success animation using Lottie
 * - Shows a confirmation message indicating successful subscription
 * - Provides a link to view the receipt online
 * - Includes a button to close the success dialog
 * 
 * Functionality:
 * - Uses the payment intent ID to generate a link for viewing the receipt
 * - Handles closing the dialog when the user clicks the close button
 * 
 * Props:
 * - close: Function to close the success dialog
 */


import SuccessAnim from '@/lib/animations/success-green.json'
import { usePayment } from '@/lib/hooks/use-payment'
import Lottie from 'lottie-react'
import Link from 'next/link'
import type { WizardStepProps } from '@/components/ui/wizard'
export function SuccessContent({ close }: WizardStepProps) {
  const { paymentIntent } = usePayment()

  const handleClose = () => {
    close()
  }

  return (
    <div className="flex flex-col w-full justify-center items-center inner-content  dark:bg-[url(/success-bg-dark.png)] bg-[url(/success-bg.png)] my-auto ">
      <div className="w-[240px] h-[240px]">
        <Lottie animationData={SuccessAnim} loop={false} />
      </div>
      <div className="flex flex-col w-[300px] text-black dark:text-white text-center">
        <h2 className="font-medium text-[24px] ">
          Successfully subscribed to Masterbots Pro!
        </h2>
        <span>We will send your receipt via email. </span>
        <span>AND </span>
        <span className="text-[#71717A]">
          {' '}
          You can{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`/u/s/subs/${paymentIntent.id}`}
            className="text-blue-600"
          >
            view receipt online
          </Link>{' '}
        </span>
      </div>

      <div className="flex items-center justify-center w-full p-5 mt-5 space-x-4 bg-white border dark:bg-black border-t-black">
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close"
          className="dark:bg-white  bg-black text-white dark:text-black rounded-full font-bold py-2 px-6 min-w-[10rem]"
        >
          Close
        </button>
      </div>
    </div>
  )
}
