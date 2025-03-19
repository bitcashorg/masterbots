'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
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
		border: 'data-[state=checked]:border-yellow-400/50',
		background: 'data-[state=checked]:bg-yellow-400/25',
		iconBg: 'bg-yellow-400',
		iconText: 'text-yellow-50',
	},
	green: {
		border: 'data-[state=checked]:border-green-400/50',
		background: 'data-[state=checked]:bg-green-400/25',
		iconBg: 'bg-green-400',
		iconText: 'text-green-50',
	},
	cyan: {
		border: 'data-[state=checked]:border-cyan-400/50',
		background: 'data-[state=checked]:bg-cyan-400/25',
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

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div>
					<Checkbox
						custom
						name={id}
						id={id}
						value={isActive ? 'checked' : 'unchecked'}
						onClick={() => onChange(!isActive)}
						className={cn(
							'transition-all delay-100 size-auto inline-flex items-center gap-1.5 border-muted p-1 rounded-full overflow-hidden',
							isActive
								? `${colorClasses.border} ${colorClasses.background}`
								: '',
						)}
						checkboxconfig={{
							check: (
								<>
									<div
										className={`${colorClasses.iconBg} rounded-full -m-[4px] mr-1 p-0.5`}
									>
										{React.cloneElement(activeIcon as React.ReactElement<any>, {
											className: `size-6 ${colorClasses.iconText}`,
										})}
									</div>
									<Label
										htmlFor={id}
										className="mr-1.5 text-xs leading-none text-nowrap"
									>
										{name}
									</Label>
								</>
							),
							uncheck: (
								<>
									{React.cloneElement(icon as React.ReactElement<any>, {
										className: 'opacity-65 size-6',
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
