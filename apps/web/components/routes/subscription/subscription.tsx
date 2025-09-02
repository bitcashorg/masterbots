'use client'

/**
 * Subscription Component
 *
 * A component that manages the subscription process for users, including
 * selecting plans, entering payment information, and confirming the subscription.
 * It utilizes a wizard interface to guide users through the subscription steps.
 *
 * Key Features:
 * - Displays a series of steps for selecting a subscription plan, entering payment information, and confirming the subscription
 * - Integrates error handling and loading states
 * - Checks if the user has an active subscription before proceeding
 * - Provides a dialog wizard for a seamless user experience
 *
 * Functionality:
 * - Fetches the user's subscription status and displays the appropriate steps
 * - Handles user actions for closing the wizard and deleting customer data if necessary
 *
 * Props:
 * - user: An object containing the user's email and name
 */
import { Checkout } from '@/components/routes/subscription/checkout'
import { WrappedPaymentInformation } from '@/components/routes/subscription/payment-information'
import { Plans } from '@/components/routes/subscription/plans'
import { SuccessContent } from '@/components/routes/subscription/succes-content'
import { ErrorContent } from '@masterbots/mb-ui'
import type { WizardStep } from '@masterbots/mb-ui'
import { DialogWizard } from '@masterbots/mb-ui'
import { usePayment } from 'mb-lib'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const steps: WizardStep[] = [
	{ component: Plans, name: 'Plans' },
	{ component: WrappedPaymentInformation, name: 'Payment' },
	{ component: Checkout, name: 'Checkout' },
	{ component: SuccessContent, name: 'Success' },
]

interface SubscriptionProps {
	isOpen?: boolean
}

export default function Subscription({ isOpen = false }: SubscriptionProps) {
	const router = useRouter()
	const { data: session } = useSession()
	const { email } = (session?.user as Session['user']) || {
		email: '',
	}
	const {
		handleDeleteCustomer,
		handleSetLoading,
		handleSetError,
		paymentIntent,
	} = usePayment()

	const handleCloseWizard = async () => {
		if (typeof paymentIntent === 'object' && paymentIntent !== '')
			return router.push('/c/p')
		const del = await handleDeleteCustomer(email)
		handleSetLoading(false)
		handleSetError('')
		if (del) return router.push('/c')
	}

	return (
		<div className="flex justify-center items-center">
			<DialogWizard
				handleCloseWizard={handleCloseWizard}
				dialogOpen={isOpen}
				steps={steps}
				headerTitle="Masterbots Subscription plans"
				errorComponent={<ErrorContent />}
			/>
		</div>
	)
}
