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
 * - isPurchased: Indicates whether the plan is purchased (default: false)
 */
import type { PlanCardProps } from '@/types/types'

export default function PlanCard({
	selectedPlan,
	handlePlanChange,
	plan,
	isPurchased = false,
}: PlanCardProps) {
	const duration = plan.unit_amount === 0 ? 'free' : plan.recurring.interval
	const price = (plan.unit_amount ? plan.unit_amount / 100 : 0).toFixed(2)

	const bg_free = 'bg-[url(/background-gradient-free.webp)] dark:bg-[url(/background-gradient-free.webp)]'
	const bg_pro_montly = 'bg-[url(/background-gradient-pro-month.webp)] dark:bg-[url(/background-gradient-pro-month.webp)]'
	const bg_pro_annual = 'bg-[url(/background-gradient-pro-year.webp)] dark:bg-[url(/background-gradient-pro-year.webp)]'

	// Determine background classes based on plan type
	const getBackgroundClasses = () => {
		if (duration === 'free') {
			return `${bg_free}`
		}
		// For pro plans (monthly or yearly)
		if (duration === 'month') {
			return `${bg_pro_montly}`
		}
		if (duration === 'year') {
			return `${bg_pro_annual}`
		}
		// Fallback for any other duration
		return `${bg_pro_montly}`
	}

	return (
		<div
			className={cn(
				'border-gradient md:w-full w-[340px] h-[275px] [&>_div]:hover:bg-tertiary relative',
				{
					selected: selectedPlan === duration,
					'pro-card': duration !== 'free',
				},
			)}
			id={plan.id}
		>
			<div
				className={cn(
					'transition-all size-[calc(100%_-_10px)] absolute top-[5px] left-[5px] rounded-[11px] bg-transparent z-10',
					{
						'bg-tertiary': selectedPlan === duration,
						'pro-glow': duration !== 'free' && selectedPlan !== duration,
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
				className="flex justify-center items-center w-full h-full"
			>
				<div
					className={`flex relative z-20 flex-col p-5 my-auto h-full inner-content ${getBackgroundClasses()}`}
				>
					{isPurchased && (
						<span className="absolute top-0 pb-4 leading-7 font-black text-[13px] text-tertiary ">
							PURCHASED
						</span>
					)}
					<div className="flex justify-between mb-3 w-full">
						<div>
							<span className="text-muted-foreground font-extrabold text-[16px] capitalize">
								{duration}
							</span>
							<h3
								className={cn(
									'text-[36px] font-bold',
									duration === 'free'
										? 'dark:text-white text-black'
										: 'text-accent',
								)}
							>
								{duration === 'free' ? 'Free' : `$${price}`}
								{duration !== 'free' && (
									<span className="text-[24px]">
										{plan.product.name.toLowerCase().includes('annual')
											? '/yr'
											: '/mo'}
									</span>
								)}{' '}
							</h3>
							{plan.product.name.toLowerCase().includes('annual') &&
								duration !== 'free' && (
									<span className="text-sm text-muted-foreground">
										${(Number(price) / 12).toFixed(2)}/mo
									</span>
								)}
						</div>
						<span
							className={cn(
								'size-3.5 rounded-full border-[3px] border-border/80',
								selectedPlan === duration ? 'bg-tertiary ' : 'bg-mirage',
								duration !== 'free' && 'pro-radio',
							)}
						/>
					</div>
					<div className="overflow-y-auto flex-1 hide-scrollbar">
						<div className="pr-2 space-y-3 text-black dark:text-white">
							{plan.product.description && (
								<div className="mb-2">
									<p className="text-sm leading-relaxed text-muted-foreground max-h-[4.5rem] overflow-hidden">
										{plan.product.description
											?.split(/\*\*(.*?)\*\*/g)
											.map((text, index) =>
												index % 2 === 0 ? (
													text
												) : (
													<strong key={text} className="text-foreground">
														{text}
													</strong>
												),
											)
											.filter(Boolean)}
									</p>
								</div>
							)}
							<div className="space-y-2">
								<h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
									Features
								</h4>
								<ul className="space-y-2">
									{plan.product.marketing_features.map((feature) => (
										<li
											key={`feature-${feature.name}`}
											className="flex gap-2 items-start text-sm leading-relaxed"
										>
											<span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
											<span className="flex-1">
												{feature.name
													?.split(/\*\*(.*?)\*\*/g)
													.map((text, index) =>
														index % 2 === 0 ? (
															text
														) : (
															<strong
																key={text}
																className="font-semibold text-foreground"
															>
																{text}
															</strong>
														),
													)
													.filter(Boolean)}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</label>
		</div>
	)
}
