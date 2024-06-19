import React,{useEffect, useState} from 'react';
import { StripeElement } from "./stripe-element";
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { usePayment } from "@/lib/hooks/use-payment";
import { WizardStepProps } from "@/components/ui/wizard";

export function PaymentInformation({  prev, next}:WizardStepProps){
 
  const stripe = useStripe();
  const elements = useElements();
  const { 
    handleSetCard, 
    handleSetError, 
    handleSetConfirmationToken,
    loading:isLoading,
    handleSetLoading,
    user
   } = usePayment();

   
   useEffect(() => {
    if (stripe && elements) {
      console.log('Stripe.js and Elements have loaded.')
    }
  }, [stripe, elements])

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      handleSetLoading(false);
      handleSetError("Stripe.js  and Element has not loaded")
      return;
    }
    handleSetLoading(true);
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleSetLoading(false);
      handleSetError(submitError.message)
    }
    
    const {error, confirmationToken} = await stripe.createConfirmationToken({
      elements,
      params: {
        payment_method_data: {
          billing_details: {
            name: user.name,
          }
        }
      }
    });

    if (error) {
      handleSetLoading(false);
      handleSetError(error.message)
    }

    const cardData = confirmationToken?.payment_method_preview.card;
    handleSetCard(cardData);
    handleSetConfirmationToken(confirmationToken?.id);
    handleSetLoading(false);
    next();
  };


  return (
      <form className="h-full w-full dark:bg-[#18181B] bg-[#F4F4F5]" onSubmit={handlePaymentSubmit}>
        <div className="max-w-[24rem] mx-auto">
          <div className="text-center pt-2 text-gray-600">
            <span className="font-bold text-[16px]">
              Subscribe using <span className="text-[#837de6]">Stripe</span>{' '}
            </span>
          </div>
          <div className="my-5">
             <PaymentElement />
          </div>
        </div>
        
        <div className="dark:bg-black border border-t-black bg-white p-5 flex justify-center items-center space-x-10">
          <button
            onClick={() => prev()}
            type="button"
            className="text-black dark:text-white font-bold hover:border-b border-black pb-2 text-center"
          >
            Go Back
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className={`dark:bg-white bg-black text-white dark:text-black rounded-full font-bold py-2 px-4 ${isLoading ? 'opacity-50' : ''}`}
          >
           Checkout
          </button>
        </div>
      </form>
  );
}

// Wrap your PaymentInformation component with Elements
export function WrappedPaymentInformation({ goTo, prev, next, close, lastStep, currentStep }:WizardStepProps){

  return (
    <StripeElement>
      <PaymentInformation goTo={goTo} prev={prev} next={next} close={close} lastStep={lastStep} currentStep={currentStep} />
    </StripeElement>
  );
}
