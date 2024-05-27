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
    <div className="flex flex-col  w-full">
      <div className="text-center">
        <span className="font-bold text-[16px]">
          Subscribe using <span className="text-[#635BFF]">Stripe</span>{' '}
        </span>
      </div>
      <div className="flex flex-col w-full mt-4 space-y-3 ">
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
            <div className="flex justify-between items-center inner-content  my-auto p-5"
            style={{backgroundImage: 'url(/free_plan_bg.png)' }}
            >
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-[13px] text-[#83E56A]">
                  PURCHASED
                </span>
                <div className="text-white space-y-1">
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
                  className={`h-3 w-3 rounded-full`}
                  style={{
                    backgroundColor:
                      selectedPlan === 'free' ? '#83E56A' : '#93abd3'
                  }}
                ></span>
                <h3 className="text-white text-[36px] font-bold">Free</h3>
              </div>
            </div>
          </label>
        </div>
        <div className="flex space-x-3">
            {
                plans.map((plan) => (
                    <PlanCard selectedPlan={selectedPlan} handlePlanChange={handlePlanChange} plan={plan} />
                ))
            }
        </div>
        <div>
              <a href="#" className="text-[16px] flex items-center">
                      I have a&nbsp;<strong> Referral Code</strong>
                      <IconChevronAngleRight className="w-4 h-4 " />
                </a>
        </div>
      </div>
    </div>
  )
}
