'use client'

import { getUserBySlug, updateUserPersonality } from '@/services/hasura'
import type { User } from 'mb-genql'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useSonner } from './useSonner'

interface profileContextProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	getUserInfo: (username: string) => Promise<any>
	isSameUser: (userId: string) => boolean
	updateUserInfo: (
		bio: string | null,
		topic: string | null,
		profilePicture: string | null,
	) => void
	currentUser: User | null
	setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const profileContext = React.createContext<profileContextProps | undefined>(
	undefined,
)

export function useProfile() {
	const context = React.useContext(profileContext)
	if (!context) {
		throw new Error('useProfileContext must be used within a ProfileProvider')
	}
	return context
}

interface ProfileProviderProps {
	children: React.ReactNode
}

export function ProfileProvider({ children }: ProfileProviderProps) {
	const { data: session } = useSession()

	const [currentUser, setCurrentUser] = React.useState<User | null>(null)
	const { customSonner } = useSonner()

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const getUserInfo = async (slug: string): Promise<any> => {
		if (!slug?.trim()) {
			throw new Error('Slug is required')
		}
		try {
			const sessionSlug = session?.user.slug
				? session?.user.slug.toLowerCase()
				: session?.user.name?.toLowerCase()
			const userInfo = await getUserBySlug({
				slug,
				isSameUser: sessionSlug === slug,
			})
			if (!userInfo) {
				throw new Error('User not found')
			}
			setCurrentUser(userInfo.user as User)
			return userInfo
		} catch (error) {
			console.error('Failed to fetch user info:', error)
			throw error
		}
	}

	const isSameUser = (userId: string) => {
		if (!userId?.trim() || !session?.user?.id) {
			return false
		}
		return session?.user.id === userId
	}

	const updateUserInfo = async (
		bio: string | null,
		topic: string | null,
		profilePicture: string | null,
	) => {
		try {
			const jwt = session?.user?.hasuraJwt
			if (!jwt || !session.user?.id) {
				throw new Error('User not authenticated')
			}
			await updateUserPersonality({
				userId: session?.user.id,
				jwt: session?.user.hasuraJwt,
				bio,
				topic,
				profilePicture,
			})
			setCurrentUser((prevUser) => {
				if (!prevUser) return null
				return {
					...prevUser,
					bio: bio || prevUser.bio || '',
					profilePicture: profilePicture || prevUser.profilePicture,
				}
			})
		} catch (error) {
			console.error('Failed to update user info', error)
			customSonner({ type: 'error', text: 'Failed to update user info' })
		}
	}

	return (
		<profileContext.Provider
			value={{
				getUserInfo,
				isSameUser,
				updateUserInfo,
				currentUser,
				setCurrentUser,
			}}
		>
			{children}
		</profileContext.Provider>
	)
}
