'use client'

import {
	fetchPayment,
	getUserCurrentSubscription,
} from '@/app/actions/subscriptions.actions'
import Subscription from '@/components/routes/subscription/subscription'
import { Button } from '@/components/ui/button'
import { IconArrowRight, IconCreditCard, IconHelp } from '@/components/ui/icons'
import { usePayment } from '@/lib/hooks/use-payment'
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
	const { card, plan, paymentIntent } = usePayment()

	// Fetch current user subscription
	const { value: currentSubscription } = useAsync(async () => {
		if (session?.user?.email) {
			return await getUserCurrentSubscription(session.user.email)
		}
		return null
	}, [session?.user?.email])

	// Fetch subscription data from payment intent (for recent transactions)
	const { value: subscriptionData } = useAsync(async () => {
		if (paymentIntent) {
			return await fetchPayment(paymentIntent)
		}
		return null
	}, [paymentIntent])

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
				className="flex flex-col gap-8 justify-center items-center pt-10 w-full"
			>
				{/* Active Subscription Section */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col gap-4 items-center p-8 w-full max-w-2xl rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
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
						className="flex flex-col gap-4 items-center p-8 w-full max-w-2xl rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
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
					className="flex flex-col gap-4 items-center p-8 w-full max-w-2xl rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Payment Method
					</h2>
					{card || subscriptionData?.card?.last4 ? (
						<div className="flex items-center p-4 space-x-3 w-full rounded-lg border backdrop-blur-sm bg-muted/50">
							<IconCreditCard className="fill-primary" />
							<span className="text-foreground">
								Card ending with{' '}
								<strong>
									****{card?.last4 || subscriptionData?.card?.last4}
								</strong>
							</span>
							<Button
								variant="outline"
								className="ml-auto transition-colors border-primary/20 hover:bg-primary/10"
								onClick={handleOpenSubscriptionSteps}
							>
								Update Payment Method
							</Button>
						</div>
					) : (
						<div className="space-y-4 w-full text-center">
							<p className="text-sm text-muted-foreground">
								No payment method on file
							</p>
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
					className="flex flex-col gap-4 items-center p-8 w-full max-w-2xl rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Transaction History
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
										Due on{' '}
										{new Date(
											currentSubscription.current_period_end * 1000,
										).toLocaleDateString()}
									</p>
								</div>
								<Link
									href={`/u/${session?.user.slug}/s/subs`}
									className="flex items-center space-x-2 transition-colors text-primary hover:text-primary/80"
								>
									<span>View Details</span>
									<IconArrowRight className="w-4 h-4" />
								</Link>
							</motion.div>
						) : (
							<p className="text-sm text-center text-muted-foreground">
								No transaction history available
							</p>
						)}
					</div>
				</motion.div>

				<Subscription isOpen={openSubscriptionSteps} />
			</motion.div>
		</div>
	)
}
