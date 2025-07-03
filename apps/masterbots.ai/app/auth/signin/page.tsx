// app/auth/signin/page.tsx

'use client'

import SignInForm from '@/components/auth/signin-form'
import { AppLogo } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
	const searchParams = useSearchParams()
	const verified = searchParams.get('verified')
	const { theme } = useTheme()
	const logoSrc = AppLogo({ theme })

	return (
		<div className="flex flex-col min-h-[calc(100vh-4rem)] items-center py-6 sm:py-10">
			<div className="w-full max-w-[320px] sm:max-w-[500px] md:max-w-[726px] relative aspect-[726/200] mb-6 sm:mb-10">
				<Image
					src={logoSrc}
					fill
					priority
					alt="Masterbots Logo"
					className="object-contain"
				/>
			</div>

			<div className="w-full max-w-[min(100%,400px)] px-4 space-y-6">
				{verified && (
					<div className="p-4 text-sm text-center text-green-800 rounded-lg bg-green-50 dark:bg-green-900/30 dark:text-green-200">
						<p className="font-medium">Email verified successfully!</p>
						<p>Please sign in to access your account.</p>
					</div>
				)}

				<div className="space-y-2 text-center">
					<p className="text-sm sm:text-base text-muted-foreground">
						Enter your email and password to access your account.
					</p>
				</div>

				<SignInForm />

				<div className="space-y-4">
					<div className="text-sm text-center text-muted-foreground">
						Don&apos;t have an account?{' '}
						<Link
							href="/auth/signup"
							className="underline transition-colors hover:text-primary"
						>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
