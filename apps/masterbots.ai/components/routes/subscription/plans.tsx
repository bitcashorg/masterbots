import { getSubscriptionPlans } from '@/app/actions'
import { PlansPros } from '@/types/types'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { IconArrowRightNoFill } from '@/components/ui/icons'
import { usePayment } from '@/lib/hooks/use-payment'
import { cn } from '@/lib/utils'
import PlanCard from '@/components/routes/subscription/plan-card'

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
    handleSetError,
    handleSetStripePublishKey,
    handleSetStripeSecret
  } = usePayment()

  const [selectedPlan, setSelectedPlan] = useState(plan?.duration || 'free')
  const router = useRouter()
  const { value: plans, loading: loadingPlans } = useAsync(async () =>
    await getSubscriptionPlans({
      handleSetStripePublishKey,
      handleSetStripeSecret,
    })
  )

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlan(e.target.value)
  }

  const handleCloseWizard = async () => {
    const del = await handleDeleteCustomer(user.email)
    if (del) return router.push('/c')
  }

  const handleSubscription = async (plan: any) => {
    const response = await fetch('/api/payment/intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plan)
    })
    const { error, client_secret } = await response.json()
    if (client_secret) {
      handleSetSecret(client_secret)
      next()
    }
    if (error) {
      handleSetError(error)
    }
  }

  const submitSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSetLoading(true)
    const formData = new FormData(e.currentTarget)
    const plan = formData.get('plan')
    const paymentPlan = plans?.find(p => p.recurring.interval === plan)
    if (plan === 'free') {
      alert('Please select a paid plan to use this feature')
      handleSetLoading(false)
      return
    }
    handlePlan(paymentPlan)

    if (!secret) {
      const data = {
        planId: paymentPlan?.id,
        trialPeriodDays: paymentPlan?.recurring?.trial_period_days || 0,
        automatic_payment_methods: {
          enabled: true
        },
        email: user.email,
        name: user.name
      }
      await handleSubscription(data)
      handleSetLoading(false)
    } else {
      next()
      handleSetLoading(false)
    }
  }

  return (
    <form className="flex flex-col w-full min-h-[480px]" onSubmit={submitSubscription}>
      <div className="pt-2 mb-3 text-center">
        <span className="font-bold text-[16px]">
          Subscribe using{' '}
          <span className="dark:text-[#635BFF]  text-[#625af5]">Stripe</span>{' '}
        </span>
      </div>
      <div className="flex flex-col justify-center px-4 space-y-3 size-full">
        <div
          className={cn(
            'border-gradient w-[340px] md:w-full md:h-[135px] z-0 dark:[&>_div]:hover:bg-tertiary',
            {
              'selected': selectedPlan === 'free'
            }
          )}
          id="free-plan"
        >
          <div className={cn(
            'transition-all size-[calc(100%_-_10px)] absolute top-[5px] left-[5px] rounded-[11px] bg-transparent',
            {
              'bg-tertiary ': selectedPlan === 'free'
            }
          )} />
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
            <div className="flex justify-between items-center inner-content dark:bg-[url(/free_plan_bg.png)] bg-[url(/free_plan_bg_light.png)] my-auto p-5">
              <div className="flex flex-col h-full space-y-2">
                {/* // ! @sheriffjimoh -- This must be dynamic. To read user current plan and tag it as "PURCHASED" */}
                <span className="absolute top-0 leading-7 font-black text-[13px] text-tertiary ">
                  PURCHASED
                </span>
                <div className="mt-auto space-y-1">
                  <p>
                    With the <strong>Free</strong> plan you obtain:
                  </p>
                  <ul className="pl-5 list-disc">
                    <li>Browse any thread and category.</li>
                    <li>Chat with the Masterbots.</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <span
                  className={cn(
                    'h-3.5 w-3.5 rounded-full border-[3px] border-border/80',
                    selectedPlan === 'free' ? 'bg-tertiary ' : 'bg-mirage'
                  )}
                />
                <h3 className="dark:text-white  text-black text-[36px] font-bold">
                  Free
                </h3>
              </div>
            </div>
          </label>
        </div>
        <div className="flex flex-col space-y-3 md:space-x-3 md:flex-row md:space-y-0">
          {plans && plans.length && (
            plans?.filter(plan => plan.active).sort((a, b) => a.created - b.created).map(plan => (
              <PlanCard
                key={plan.id}
                selectedPlan={selectedPlan}
                handlePlanChange={handlePlanChange}
                plan={plan}
              />
            ))
          )}
          {(loadingPlans && !plans) && (
            <>
              <div className="w-full h-[274px] bg-muted-foreground/20 rounded-2xl animate-pulse" />
              <div className="w-full h-[274px] bg-muted-foreground/20 rounded-2xl animate-pulse" />
            </>
          )}
          {(!plans && !loadingPlans) || (plans && !plans.length && !loadingPlans) && (
            <div>No plans available</div>
          )}
        </div>
        <div >
          <a
            href="#referral"
            className="text-[16px] flex items-center space-x-2 mb-5"
          >
            <span>
              I have a&nbsp;<strong> Referral Code</strong>{' '}
            </span>
            <IconArrowRightNoFill className="w-5 h-5 mt-2" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center p-5 space-x-4 bg-white border-t dark:bg-black border-t-black">
        <button
          type="button"
          onClick={handleCloseWizard}
          className="font-bold text-center text-black dark:text-white"
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