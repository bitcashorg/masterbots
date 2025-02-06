/**
 * PaymentInformation Component
 *
 * A component that handles the payment information input for subscription
 * checkout using Stripe. It provides a user interface for entering payment
 * details and processes the payment securely.
 *
 * Key Features:
 * - Integrates Stripe's PaymentElement for secure payment information entry
 * - Manages loading states during payment submission
 * - Provides visual feedback for the current payment state
 * - Allows users to navigate back to the previous step
 *
 * Functionality:
 * - Submits payment information to Stripe and handles errors
 * - Updates the UI based on the payment method and confirmation token
 *
 * Props:
 * - prev: Function to go back to the previous step
 * - next: Function to proceed to the next step
 */

import type { WizardStepProps } from '@/components/ui/wizard'
import { usePayment } from '@/lib/hooks/use-payment'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import type React from 'react'
import { useState } from 'react'
import { StripeElement } from '@/components/routes/subscription/stripe-element'
import { cn } from '@/lib/utils'

export function PaymentInformation({ prev, next }: WizardStepProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, handleSetLoading] = useState(false)
  const { handleSetCard, handleSetError, handleSetConfirmationToken, user } =
    usePayment()

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleSetLoading(true)
    if (!stripe || !elements) {
      handleSetLoading(false)
      handleSetError('Stripe.js  and Element has not loaded')

      return
    }
    const { error: submitError } = await elements.submit()
    if (submitError) {
      handleSetLoading(false)
      handleSetError(submitError.message)
    }

    const { error, confirmationToken } = await stripe.createConfirmationToken({
      elements,
      params: {
        payment_method_data: {
          billing_details: {
            email: user.email
          }
        }
      }
    })
    if (error) {
      handleSetLoading(false)
      handleSetError(error.message)
      return
    }

    const cardData = confirmationToken?.payment_method_preview.card
    handleSetCard(cardData)
    handleSetConfirmationToken(confirmationToken?.id)
    handleSetLoading(false)
    next()
  }

  return (
    <form
      className="w-full dark:bg-[#18181B] bg-[#F4F4F5] h-full"
      onSubmit={handlePaymentSubmit}
    >
      <div className="max-w-[24rem] mx-auto">
        <div className="pt-2 text-center text-gray-600">
          <span className="font-bold text-[16px]">
            Subscribe using <span className="text-[#837de6]">Stripe</span>{' '}
          </span>
        </div>
        <div className="min-h-[480px] w-full max-w-[360px] flex items-center justify-center [&_div]:w-full mb-5">
          <PaymentElement />
        </div>
      </div>

      <div className="flex items-center justify-center p-5 space-x-10 bg-white border-t dark:bg-black border-t-black">
        <button
          onClick={prev}
          type="button"
          className="pb-2 font-bold text-center text-black border-black dark:text-white hover:border-b"
        >
          Go Back
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className={cn(
            'dark:bg-white bg-black text-white dark:text-black rounded-full font-bold py-2 px-4',
            { 'opacity-50': isLoading }
          )}
        >
          Checkout
        </button>
      </div>
    </form>
  )
}

export function WrappedPaymentInformation({
  goTo,
  prev,
  next,
  close,
  lastStep,
  currentStep
}: WizardStepProps) {
  return (
    <StripeElement>
      <PaymentInformation
        goTo={goTo}
        prev={prev}
        next={next}
        close={close}
        lastStep={lastStep}
        currentStep={currentStep}
      />
    </StripeElement>
  )
}
