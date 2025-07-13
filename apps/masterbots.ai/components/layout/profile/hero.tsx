'use client'
import { UserCard } from '@/components/routes/profile/user-card'
import type { User } from 'mb-genql'

export function Hero({ user }: { user: User }) {
	if (!user) return null
	return (
		<div
			className="relative bg-left-bottom py-10 bg-[url('/hero-bg.png')] bg-no-repeat"
			id="hero-section"
		>
			<div className="absolute inset-0 bg-gradient-to-l from-mirage via-[#66B252BF]/80 dark:to-[#83E56A6B]/80" />
			<div className="relative z-[2] md:px-0 px-5">
				<UserCard user={user} loading={false} />
			</div>
		</div>
	)
}
