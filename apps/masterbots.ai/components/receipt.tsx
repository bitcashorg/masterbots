'use client'

import { IconCreditCard, IconHelp } from './ui/icons'
import React, { useEffect, useState } from 'react'

interface ReceiptProps {
  intentid: string
}

type Subscription = {
  customer: {
    name: string
  }
  plan: {
    amount: number
    interval: string
    product: {
      name: string
    }
  }
  current_period_start: number
}

const initialState = {
  customer: {
    name: ''
  },
  plan: {
    amount: 0,
    interval: '',
    product: {
      name: ''
    }
  },
  current_period_start: 0
}
type Card = {
  last4: string
}
export const Receipt: React.FC<ReceiptProps> = ({ intentid }) => {
  const [subscription, setSubscription] = useState<Subscription>(initialState)
  const [card, setCard] = useState<Card>({ last4: '' })

  useEffect(() => {
    const fetchPayment = async () => {
      const response = await fetch(
        `/api/payment/subscription?paymentIntentId=${intentid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const responseData = await response.json()
      setSubscription(responseData.subscription)
      setCard(responseData.card.card)
    }
    fetchPayment()
  }, [])

  function getDate(timestamp: number) {
    let date
    if (timestamp === 0) {
      date = new Date()
    } else {
      date = new Date(timestamp * 1000)
    }
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric'
    }
    const dateString = date.toLocaleString('en-US', options)

    return dateString
  }

  const plan = subscription.plan
  const price = (plan?.amount / 100).toFixed(2)

  return (
    plan && (
      <div className="h-full w-full dark:bg-[#18181B] bg-[#F4F4F5]">
        <div className="max-w-[24rem] mx-auto">
          <div className="text-left pt-2 text-black dark:text-white flex flex-col">
            <span className="font-bold text-[24px] uppercase">Receipt</span>
            <span className="font-bold text-[16px]">Payment Intent ID:</span>
            <span className="font-medium text-[16px]">{intentid}</span>
          </div>
          <div className="text-left mt-5">
            <div className="w-40 leading-[14.88px]">
              <span className="text-[12px] font-bold text-[#71717A] w-10">
                You Paid The{' '}
                <span className="capitalize">{plan.interval + 'ly'}</span> Plan
                Subscription
              </span>
            </div>
            <h2 className="font-bold text-[32px]">${price}</h2>
            {/* {card && ( */}
            <div className="flex space-x-3 items-center bg-white dark:bg-[#1E293B] p-3">
              <IconCreditCard className="text-white fill-black dark:fill-white" />
              <div className="flex flex-col">
                <span>
                  {' '}
                  Dear<strong>{subscription?.customer?.name}</strong>,{' '}
                </span>
                <span>
                  Subscribing with card ending with{' '}
                  <strong>****{card.last4}</strong>
                </span>
              </div>
            </div>
            {/* )} */}
          </div>
          <div className="w-full mt-5">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span>
                  {' '}
                  <strong>{plan?.product?.name}</strong> subscription*
                </span>
                <span className="text-[#71717A] font-normal text-[11px]">
                  *charged once every{' '}
                  <strong> {getDate(subscription.current_period_start)}</strong>
                </span>
              </div>
              <span>${price}</span>
            </div>
            <div className="flex justify-between text-gray-400 mt-3">
              <span>
                {' '}
                <strong>Year Plan</strong> subscription discount
              </span>
              <span>-$0.00</span>
            </div>
            <div className="flex justify-between mt-5 pb-4 border-b">
              <span className="font-bold"> Subtotal</span>
              <span>${price}</span>
            </div>
            <div className="flex justify-between mt-3 pb-4 border-b">
              <div className="flex flex-col text-gray-400">
                <div className="flex space-x-1 items-center content-center">
                  <span>
                    <strong>Additional Fees* </strong>
                  </span>
                  <IconHelp className="mt-4 w-7 h-7" />
                </div>
                <span className="font-normal text-[11px]">
                  *calculated by country regulations.
                </span>
                <a href="#" className="text-blue-400 text-[11px]">
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
      </div>
    )
  )
}
