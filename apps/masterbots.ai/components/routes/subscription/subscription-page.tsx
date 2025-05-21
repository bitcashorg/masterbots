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
		<div className="w-full max-w-screen-xl pb-10 mx-auto">
			<div className="flex flex-col items-center justify-center w-full gap-5 pt-10">
				<h1 className="text-2xl font-bold">Subscriptions</h1>
				<p className="text-sm text-muted-foreground">
					Manage your subscriptions and payment methods here.
				</p>
			</div>

			<div className="flex flex-col items-center justify-center w-full gap-5 pt-10">
				<div className="flex flex-col items-center w-full max-w-md gap-2 p-6 border rounded-lg">
					<h2 className="text-xl font-semibold">Free Plan</h2>
					<p className="text-sm text-center text-muted-foreground">
						You are currently on the Free plan. Upgrade to Pro for more
						features.
					</p>
					<Button
						className="w-full max-w-xs mt-4"
						onClick={handleOpenSubscriptionSteps}
					>
						Upgrade to Pro
					</Button>
				</div>

				{openSubscriptionSteps && <Subscription />}
			</div>
		</div>
	)
}
