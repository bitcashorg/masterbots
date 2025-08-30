'use client'

import {
	fetchPayment,
	getUserCurrentSubscription,
} from '@/app/actions/subscriptions.actions'
import Subscription from '@/components/routes/subscription/subscription'
import { IconArrowRight, IconCreditCard, IconHelp } from '@/components/ui/icons'
import { usePayment } from '@/lib/hooks/use-payment'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@masterbots/mb-ui'
import { Button } from '@masterbots/mb-ui'
import { type MotionProps, MotionStyle, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useAsync } from 'react-use'

const containerVariants: MotionProps['variants'] = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants: MotionProps['variants'] = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
		},
	},
}

export function SubscriptionPageComponent() {
	const [openSubscriptionSteps, setOpenSubscriptionSteps] = useState(false)
	const { data: session, status } = useSession()
	const {
		card,
		paymentIntent,
		fetchInvoices,
		resumeSubscription,
		fetchUpcomingInvoice,
	} = usePayment()

	// Fetch current user subscription
	const { value: currentSubscription } = useAsync(async () => {
		if (session?.user?.email) {
			return await getUserCurrentSubscription(session.user.email)
		}
		return null
	}, [session?.user?.email])

	// Fetch subscription data from payment intent (for recent transactions)
	const { value: subscriptionData } = useAsync(async () => {
		const intentId =
			typeof paymentIntent === 'string' ? paymentIntent : paymentIntent?.id
		if (intentId) {
			return await fetchPayment(intentId)
		}
		return null
	}, [paymentIntent])

	// Narrow returned card details for UI (brand/expiry may be present)
	const pmCard = subscriptionData?.card as unknown as {
		brand?: string
		exp_month?: number
		exp_year?: number
		last4?: string
	}

	// Fetch invoices for the current user
	const { value: invoicesResponse, loading: loadingInvoices } =
		useAsync(async () => {
			if (session?.user?.email) {
				return await fetchInvoices(session.user.email)
			}
			return null
		}, [session?.user?.email])
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const invoices: any[] = invoicesResponse?.invoices || []

	// Upcoming invoice
	const { value: upcoming } = useAsync(async () => {
		if (session?.user?.email) {
			return await fetchUpcomingInvoice(session.user.email)
		}
		return null
	}, [session?.user?.email])

	const handleOpenSubscriptionSteps = () => {
		setOpenSubscriptionSteps(!openSubscriptionSteps)
	}

	const proBenefits = [
		{
			title: 'Advanced AI Capabilities',
			description:
				'Generate stunning images, search the web in real-time, create and edit documents, and access cutting-edge AI tools that streamline your workflow and boost productivity',
		},
		{
			title: 'Latest AI Models First',
			description:
				"Get instant access to the most advanced AI models including GPT-4.1, Claude, Gemini, and emerging models as soon as they're released - all with priority access",
		},
		{
			title: 'One Subscription, Unlimited AI',
			description:
				'Replace multiple AI subscriptions with one powerful platform. Save hundreds monthly while accessing ChatGPT advanced models, Claude Pro, Gemini advanced, and more - all in one place',
		},
	]

	return (
		<div className="pb-10 mx-auto w-full max-w-screen-xl">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col gap-5 justify-center items-center pt-10 w-full"
			>
				<h1 className="text-3xl font-bold text-primary">Subscriptions</h1>
				<p className="text-sm text-muted-foreground">
					Manage your subscriptions and payment methods here.
				</p>
			</motion.div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 gap-8 pt-10 w-full md:grid-cols-2"
			>
				{/* Active Subscription Section */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col gap-4 p-8 w-full rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Current Plan
					</h2>
					{currentSubscription ? (
						<div className="space-y-4 w-full">
							<div className="flex justify-between items-center">
								<div className="space-y-1">
									<h3 className="text-xl font-medium text-foreground">
										{currentSubscription.plan?.product?.name || 'Pro Plan'}
									</h3>
									<p className="text-sm text-muted-foreground">
										$
										{currentSubscription.plan?.amount
											? (currentSubscription.plan.amount / 100).toFixed(2)
											: '0.00'}
										/{currentSubscription.plan?.interval || 'month'}
									</p>
									<p className="text-xs text-muted-foreground">
										Status: {currentSubscription.status}
									</p>
								</div>
								<Button
									className="w-full max-w-xs transition-colors bg-primary hover:bg-primary/90"
									onClick={handleOpenSubscriptionSteps}
								>
									Change Plan
								</Button>
							</div>
						</div>
					) : (
						<div className="space-y-4 w-full text-center">
							<p className="text-sm text-muted-foreground">
								You are currently on the Free plan. Upgrade to Pro for more
								features.
							</p>
							<Button
								className="w-full max-w-xs transition-colors bg-primary hover:bg-primary/90"
								onClick={handleOpenSubscriptionSteps}
							>
								Upgrade to Pro
							</Button>
						</div>
					)}
				</motion.div>

				{/* Pro Plan Benefits - shown for non-subscribed users */}
				{!currentSubscription && (
					<motion.div
						variants={itemVariants}
						className="flex flex-col gap-4 p-8 w-full rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
					>
						<h2 className="text-2xl font-semibold text-foreground">
							Pro Plan Benefits
						</h2>
						<div className="space-y-6 w-full">
							{proBenefits.map((benefit) => (
								<motion.div
									key={benefit.title}
									className="flex items-start space-x-4 group"
									whileHover={{ x: 5 }}
									transition={{ type: 'spring', stiffness: 300 }}
								>
									<div className="mt-2 w-3 h-3 rounded-full bg-primary" />
									<div className="space-y-1">
										<h3 className="text-lg font-medium transition-colors text-foreground group-hover:text-primary">
											{benefit.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{benefit.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}

				{/* Payment Method Section */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col gap-4 p-8 w-full rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Payment Method
					</h2>
					{card || subscriptionData?.card?.last4 ? (
						<div className="flex flex-col gap-4 w-full">
							{/* Stylized credit card */}
							<div className="overflow-hidden relative p-5 text-white bg-gradient-to-tr rounded-xl shadow-lg from-primary/90 via-primary to-primary/70">
								<div className="absolute top-4 right-4 text-xs tracking-widest uppercase opacity-80">
									{pmCard?.brand || 'Card'}
								</div>
								<div className="flex gap-2 items-center text-white/90">
									<IconCreditCard className="size-5 fill-white/90" />
									<span className="text-sm">Masterbots</span>
								</div>
								<div className="mt-6 text-2xl font-semibold tracking-widest">
									**** **** **** {card?.last4 || pmCard?.last4}
								</div>
								<div className="flex justify-between items-center mt-4 text-xs">
									<div className="space-y-1">
										<p className="opacity-80">Cardholder</p>
										<p className="font-medium">
											{session?.user?.name || 'Your Name'}
										</p>
									</div>
									<div className="space-y-1 text-right">
										<p className="opacity-80">Expires</p>
										<p className="font-medium">
											{pmCard?.exp_month || 'MM'}/
											{pmCard?.exp_year?.toString()?.slice(-2) || 'YY'}
										</p>
									</div>
								</div>
							</div>
							{/* Actions */}
							<div className="flex flex-wrap gap-3">
								<Button
									variant="outline"
									className="transition-colors border-primary/20 hover:bg-primary/10"
									onClick={handleOpenSubscriptionSteps}
								>
									Change Card
								</Button>
								<Button
									className="transition-colors bg-primary hover:bg-primary/90"
									onClick={handleOpenSubscriptionSteps}
								>
									Add New Payment Method
								</Button>
							</div>
						</div>
					) : (
						<div className="space-y-4 w-full">
							{/* Placeholder stylized card */}
							<div className="overflow-hidden relative p-5 bg-gradient-to-tr rounded-xl border from-muted via-muted/80 to-muted/60 text-foreground/80">
								<div className="text-sm">No payment method on file</div>
								<div className="mt-6 text-2xl font-semibold tracking-widest opacity-60">
									**** **** **** ----
								</div>
							</div>
							<Button
								className="w-full max-w-xs transition-colors bg-primary hover:bg-primary/90"
								onClick={handleOpenSubscriptionSteps}
							>
								Add Payment Method
							</Button>
						</div>
					)}
				</motion.div>

				{/* Transaction History */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col gap-4 p-8 w-full rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Invoice Information
					</h2>
					<div className="space-y-4 w-full">
						{currentSubscription ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}
								className="flex justify-between items-center p-4 rounded-lg border backdrop-blur-sm bg-muted/50"
							>
								<div className="space-y-1">
									<h3 className="font-medium text-foreground">Next Invoice</h3>
									<p className="text-sm text-muted-foreground">
										{upcoming?.amount_due != null && (
											<>
												Next bill: $
												{(Number(upcoming.amount_due || 0) / 100).toFixed(2)} on{' '}
											</>
										)}
										{new Date(
											(upcoming?.next_payment_attempt ||
												currentSubscription.current_period_end) * 1000,
										).toLocaleDateString()}
									</p>
									{currentSubscription.cancel_at_period_end && (
										<div className="flex justify-between items-center px-3 py-2 mt-2 text-amber-800 bg-amber-50 rounded border dark:bg-amber-900/20 dark:text-amber-200">
											<span className="text-xs">
												Your subscription will cancel at period end on{' '}
												{new Date(
													currentSubscription.current_period_end * 1000,
												).toLocaleDateString()}
											</span>
											<Button
												size="sm"
												variant="outline"
												className="ml-3"
												onClick={async () => {
													if (session?.user?.email) {
														await resumeSubscription(session.user.email)
													}
												}}
											>
												Resume
											</Button>
										</div>
									)}
									{!currentSubscription.cancel_at_period_end && (
										<div className="mt-3">
											<UnsubscribeDialog
												endEpoch={currentSubscription.current_period_end}
											/>
										</div>
									)}
								</div>
							</motion.div>
						) : (
							<p className="text-sm text-center text-muted-foreground">
								No transaction history available
							</p>
						)}
					</div>
				</motion.div>

				{/* Invoices Section */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col gap-4 p-8 w-full rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">Invoices</h2>
					<div className="space-y-4 w-full">
						{loadingInvoices ? (
							<div className="w-full h-32 rounded-lg animate-pulse bg-muted/30" />
						) : invoices.length ? (
							<div className="rounded-lg border divide-y bg-muted/30">
								{invoices.map((inv) => (
									<div
										key={inv.id}
										className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between"
									>
										<div className="space-y-1">
											<p className="text-sm text-muted-foreground">
												Invoice #{inv.number || inv.id}
											</p>
											<p className="text-xs text-muted-foreground">
												{inv.created
													? new Date(inv.created * 1000).toLocaleDateString()
													: ''}
											</p>
										</div>
										<div className="flex gap-4 items-center">
											<span className="text-sm text-foreground">
												$
												{(
													((inv.amount_paid || inv.amount_due || 0) as number) /
													100
												).toFixed(2)}
											</span>
											<span className="px-2 py-1 text-xs capitalize rounded border bg-background">
												{inv.status}
											</span>
											{inv.hosted_invoice_url && (
												<Link
													href={inv.hosted_invoice_url as string}
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-primary hover:underline"
												>
													View
												</Link>
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-sm text-center text-muted-foreground">
								No invoices found
							</p>
						)}
					</div>
				</motion.div>
			</motion.div>
			<Subscription isOpen={openSubscriptionSteps} />
		</div>
	)
}

function UnsubscribeDialog({ endEpoch }: { endEpoch?: number }) {
	const { data: session } = useSession()
	const { cancelSubscription } = usePayment()
	const [loading, setLoading] = useState(false)
	const endDate = endEpoch ? new Date(endEpoch * 1000) : null
	const daysRemaining = endEpoch
		? Math.max(
				0,
				Math.ceil((endEpoch * 1000 - Date.now()) / (1000 * 60 * 60 * 24)),
			)
		: null

	const onConfirm = async () => {
		try {
			setLoading(true)
			if (session?.user?.email) {
				await cancelSubscription(session.user.email, true)
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="outline"
					className="border-destructive/30 text-destructive hover:bg-destructive/10"
				>
					Unsubscribe
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to unsubscribe?
					</AlertDialogTitle>
					<AlertDialogDescription>
						You will lose access to:
						<ul className="mt-3 space-y-1 list-disc list-inside text-foreground">
							<li>Advanced AI models and features</li>
							<li>Priority access to new model releases</li>
							<li>Unlimited AI across tools in one subscription</li>
						</ul>
						Your plan will remain active until the end of the current billing
						period
						{endDate ? (
							<>
								: <strong>{endDate.toLocaleDateString()}</strong>
								{typeof daysRemaining === 'number' && (
									<>
										{' '}
										({daysRemaining} day{daysRemaining === 1 ? '' : 's'}{' '}
										remaining)
									</>
								)}
								.
							</>
						) : (
							'.'
						)}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Keep Plan</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						disabled={loading}
						className="text-white bg-destructive hover:bg-destructive/90"
					>
						{loading ? 'Processing...' : 'Confirm Unsubscribe'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
