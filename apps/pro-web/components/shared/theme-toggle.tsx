'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'

import { IconMoon, IconSun } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'

export function ThemeToggle({
	className,
	onClick,
}: React.ComponentProps<'button'>) {
	const { setTheme, theme } = useTheme()
	const [_, startTransition] = React.useTransition()

	return (
		<Button
			variant="ghost"
			onClick={(e) => {
				startTransition(() => {
					setTheme(theme === 'light' ? 'dark' : 'light')
				})
				// A side-effect to handle the onClick prop
				onClick?.(e)
			}}
			className={cn('flex w-full gap-4 justify-between px-0', className)}
		>
			<span className="text-sm">
				{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
			</span>
			{!theme ? null : theme === 'dark' ? (
				<IconMoon className="transition-all" />
			) : (
				<IconSun className="transition-all" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
