import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 gap-2.5',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-md hover:bg-primary/80',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline:
					'border border-input hover:bg-muted hover:text-muted-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/70',
				ghost: 'shadow-none hover:bg-muted hover:text-muted-foreground',
				link: 'text-primary underline-offset-4 shadow-none hover:underline',
				icon: 'flex size-8 shrink-0 select-none items-center justify-center border shadow cursor-pointer',
				sideBarProfile: 'bg-transparent border-0 shadow-none justify-start',
				powerUp: 'border border-input',
				deepThinking: 'border border-input',
			},
			size: {
				default: 'h-8 px-4 py-2',
				sm: 'h-8 px-3',
				lg: 'h-11 px-8',
				xl: 'h-12 px-10',
				icon: 'size-8 p-0',
				sideBarProfile: 'size-full',
			},
			radius: {
				default: 'rounded-md',
				lg: 'rounded-lg',
				full: 'rounded-full',
				none: 'rounded-none',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			radius: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
