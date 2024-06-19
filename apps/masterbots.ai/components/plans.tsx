'use client'
import React, { useEffect, useState } from 'react'
import PlanCard from './plan-card'
import { usePayment } from '../lib/hooks/use-payment'
import { useRouter } from 'next/navigation'
import { IconArrowRightNoFill } from '../components/ui/icons';

type PlansPros = {
  next: () => void
  prev: () => void
  close: () => void
  goTo: (index: number) => void
}
type PlanList = {
  id: string
  product: {
    name: string
    description: string
  }
  unit_amount: number
  recurring: {
    interval: string
    trial_period_days: number
  }
}
export function Plans({ next, goTo }: PlansPros) {
  const {
    handlePlan,
    handleSetSecret,
    secret,
    plan,
    user,
    loading,
    handleSetLoading,
    handleDeleteCustomer,
    handleSetError
  } = usePayment()

  const [selectedPlan, setSelectedPlan] = useState(plan?.duration || 'free')
  const [plans, setPlans] = useState<PlanList[]>([])
  const router = useRouter()

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(e.target.value)
  }

  const handleCloseWizard = async () => {
    const del = await handleDeleteCustomer(user.email)
    if (del) return router.push('/chat')
  }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/payment/plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        // remove the free plan from the list
        data.plans = data.plans.filter((plan: any) => plan.unit_amount !== 0)
        // show the plans in ascending order
        data.plans.sort((a: any, b: any) => b.unit_amount - a.unit_amount)
        setPlans(data.plans)
      } catch (error) {
        console.error('Error fetching plans:', error)
      } 
    }

    fetchPlans()
  }, [])

  const handleSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSetLoading(true)
    const formData = new FormData(e.currentTarget)
    const plan = formData.get('plan')
    const paymentPlan = plans.find(p => p.recurring.interval === plan)
    if (plan === 'free') {
      alert('Please select a paid plan to use this feature')
      handleSetLoading(false)
      return
    }
    handlePlan(paymentPlan)

    if (secret === '') {
     
      const data = {
        planId: paymentPlan?.id,
        trialPeriodDays: paymentPlan?.recurring?.trial_period_days || 0,
        automatic_payment_methods: {
          enabled: true
        },
        email: user.email,
        name: user.name
      }

      const response = await fetch('/api/payment/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const { error, client_secret } = await response.json()
      if (client_secret) {
        handleSetSecret(client_secret)
        next()
      }
      if(error){
        handleSetError(error)
        goTo(5)
      }

      handleSetLoading(false)
    }else{
       next()
       handleSetLoading(false)
    }
   
  }
  return (
    <form className="flex flex-col  w-full " onSubmit={handleSubscription}>
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
            required
          />
          <label htmlFor="free" className="block w-full h-full ">
            <div className="flex justify-between items-center inner-content  dark:bg-[url(/free_plan_bg.png)] bg-[url(/free_plan_bg_light.png)] my-auto p-5">
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
                />
                <h3 className="dark:text-white  text-black text-[36px] font-bold">
                  Free
                </h3>
              </div>
            </div>
          </label>
        </div>
        <div className="flex space-x-3">
          {plans.length > 0 ? (
            plans.map(plan => (
              <PlanCard
                key={plan.id}
                selectedPlan={selectedPlan}
                handlePlanChange={handlePlanChange}
                plan={plan}
              />
            ))
          ) : (
            <div>No plans available</div>
          )}
        </div>
        <div>
          <a
            href="/referral"
            className="text-[16px] flex items-center space-x-2"
          >
            <span>
              I have a&nbsp;<strong> Referral Code</strong>{' '}
            </span>
            <IconArrowRightNoFill className="mt-2 w-5 h-5"  />
          </a>
        </div>
      </div>

      <div className="dark:bg-black border  border-t-black bg-white p-5 flex justify-center items-center space-x-4">
        <button
          type="button"
          onClick={handleCloseWizard}
          className="text-black dark:text-white font-bold  text-center"
        >
          Maybe Later
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`dark:bg-white  bg-black text-white dark:text-black rounded-full font-bold py-2 px-4 ${loading ? 'opacity-50' : ''}`}
        >
          Subscribe Now
        </button>
      </div>
    </form>
  )
}
