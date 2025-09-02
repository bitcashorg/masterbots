import {
	calculatePasswordStrength,
	getPasswordStrengthColor,
	getPasswordStrengthLabel,
} from '@/lib/password'
import { Tooltip, TooltipContent, TooltipTrigger } from '@masterbots/mb-ui'
import { InfoIcon } from 'lucide-react'

interface PasswordStrengthMeterProps {
	password: string
}

export function PasswordStrengthMeter({
	password,
}: PasswordStrengthMeterProps) {
	const strength = calculatePasswordStrength(password)
	const color = getPasswordStrengthColor(strength)
	const label = getPasswordStrengthLabel(strength)

	return (
		<div className="mt-2">
			<div className="w-full h-2 bg-gray-300 rounded-full">
				<div
					role="progressbar"
					aria-valuenow={strength}
					aria-valuemin={0}
					aria-valuemax={6}
					tabIndex={0}
					className="h-full transition-all duration-300 ease-in-out rounded-full"
					style={{
						width: `${(strength / 6) * 100}%`,
						backgroundColor: color,
					}}
				/>
			</div>
			<p
				role="presentation"
				className="flex gap-1.5 mt-1 text-sm text-neutral-400"
			>
				Password Strength:{' '}
				<span className="font-medium flex">
					{label}
					<Tooltip>
						<TooltipTrigger className="ml-1 mb-auto" asChild>
							<InfoIcon className="size-3 text-link" />
						</TooltipTrigger>
						<TooltipContent className="whitespace-pre-line">
							{'Password Minimum Length:\n8 characters'}
						</TooltipContent>
					</Tooltip>
				</span>
			</p>
		</div>
	)
}
