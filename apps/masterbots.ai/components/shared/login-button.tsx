'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGoogle } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
// import { IconGitHub, IconSpinner } from '@/components/ui/icons'

interface LoginButtonProps extends ButtonProps {
	showGithubIcon?: boolean
	text?: string
}

export function LoginButton({
	text = 'Login with Google',
	showGithubIcon = true,
	className,
	...props
}: LoginButtonProps) {
	const [isLoading, setIsLoading] = React.useState(false)
	return (
		<Button
			variant="secondary"
			size="xl"
			onClick={() => {
				setIsLoading(true)
				// next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
				signIn('google', { callbackUrl: '/chat' })
			}}
			disabled={isLoading}
			className={cn(className)}
			{...props}
		>
			{/* {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : null} */}
			{text === 'Login with Google' && (
				<IconGoogle className="fill-foreground stroke-foreground size-5" />
			)}
			{text}
		</Button>
	)
}
