import { cn } from '@/lib/utils'
/**
 * PlanCard Component
 *
 * A component that displays a subscription plan card for selection during
 * the checkout process. It provides details about the plan, including
 * pricing, duration, and features.
 *
 * Key Features:
 * - Displays the plan's duration (monthly or yearly) and price
 * - Integrates radio button functionality for selecting a plan
 * - Shows visual feedback for the selected plan
 * - Displays plan description and marketing features
 *
 * Functionality:
 * - Updates the selected plan state when the user selects a different plan
 * - Provides a visually appealing layout with background images based on the plan duration
 *
 * Props:
 * - selectedPlan: The currently selected plan duration (e.g., 'monthly' or 'yearly')
 * - handlePlanChange: Function to handle changes in the selected plan
 * - plan: The plan object containing details such as price, description, and features
 */
import type { PlanCardProps } from '@/types/types'

export default function PlanCard({
	selectedPlan,
	handlePlanChange,
	plan,
}: PlanCardProps) {
	const duration = plan.unit_amount === 0 ? 'free' : plan.recurring.interval
	const price = (plan.unit_amount ? plan.unit_amount / 100 : 0).toFixed(2)

	const bg_dark =
		duration === 'year'
			? 'dark:bg-[url(/paid_plan_bg_yearly.png)]'
			: 'dark:bg-[url(/paid_plan_bg.png)]'
	const bg_light =
		duration === 'year'
			? 'bg-[url(/paid_plan_bg_light_yearly.png)]'
			: 'bg-[url(/paid_plan_bg_light.png)]'

	return (
		<div
			className={cn(
				'border-gradient md:w-full w-[340px] h-[275px] dark:[&>_div]:hover:bg-tertiary ',
				{
					selected: selectedPlan === duration,
				},
			)}
			id={plan.id}
		>
			<div
				className={cn(
					'transition-all size-[calc(100%_-_10px)] absolute top-[5px] left-[5px] rounded-[11px] bg-transparent',
					{
						'bg-tertiary': selectedPlan === duration,
					},
				)}
			/>
			<input
				type="radio"
				name="plan"
				id={duration}
				value={duration}
				onChange={handlePlanChange}
				checked={selectedPlan === duration}
				className="hidden"
				required
			/>
			<label
				htmlFor={duration}
				className="flex items-center justify-center w-full h-full"
			>
				<div
					className={`flex flex-col  inner-content ${bg_dark} ${bg_light} my-auto p-5`}
				>
					<div className="flex justify-between w-full">
						<div>
							<span className="text-muted-foreground font-extrabold text-[16px] capitalize">
								{duration}
							</span>
							<h3 className="dark:text-white  text-black text-[36px] font-bold">
								$
								{plan.product.name.toLowerCase().includes('year')
									? Number(price) / 12
									: price}
								<span className="text-[24px]">/mo</span>{' '}
							</h3>
						</div>
						<span
							className={cn(
								'h-3.5 w-3.5 rounded-full border-[3px] border-border/80',
								selectedPlan === duration ? 'bg-tertiary ' : 'bg-mirage',
							)}
						/>
					</div>
					<div className="space-y-1 text-black dark:text-white">
						<p>
							{plan.product.description
								?.split(/\*\*(.*?)\*\*/g)
								.map((text, index) =>
									index % 2 === 0 ? text : <strong key={text}>{text}</strong>,
								)
								.filter(Boolean)}
						</p>
						<ul className="pl-5 list-disc">
							{plan.product.marketing_features.map((feature, index) => (
								<li key={`feature-${feature.name}`}>
									{/* // Grab content that it is between ** ** and make it bold */}
									{feature.name
										?.split(/\*\*(.*?)\*\*/g)
										.map((text, index) =>
											index % 2 === 0 ? (
												text
											) : (
												<strong key={text}>{text}</strong>
											),
										)
										.filter(Boolean)}
								</li>
							))}
						</ul>
						{/* <p>{ plan.product.description}</p> */}

						{/* <ul className="pl-5 list-disc">
                { plan.features.map((feature, index) => (
                    <li key={`feature-${index}`}>{ feature }</li>
                ))}
                </ul> */}
					</div>
				</div>
			</label>
		</div>
	)
}
