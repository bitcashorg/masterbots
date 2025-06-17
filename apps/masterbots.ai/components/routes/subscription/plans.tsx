/**
 * Plans Component
 *
 * A component that displays available subscription plans for selection
 * during the checkout process. It allows users to choose a plan and
 * handles the submission of the selected plan for payment processing.
 *
 * Key Features:
 * - Displays a list of subscription plans with details and pricing
 * - Integrates radio button functionality for selecting a plan
 * - Shows a free plan option with its features
 * - Handles loading states while fetching plans
 * - Provides a referral code input link
 *
 * Functionality:
 * - Fetches subscription plans from the server
 * - Updates the selected plan state based on user interaction
 * - Submits the selected plan for payment processing
 * - Allows users to navigate back or close the wizard
 *
 * Props:
 * - next: Function to proceed to the next step in the wizard
 * - goTo: Function to navigate to a specific step in the wizard
 */

import { getSubscriptionPlans } from '@/app/actions/subscriptions.actions'
import PlanCard from '@/components/routes/subscription/plan-card'
import { IconArrowRightNoFill } from '@/components/ui/icons'
import { usePayment } from '@/lib/hooks/use-payment'
import { cn } from '@/lib/utils'
import type { PlansPros } from '@/types/types'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import { useAsync } from 'react-use'

export function Plans({ next, goTo }: PlansPros) {
	const {
		handlePlan,
		handleSetSecret,
		secret,
		plan,
		loading,
		handleSetLoading,
		handleDeleteCustomer,
		handleSetError,
		handleSetStripePublishKey,
		handleSetStripeSecret,
		promoCode,
		promoApplied,
		handleSetPromoCode,
		handleSetPromoApplied,
		handleValidatePromoCode,
		promoCodeId,
	} = usePayment()
	const { data: session } = useSession()
	const { name, email } = (session?.user as Session['user']) || {
		name: '',
		email: '',
	}

	const [selectedPlan, setSelectedPlan] = useState(plan?.duration || 'free')
	const [showPromoInput, setShowPromoInput] = useState(false)
	const router = useRouter()
	const { value: plans, loading: loadingPlans } = useAsync(
		async () =>
			await getSubscriptionPlans({
				handleSetStripePublishKey,
				handleSetStripeSecret,
			}),
	)

	const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedPlan(e.target.value)
	}

	const handleCloseWizard = async () => {
		const del = await handleDeleteCustomer(email)
		if (del) return router.push('/c')
	}

	const handlePromoCodeSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const { valid, error } = await handleValidatePromoCode(promoCode)

		if (valid) {
			handleSetPromoApplied(true)
			setShowPromoInput(false)
		} else {
			handleSetError(error || 'Invalid promotion code')
		}
	}

	const handleSubscription = async (plan: {
		planId: string | undefined
		trialPeriodDays: number
		automatic_payment_methods: { enabled: boolean }
		email: string
		name: string
		promotion_code?: string
	}) => {
		const response = await fetch('/api/payment/intent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...plan,
				promotion_code: promoApplied ? promoCodeId : undefined,
			}),
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
		const paymentPlan = plans?.find((p) => p.recurring.interval === plan)
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
					enabled: true,
				},
				email,
				name: name as string,
				promotion_code: promoApplied ? promoCodeId : undefined,
			}
			await handleSubscription(data)
			handleSetLoading(false)
		} else {
			next()
			handleSetLoading(false)
		}
	}

	return (
		<form
			className="flex flex-col w-full min-h-[480px]"
			onSubmit={submitSubscription}
		>
			<div className="pt-2 mb-3 text-center">
				<span className="font-bold text-[16px]">
					Subscribe using{' '}
					<span className="dark:text-[#635BFF]  text-[#625af5]">Stripe</span>
				</span>
			</div>
			<div className="flex flex-col justify-center px-4 space-y-3 size-full">
				<div
					className={cn(
						'border-gradient w-[340px] md:w-full md:h-[135px] z-0 dark:[&>_div]:hover:bg-tertiary',
						{
							selected: selectedPlan === 'free',
						},
					)}
					id="free-plan"
				>
					<div
						className={cn(
							'transition-all size-[calc(100%_-_10px)] absolute top-[5px] left-[5px] rounded-[11px] bg-transparent',
							{
								'bg-tertiary ': selectedPlan === 'free',
							},
						)}
					/>
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
										'size-3.5 rounded-full border-[3px] border-border/80',
										selectedPlan === 'free' ? 'bg-tertiary ' : 'bg-mirage',
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
					{plans?.length &&
						plans
							?.filter((plan) => plan.active)
							.sort((a, b) => a.created - b.created)
							.map((plan) => (
								<PlanCard
									key={plan.id}
									selectedPlan={selectedPlan}
									handlePlanChange={handlePlanChange}
									plan={plan}
								/>
							))}
					{loadingPlans && !plans && (
						<>
							<div className="w-full h-[274px] bg-muted-foreground/20 rounded-2xl animate-pulse" />
							<div className="w-full h-[274px] bg-muted-foreground/20 rounded-2xl animate-pulse" />
						</>
					)}
					{(!plans && !loadingPlans) ||
						(plans && !plans.length && !loadingPlans && (
							<div>No plans available</div>
						))}
				</div>
				<div>
					{!showPromoInput ? (
						<button
							type="button"
							onClick={() => setShowPromoInput(true)}
							className="text-[16px] flex items-center space-x-2 mb-5"
						>
							<span>
								I have a&nbsp;<strong>Promotion Code</strong>{' '}
							</span>
							<IconArrowRightNoFill className="w-5 h-5 mt-2" />
						</button>
					) : (
						<form onSubmit={handlePromoCodeSubmit} className="mb-5">
							<div className="flex items-center space-x-2">
								<input
									type="text"
									value={promoCode}
									onChange={(e) =>
										handleSetPromoCode(e.target.value.toUpperCase())
									}
									placeholder="Enter promotion code"
									className="px-3 py-2 border rounded-lg dark:bg-black dark:border-gray-700"
								/>
								<button
									type="submit"
									className="px-4 py-2 text-white bg-black rounded-lg dark:bg-white dark:text-black"
								>
									Apply
								</button>
							</div>
						</form>
					)}
					{promoApplied && (
						<div className="p-3 mb-5 text-sm text-green-600 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-200">
							Promotion code applied! You&apos;ll get 7 days free trial.
						</div>
					)}
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
