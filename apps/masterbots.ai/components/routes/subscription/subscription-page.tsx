'use client'

import { fetchPayment } from '@/app/actions/subscriptions'
import Subscription from '@/components/routes/subscription/subscription'
import { Button } from '@/components/ui/button'
import { IconArrowRight, IconCreditCard, IconHelp } from '@/components/ui/icons'
import { usePayment } from '@/lib/hooks/use-payment'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useAsync } from 'react-use'

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
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
	const { data: session } = useSession()
	const { card, plan, paymentIntent } = usePayment()

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
			title: 'Professional Tools',
			description:
				'Access to professional tools as image generation, web search, working documents',
		},
		{
			title: 'Premium Models',
			description:
				'Access to all the premium models that are disponible out there, plus all the ones that we include in the future',
		},
		{
			title: 'All-in-One Platform',
			description:
				'Have all the AI models in one place, not extra payments in different platforms, just one subscription that unleash all the power of AI',
		},
	]

	return (
		<div className="w-full max-w-screen-xl pb-10 mx-auto">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center justify-center w-full gap-5 pt-10"
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
				className="flex flex-col items-center justify-center w-full gap-8 pt-10"
			>
				{/* Active Subscription Section */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center w-full max-w-2xl gap-4 p-8 transition-shadow duration-300 border shadow-sm rounded-xl hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Current Plan
					</h2>
					{plan ? (
						<div className="w-full space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<h3 className="text-xl font-medium text-foreground">
										{plan.product.name}
									</h3>
									<p className="text-sm text-muted-foreground">
										$
										{plan.unit_amount
											? (plan.unit_amount / 100).toFixed(2)
											: '0.00'}
										/{plan.recurring.interval}
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
						<div className="w-full space-y-4 text-center">
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

				{/* Payment Method Section */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center w-full max-w-2xl gap-4 p-8 transition-shadow duration-300 border shadow-sm rounded-xl hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Payment Method
					</h2>
					{card ? (
						<div className="flex items-center w-full p-4 space-x-3 border rounded-lg bg-muted/50 backdrop-blur-sm">
							<IconCreditCard className="fill-primary" />
							<span className="text-foreground">
								Card ending with <strong>****{card.last4}</strong>
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
						<div className="w-full space-y-4 text-center">
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

				{/* Pro Plan Benefits */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center w-full max-w-2xl gap-4 p-8 transition-shadow duration-300 border shadow-sm rounded-xl hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Pro Plan Benefits
					</h2>
					<div className="w-full space-y-6">
						{proBenefits.map((benefit, index) => (
							<motion.div
								key={index}
								className="flex items-start space-x-4 group"
								whileHover={{ x: 5 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								<div className="w-3 h-3 mt-2 rounded-full bg-primary" />
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

				{/* Transaction History */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center w-full max-w-2xl gap-4 p-8 transition-shadow duration-300 border shadow-sm rounded-xl hover:shadow-md bg-card"
				>
					<h2 className="text-2xl font-semibold text-foreground">
						Transaction History
					</h2>
					<div className="w-full space-y-4">
						{subscriptionData?.subscription ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}
								className="flex items-center justify-between p-4 border rounded-lg bg-muted/50 backdrop-blur-sm"
							>
								<div className="space-y-1">
									<h3 className="font-medium text-foreground">Next Invoice</h3>
									<p className="text-sm text-muted-foreground">
										Due on{' '}
										{new Date(
											subscriptionData.subscription.current_period_end * 1000,
										).toLocaleDateString()}
									</p>
								</div>
								<Link
									href={`/u/${session?.user.slug}/s/subs/${paymentIntent}`}
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

				{openSubscriptionSteps && <Subscription />}
			</motion.div>
		</div>
	)
}
