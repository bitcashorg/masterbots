import { IconCreditCard, IconHelp } from '@/components/ui/icons'
import { usePayment } from '@/lib/hooks/use-payment'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { StripeElement } from './stripe-element'
import type { WizardStepProps } from './ui/wizard'
import { getCurrentOrTargetDate } from '@/lib/utils'

export function InnerCheckout({ prev, next }: WizardStepProps) {
  const { card, plan, loading, handleSetLoading } = usePayment()
  const price = (plan?.unit_amount ? plan?.unit_amount / 100 : 0).toFixed(2);
  const stripe = useStripe()
  const elements = useElements()
  const {
    handleSetError,
    confirmationToken,
    secret,
    handlePaymentIntent
  } = usePayment()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (stripe && elements) {
      setMounted(true)
      console.log('Stripe.js and Elements have loaded.')
    }
  }, [stripe, elements])

 
  const submit = async () => {
    try {
      handleSetLoading(true)
      if (!stripe || !elements) {
        handleSetLoading(false)
        handleSetError('Stripe.js and Elements have not loaded')
        return
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        clientSecret: secret,
        confirmParams: {
          confirmation_token: confirmationToken
        },
        redirect: 'if_required'
      })

      if (error) {
        console.error('Error creating payment intent:', error)
        handleSetLoading(false)
        handleSetError(error.message)
        return
      }

      handlePaymentIntent(paymentIntent)
      handleSetLoading(false)
      window.history.pushState({}, '', `/u/s/subs/${paymentIntent.id}`)
      next()
    } catch (error: any) {
      console.error('Error creating payment intent:', error)
      handleSetLoading(false)
      handleSetError(error?.message)
    }
  }

  return (
    <div className="size-full dark:bg-[#18181B] bg-[#F4F4F5]">
      <div className="max-w-96 mx-auto">
        <div className="text-center pt-2 text-gray-600">
          <span className="font-bold text-[16px]">
            Subscribe using <span className="text-[#837de6]">Stripe</span>{' '}
          </span>
        </div>
        <div className="text-left mt-5  md:pr-0 pr-10">
          <div className="w-40 leading-[14.88px]">
            <span className="text-[12px] font-bold text-[#71717A] w-10">
              Pay The{' '}
              <span className="capitalize">
                {plan?.recurring.interval + 'ly'}
              </span>{' '}
              Plan Subscription
            </span>
          </div>
          <h2 className="font-bold text-[32px]">${price}</h2>
          {card && (
            <div className="flex space-x-3 items-center bg-white dark:bg-[#1E293B] p-3">
              <IconCreditCard className=" fill-black dark:fill-white" />
              <span>
                Subscribing with card ending with{' '}
                <strong>****{card.last4}</strong>
              </span>
            </div>
          )}
        </div>
        <div className="w-full mt-5 md:pr-0 pr-10">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span>
                {' '}
                <strong>{plan?.product.name}</strong> subscription*
              </span>
              <span className="text-[#71717A] font-normal text-[11px]">
                *charged once every {getCurrentOrTargetDate()}
              </span>
            </div>
            <span>${ plan?.product?.name?.toLowerCase().includes('year') ? (4.49 * 12) : price }</span>
          </div>
          {plan?.product?.name?.toLowerCase().includes('year') && (
            <div className="flex justify-between text-gray-400 mt-3">
              <span>
                {' '}
                <strong>Year Plan</strong> subscription discount
              </span>
              <span>-${((4.49 * 12) - Number(price)).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between mt-5 pb-4 border-b">
            <span className="font-bold">Subtotal</span>
            <span>${price}</span>
          </div>
          <div className="flex justify-between mt-3 pb-4 border-b">
            <div className="flex flex-col text-gray-400">
              <div className="flex space-x-1 items-center content-center">
                <span>
                  <strong>Additional Fees* </strong>
                </span>
                <IconHelp className="mt-4 size-7" />
              </div>
              <span className="font-normal text-[11px]">
                *calculated by country regulations.
              </span>
              <a href="/terms" className="text-blue-400 text-[11px]">
                Terms and Conditions.
              </a>
            </div>
            <span className="text-gray-400">$0.00</span>
          </div>
          <div className="flex justify-between mt-3 pb-4 border-b">
            <span className="font-bold"> Total Due</span>
            <span>${price}</span>
          </div>
        </div>
      </div>
      <div className="dark:bg-black border border-t-black bg-white p-5 flex justify-center items-center space-x-10">
        <button
          type="button"
          onClick={() => prev()}
          className="text-black dark:text-white font-bold hover:border-b border-black pb-2 text-center"
        >
          Go Back
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={submit}
          className={`dark:bg-white bg-black text-white dark:text-black rounded-full font-bold py-2 px-4 ${loading ? 'opacity-50' : ''
            }`}
        >
          Pay Subscription
        </button>
      </div>
    </div>
  )
}

export function Checkout({
  goTo,
  prev,
  next,
  close,
  lastStep,
  currentStep
}: WizardStepProps) {
  return (
    <StripeElement>
      <InnerCheckout
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
