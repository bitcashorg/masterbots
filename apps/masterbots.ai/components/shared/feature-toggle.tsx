'use client'

import { Checkbox } from '@/components/ui/checkbox'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import React from 'react'

export interface FeatureToggleProps {
	id: string
	name: string
	icon: React.ReactNode
	activeIcon: React.ReactNode
	isActive: boolean
	onChange: (value: boolean) => void
	activeColor: 'yellow' | 'green' | 'cyan'
}

const activeColorClasses: Record<
	FeatureToggleProps['activeColor'],
	{
		border: string
		background: string
		iconBg: string
		iconText: string
	}
> = {
	yellow: {
		border: 'data-[state=checked]:border-yellow-400',
		background: 'data-[state=checked]:bg-yellow-400/50',
		iconBg: 'bg-yellow-400',
		iconText: 'text-yellow-50',
	},
	green: {
		border: 'data-[state=checked]:border-green-400',
		background: 'data-[state=checked]:bg-green-400/50',
		iconBg: 'bg-green-400',
		iconText: 'text-green-50',
	},
	cyan: {
		border: 'data-[state=checked]:border-cyan-400',
		background: 'data-[state=checked]:bg-cyan-400/50',
		iconBg: 'bg-cyan-400',
		iconText: 'text-cyan-50',
	},
}

export function FeatureToggle({
	id,
	name,
	icon,
	activeIcon,
	isActive,
	onChange,
	activeColor,
}: FeatureToggleProps) {
	const colorClasses = activeColorClasses[activeColor]
	const tooltipMessage = `${name}`

	const processingRef = React.useRef(false)

	const handleToggle = React.useCallback(() => {
		if (processingRef.current) return

		processingRef.current = true
		console.log(`FeatureToggle (${name}): moving to ${isActive} a ${!isActive}`)

		try {
			onChange(!isActive)
		} finally {
			setTimeout(() => {
				processingRef.current = false
			}, 300)
		}
	}, [isActive, onChange, name])

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div>
					<Checkbox
						custom
						name={id}
						id={id}
						checked={isActive}
						onClick={handleToggle}
						className={cn(
							'inline-flex items-center p-1 overflow-hidden transition-all delay-100 rounded-full size-auto',
							isActive && colorClasses.border,
							isActive && colorClasses.background,
						)}
						checkboxconfig={{
							check: (
								<div className="rounded-full">
									{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
									{React.cloneElement(activeIcon as React.ReactElement<any>, {
										className: cn(
											'size-6',
											isActive ? 'text-black dark:text-white' : 'opacity-65',
										),
									})}
									<span className="sr-only">{name} enabled</span>
								</div>
							),
							uncheck: (
								<>
									{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
									{React.cloneElement(icon as React.ReactElement<any>, {
										className: 'opacity-65 size-6 text-black dark:text-white',
									})}
									<span className="sr-only">{name} disabled</span>
								</>
							),
						}}
					/>
				</div>
			</TooltipTrigger>
			<TooltipContent side="top">{tooltipMessage}</TooltipContent>
		</Tooltip>
	)
}
