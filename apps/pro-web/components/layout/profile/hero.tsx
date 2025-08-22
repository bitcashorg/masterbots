'use client'
import { UserCard } from '@/components/routes/profile/user-card'
import type { User } from 'mb-genql'

export function Hero({ user }: { user: User }) {
	if (!user) return null

	return (
		<div className="profile-hero-bg" id="hero-section">
			<div className="relative z-[2] md:px-0 px-5">
				{/* <UserCard user={user} loading={false} /> */}
			</div>
		</div>
	)
}
