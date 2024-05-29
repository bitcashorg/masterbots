'use client'
import React, { useState } from 'react'
import PlanCard from './plan-card'
import { plans } from '../lib/utils'
import { IconChevronAngleRight } from './ui/icons'
export function Plans() {
  const [selectedPlan, setSelectedPlan] = useState('')

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(e.target.value)
    console.log(e.target.value)
  }

  return (
    <form className="flex flex-col  w-full ">
      <div className="text-center pt-2">
        <span className="font-bold text-[16px]">
          Subscribe using{' '}
          <span className="dark:text-[#635BFF]  text-[#635BFF]">Stripe</span>{' '}
        </span>
      </div>
      <div className="flex flex-col w-full space-y-3 p-5 ">
        <div
          className={`border-gradient w-full h-[135px]  ${selectedPlan === 'free' ? 'selected' : ''}`}
          id="free-plan"
        >
          <input
            type="radio"
            id="free"
            name="plan"
            value="free"
            onChange={handlePlanChange}
            checked={selectedPlan === 'free'}
            className="hidden"
          />
          <label htmlFor="free" className="block w-full h-full ">
            <div
              className="flex justify-between items-center inner-content  dark:bg-[url(/free_plan_bg.png)] bg-[url(/free_plan_bg_light.png)] my-auto p-5"
              // style={{backgroundImage: 'url(/free_plan_bg.png)' }}
            >
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-[13px] dark:text-[#83E56A]  text-[#BE17E8]">
                  PURCHASED
                </span>
                <div className="dark:text-white  text-black space-y-1">
                  <p>
                    With the <strong>Free</strong> plan you obtain:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>Browse any thread and category.</li>
                    <li>Chat with the Masterbots.</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <span
                  className={`h-3 w-3 rounded-full ${selectedPlan === 'free' ? 'dark:bg-green-500 bg-[#BE17E8] ' : 'dark:bg-gray-500  bg-gray-300'}`}
                ></span>
                <h3 className="dark:text-white  text-black text-[36px] font-bold">
                  Free
                </h3>
              </div>
            </div>
          </label>
        </div>
        <div className="flex space-x-3">
          {plans.map(plan => (
            <PlanCard
              selectedPlan={selectedPlan}
              handlePlanChange={handlePlanChange}
              plan={plan}
            />
          ))}
        </div>
        <div>
          <a href="#" className="text-[16px] flex items-center space-x-2">
            <span>
              I have a&nbsp;<strong> Referral Code</strong>{' '}
            </span>
            <svg
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.14282 13.537L7.23552 7.44426L1.14282 1.35156"
                stroke="#09090B"
                stroke-width="1.52318"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
        
      </div>

      <div className='dark:bg-black border  border-t-black bg-white p-5 flex justify-center space-x-4'>
          <button type='button' className='text-black dark:text-white font-bold border border-b-black'>
            Maybe Later
          </button>
          <button  type='submit'  className='dark:bg-white  bg-black text-white dark:text-black rounded-full font-bold py-2 px-4'>
            Subscribe Now
          </button>
      </div>
    </form>
  )
}
