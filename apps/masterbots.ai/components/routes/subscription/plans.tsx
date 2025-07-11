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
import { Switch } from '@/components/ui/switch'
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
	const [isYearly, setIsYearly] = useState(false)
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

	// Get the current paid plan based on the switch state
	const getCurrentPaidPlan = () => {
		if (!plans) return null
		const paidPlans = plans.filter(
			(plan) => plan.active && plan.unit_amount !== 0,
		)
		const targetInterval = isYearly ? 'year' : 'month'
		return paidPlans.find((plan) => plan.recurring.interval === targetInterval)
	}

	const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedPlan(e.target.value)
	}

	const handleSwitchChange = (checked: boolean) => {
		setIsYearly(checked)
		const targetInterval = checked ? 'year' : 'month'
		setSelectedPlan(targetInterval)
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

		if (selectedPlan === 'free') {
			alert('Please select a paid plan to use this feature')
			handleSetLoading(false)
			return
		}

		const paymentPlan = getCurrentPaidPlan()
		if (!paymentPlan) {
			handleSetError('No plan available')
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
				{/* Free Plan Card */}
				{plans?.find((plan) => plan.unit_amount === 0) &&
					(() => {
						// biome-ignore lint/style/noNonNullAssertion: <explanation>
						const freePlan = plans.find((plan) => plan.unit_amount === 0)!
						return (
							<PlanCard
								key={freePlan.id}
								selectedPlan={selectedPlan}
								handlePlanChange={handlePlanChange}
								plan={freePlan}
								isPurchased={isPlanPurchased('free')}
							/>
						)
					})()}
				{/* Paid Plan Section with Switch */}
				{plans &&
					plans.filter((plan) => plan.active && plan.unit_amount !== 0).length >
						0 && (
						<div className="space-y-4">
							{/* Switch Toggle */}
							<div className="flex justify-center items-center p-4 space-x-4 rounded-lg bg-muted/20">
								<span
									className={cn(
										'text-sm font-medium transition-colors',
										!isYearly ? 'text-accent' : 'text-muted-foreground',
									)}
								>
									Monthly
								</span>
								<Switch
									checked={isYearly}
									onCheckedChange={handleSwitchChange}
									className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/50 data-[state=checked]:hover:bg-primary/90 data-[state=unchecked]:hover:bg-primary/90 transition-colors"
								/>
								<span
									className={cn(
										'text-sm font-medium transition-colors',
										isYearly ? 'text-accent' : 'text-black dark:text-white',
									)}
								>
									Annually
									<span className="ml-1 text-xs text-accent">(Save 20%)</span>
								</span>
							</div>

							{/* Paid Plan Card */}
							{(() => {
								const currentPaidPlan = getCurrentPaidPlan()
								if (!currentPaidPlan || !currentPaidPlan.recurring) return null
								const { interval } = currentPaidPlan.recurring as {
									interval: string
								}
								return (
									<PlanCard
										key={currentPaidPlan.id}
										selectedPlan={selectedPlan}
										handlePlanChange={handlePlanChange}
										plan={currentPaidPlan}
										isPurchased={isPlanPurchased(interval)}
									/>
								)
							})()}
						</div>
					)}

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
