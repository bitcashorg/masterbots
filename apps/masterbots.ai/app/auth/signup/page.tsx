'use client'

import SignUpForm from '@/components/auth/signup-form'
import { getAppLogoPath } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
	const { theme } = useTheme()
	const logoSrc = getAppLogoPath({ theme })

	return (
		<motion.div
			className="flex flex-col min-h-[calc(100vh-4rem)] items-center py-6 sm:py-10"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			{/* Logo container with animation */}
			<motion.div
				className="w-full max-w-[1006px] sm:max-w-[500px] md:max-w-[1006px]  relative aspect-[726/200] mb-6 sm:mb-10"
				initial={{ y: 20 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
			>
				<Image
					src={logoSrc}
					fill
					priority
					alt="Masterbots Logo"
					className="object-contain"
				/>
			</motion.div>

			{/* Form container with animation and enhanced responsiveness */}
			<motion.div
				className="w-full max-w-[min(100%,400px)] px-4 space-y-6"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.2 }}
			>
				<div className="space-y-2 text-center">
					<p className="text-sm sm:text-base text-muted-foreground">
						Enter your email and password to create your account.
					</p>
				</div>

				<SignUpForm />

				{/* Optional: Add terms and conditions notice */}
				<p className="mt-6 text-xs text-center text-muted-foreground">
					By creating an account, you agree to our{' '}
					<Link href="/terms#terms" className="underline hover:text-primary">
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link href="/terms#privacy" className="underline hover:text-primary">
						Privacy Policy
					</Link>
				</p>
			</motion.div>
		</motion.div>
	)
}
