'use client'
import { UserCard } from '@/components/routes/profile/user-card'
import { useProfile } from '@/lib/hooks/use-profile'
import type { User } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Hero() {
	const { slug } = useParams()
	const { getuserInfo } = useProfile()
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(false)
	const { data: session } = useSession()

	useEffect(() => {
		let isActive = true
		if (slug) {
			const fetchData = async () => {
				setLoading(true)
				try {
					if (typeof slug !== 'string') {
						throw new Error('Invalid slug parameter')
					}

					const { user, error } = await getuserInfo(slug as string)
					if (!isActive) return
					if (error) {
						console.log(error)
						console.error('Failed to fetch user info:', error)
						setUser(null)
						return
					}
					setUser(user)
				} finally {
					if (isActive) {
						setLoading(false)
					}
				}
			}
			fetchData()
		}
		return () => {
			isActive = false
		}
	}, [slug, session])

	return (
		<div className="relative bg-left-bottom py-10 bg-[url('/hero-bg.png')] bg-no-repeat">
			<div className="absolute inset-0 bg-gradient-to-l from-mirage  via-[#6A0D826E]/80  to-[#9412B5BF] dark:via-[#66B252BF]/80 dark:to-[#83E56A6B]/80" />
			<div className="relative z-[2] md:px-0 px-5">
				<UserCard user={user} loading={loading} />
			</div>
		</div>
	)
}
