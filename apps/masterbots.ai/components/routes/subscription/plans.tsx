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

import {
	getSubscriptionPlans,
	getUserCurrentSubscription,
} from '@/app/actions/subscriptions.actions'
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
		promo,
		handleSetPromo,
		handleValidatePromoCode,
		handleApplyPromoCode,
	} = usePayment()
	const { data: session } = useSession()
	const { name, email } = (session?.user as Session['user']) || {
		name: '',
		email: '',
	}

	const [selectedPlan, setSelectedPlan] = useState(plan?.duration || 'free')
	const [showPromoInput, setShowPromoInput] = useState(false)
	const [promoValidated, setPromoValidated] = useState(false)
	const [promoValidationError, setPromoValidationError] = useState('')
	const [validatingPromo, setValidatingPromo] = useState(false)
	const router = useRouter()
	const { value: plans, loading: loadingPlans } = useAsync(
		async () =>
			await getSubscriptionPlans({
				handleSetStripePublishKey,
				handleSetStripeSecret,
			}),
	)

	const { value: currentSubscription } = useAsync(async () => {
		if (email) {
			return await getUserCurrentSubscription(email)
		}
		return null
	}, [email])

	// Helper function to determine if a plan is currently purchased
	const isPlanPurchased = (planInterval: string) => {
		if (!currentSubscription) return false

		// Check if the current subscription matches the plan interval
		const subscriptionInterval = currentSubscription.plan?.interval
		return subscriptionInterval === planInterval
	}

	const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedPlan(e.target.value)
	}

	const handleCloseWizard = async () => {
		const del = await handleDeleteCustomer(email)
		if (del) return router.push('/c')
	}

	const handlePromoCodeSubmit = async () => {
		// Prevent any form submission behavior
		setValidatingPromo(true)
		setPromoValidationError('')
		try {
			const { valid, error } = await handleValidatePromoCode(promo.code)

			if (valid) {
				// Code is valid, show details but don't apply yet
				setPromoValidated(true)
			} else {
				setPromoValidationError(error || 'Invalid promotion code')
				setPromoValidated(false)
			}
		} catch (error) {
			setPromoValidationError('Error validating promotion code')
			setPromoValidated(false)
		} finally {
			setValidatingPromo(false)
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
				promotion_code: promo.applied ? promo.codeId : undefined,
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
				promotion_code: promo.applied ? promo.codeId : undefined,
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
					<span className="dark:text-[#635BFF]  text-[#625af5]">
						Stripe
					</span>{' '}
				</span>
			</div>
			<div className="flex flex-col justify-center px-4 space-y-3 size-full">
				{/* Render free plan from Stripe */}
				{plans?.find((plan) => plan.unit_amount === 0) &&
					(() => {
						const freePlan = plans.find((plan) => plan.unit_amount === 0)!
						return (
							<div
								className={cn(
									'border-gradient w-[340px] md:w-full h-[275px] z-0 dark:[&>_div]:hover:bg-tertiary',
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
								<label htmlFor="free" className="block w-full h-full">
									<div className="flex flex-col p-5 inner-content rounded-2xl dark:bg-[url(/free_plan_bg.png)] bg-[url(/free_plan_bg_light.png)] h-full">
										{isPlanPurchased('free') && (
											<span className="absolute top-0 leading-7 font-black text-[13px] text-tertiary ">
												PURCHASED
											</span>
										)}
										{/* Fixed header section */}
										<div className="flex justify-between mb-3 w-full">
											<div>
												<span className="text-muted-foreground font-extrabold text-[16px] capitalize">
													Free
												</span>
												<h3 className="dark:text-white  text-black text-[36px] font-bold">
													Free
												</h3>
											</div>
											<span
												className={cn(
													'size-3.5 rounded-full border-[3px] border-border/80',
													selectedPlan === 'free'
														? 'bg-tertiary '
														: 'bg-mirage',
												)}
											/>
										</div>
										{/* Scrollable content section */}
										<div className="overflow-y-auto flex-1 hide-scrollbar">
											<div className="pr-2 space-y-1 text-black dark:text-white">
												<p>
													With the <strong>Free</strong> plan you obtain:
												</p>
												<ul className="pl-5 list-disc">
													{freePlan.product.marketing_features?.map(
														(feature, index) => (
															<li key={`free-feature-${index}`}>
																{feature.name
																	?.split(/\*\*(.*?)\*\*/g)
																	.map((text, textIndex) =>
																		textIndex % 2 === 0 ? (
																			text
																		) : (
																			<strong key={text}>{text}</strong>
																		),
																	)
																	.filter(Boolean)}
															</li>
														),
													) || (
														<>
															<li>Browse any thread and category.</li>
															<li>Chat with the Masterbots.</li>
														</>
													)}
												</ul>
											</div>
										</div>
									</div>
								</label>
							</div>
						)
					})()}
				<div className="flex flex-col space-y-3 md:space-x-3 md:flex-row md:space-y-0">
					{plans?.length &&
						plans
							?.filter((plan) => plan.active && plan.unit_amount !== 0)
							.sort((a, b) => a.created - b.created)
							.map((plan) => (
								<PlanCard
									key={plan.id}
									selectedPlan={selectedPlan}
									handlePlanChange={handlePlanChange}
									plan={plan}
									isPurchased={isPlanPurchased(plan.recurring.interval)}
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
							<IconArrowRightNoFill className="mt-2 w-5 h-5" />
						</button>
					) : (
						<div className="mb-5">
							<div className="flex items-center space-x-2">
								<input
									type="text"
									value={promo.code}
									onChange={(e) => {
										handleSetPromo({ code: e.target.value.toUpperCase() })
										setPromoValidated(false) // Reset validation when code changes
										setPromoValidationError('') // Clear error when code changes
									}}
									placeholder="Enter promotion code"
									className="px-3 py-2 rounded-lg border dark:bg-black dark:border-gray-700"
									onKeyDown={(e) => {
										// Prevent form submission on Enter key
										if (e.key === 'Enter') {
											e.preventDefault()
											handlePromoCodeSubmit()
										}
									}}
								/>
								<button
									type="button"
									onClick={handlePromoCodeSubmit}
									disabled={validatingPromo}
									className="px-4 py-2 text-white bg-black rounded-lg dark:bg-white dark:text-black disabled:opacity-50"
								>
									{validatingPromo ? 'Validating...' : 'Validate'}
								</button>
								<button
									type="button"
									onClick={() => {
										setShowPromoInput(false)
										setPromoValidated(false)
										setPromoValidationError('')
										handleSetPromo({ code: '' })
									}}
									className="px-4 py-2 text-gray-600 rounded-lg border border-gray-300 dark:text-gray-400 dark:border-gray-600"
								>
									Cancel
								</button>
							</div>
							{/* Show validation error */}
							{promoValidationError && (
								<div className="p-2 mt-2 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
									{promoValidationError}
								</div>
							)}
						</div>
					)}

					{/* Show validation details when code is validated but not applied */}
					{promoValidated && !promo.applied && (
						<div className="p-3 mb-5 text-sm text-blue-600 bg-blue-100 rounded-lg dark:bg-blue-900 dark:text-blue-200">
							<div className="flex justify-between items-center">
								<div>
									<strong>Valid Promotion Code: {promo.code}</strong>
									{promo.trialDays > 0 ? (
										<div className="mt-1">
											This code will give you {promo.trialDays} day
											{promo.trialDays !== 1 ? 's' : ''} free trial.
											{promo.discountInfo && (
												<div className="mt-1">{promo.discountInfo}</div>
											)}
										</div>
									) : (
										<div className="mt-1">
											{promo.discountInfo ||
												'This code will apply a discount to your subscription.'}
										</div>
									)}
								</div>
								<button
									type="button"
									onClick={() => {
										handleApplyPromoCode()
										setPromoValidated(false)
									}}
									className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
								>
									Apply Code
								</button>
							</div>
						</div>
					)}

					{/* Show applied code status */}
					{promo.applied && (
						<div className="p-3 mb-5 text-sm text-green-600 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-200">
							<div className="flex justify-between items-center">
								<div>
									<strong>Applied Promotion Code: {promo.code}</strong>
									{promo.trialDays > 0 ? (
										<div className="mt-1">
											You&apos;ll get {promo.trialDays} day
											{promo.trialDays !== 1 ? 's' : ''} free trial.
											{promo.discountInfo && (
												<div className="mt-1">{promo.discountInfo}</div>
											)}
										</div>
									) : (
										<div className="mt-1">
											{promo.discountInfo ||
												'Discount will be applied to your subscription.'}
										</div>
									)}
								</div>
								<button
									type="button"
									onClick={() => {
										handleSetPromo({
											code: '',
											applied: false,
											codeId: '',
											trialDays: 0,
											discountInfo: '',
										})
									}}
									className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
								>
									Remove
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-center items-center p-5 space-x-4 bg-white border-t dark:bg-black border-t-black">
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
