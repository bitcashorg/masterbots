'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { IconMoon, IconSun } from '@/components/ui/icons'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()
	const [_, startTransition] = React.useTransition()

	return (
		<div className="flex items-center justify-between w-full">
			<Button
				variant="ghost"
				onClick={() => {
					startTransition(() => {
						setTheme(theme === 'light' ? 'dark' : 'light')
					})
				}}
				className="flex w-full gap-4 justify-between px-0"
			>
				<span className="text-xs">
					{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
				</span>
				{!theme ? null : theme === 'dark' ? (
					<IconMoon className="transition-all" />
				) : (
					<IconSun className="transition-all" />
				)}
				<span className="sr-only">Toggle theme</span>
			</Button>
		</div>
	)
}
