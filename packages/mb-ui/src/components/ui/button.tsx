import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:opacity-90',
				secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
				ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
				destructive:
					'bg-destructive text-destructive-foreground hover:opacity-90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				sm: 'h-8 px-3',
				md: 'h-9 px-4',
				lg: 'h-10 px-6',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)

Button.displayName = 'Button'

export { buttonVariants }
