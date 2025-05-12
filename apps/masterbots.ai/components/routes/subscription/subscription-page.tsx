'use client'

import Subscription from '@/components/routes/subscription/subscription'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function SubscriptionPageComponent() {
	const [openSubscriptionSteps, setOpenSubscriptionSteps] = useState(false)

	const handleOpenSubscriptionSteps = () => {
		setOpenSubscriptionSteps(!openSubscriptionSteps)

		// if (!true) {
		//   window.location.href = "/u/[userSlug]/s/checkout";
		// }
	}

	return (
		<div className="max-w-screen-xl pb-10 mx-auto w-full">
			<div className="flex flex-col items-center justify-center w-full gap-5 pt-10">
				<h1 className="text-2xl font-bold">Subscriptions</h1>
				<p className="text-sm text-muted-foreground">
					Manage your subscriptions and payment methods here.
				</p>
			</div>

			{/* Add your subscription management components here */}
			<div className="flex flex-col items-center justify-center w-full gap-5 pt-10">
				{/* Example subscription management component */}
				{/* <SubscriptionManagementComponent /> */}
				<p className="text-sm text-muted-foreground">No subscriptions found.</p>

				<Button
					className="w-full max-w-xs"
					onClick={handleOpenSubscriptionSteps}
				>
					Create Subscription
				</Button>

				{openSubscriptionSteps && <Subscription />}
			</div>
		</div>
	)
}
