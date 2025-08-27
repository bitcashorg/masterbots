import * as React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'default' | 'secondary' | 'ghost' | 'destructive'
	size?: 'sm' | 'md' | 'lg' | 'icon'
}

const base =
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
	default: 'bg-primary text-primary-foreground hover:opacity-90',
	secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
	ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
	destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
	sm: 'h-8 px-3',
	md: 'h-9 px-4',
	lg: 'h-10 px-6',
	icon: 'h-10 w-10',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'default', size = 'md', ...props }, ref) => {
		const cls = [base, variants[variant], sizes[size], className]
			.filter(Boolean)
			.join(' ')
		return <button ref={ref} className={cls} {...props} />
	},
)

Button.displayName = 'Button'
