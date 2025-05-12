'use client'
import {
	approveThread,
	deleteThread,
	getThreads,
	getUnapprovedThreads,
	updateThreadVisibility,
} from '@/services/hasura'
import type { Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useSonner } from './useSonner'

interface DeleteThreadResponse {
	success: boolean
	message: string
	error: string | null
}

interface ThreadVisibilityContextProps {
	isPublic: boolean
	toggleVisibility: (newIsPublic: boolean, threadId: string) => Promise<void>
	threads: Thread[]
	isSameUser: (thread: Thread) => boolean
	initiateDeleteThread: (threadId: string) => Promise<DeleteThreadResponse>
	handleToggleAdminMode: () => void
	adminApproveThread: (threadId: string) => void
	isAdminMode: boolean
	isContinuousThread: boolean
	setIsContinuousThread: React.Dispatch<React.SetStateAction<boolean>>
}

const ThreadVisibilityContext = React.createContext<
	ThreadVisibilityContextProps | undefined
>(undefined)

export function useThreadVisibility() {
	const context = React.useContext(ThreadVisibilityContext)
	if (!context) {
		throw new Error(
			'useThreadVisibilityContext must be used within a ThreadVisibilityProvider',
		)
	}
	return context
}

interface ThreadVisibilityProviderProps {
	children: React.ReactNode
}

// ? This depends on the client-side updates, not reading the server threads
// ! TODO: Add initial server state to avoid flickering
export function ThreadVisibilityProvider({
	children,
}: ThreadVisibilityProviderProps) {
	const [isPublic, setIsPublic] = useState(false)
	const [threads, setThreads] = useState<Thread[]>([])
	const [isAdminMode, setIsAdminMode] = React.useState<boolean>(false)
	const [isContinuousThread, setIsContinuousThread] =
		React.useState<boolean>(false)
	const { customSonner } = useSonner()

	const session = useSession()
	const jwt = session?.data?.user?.hasuraJwt

	// biome-ignore lint/correctness/useExhaustiveDependencies: not required here
	useEffect(() => {
		getThreadForUser()
	}, [jwt])

	const toggleVisibility = async (newIsPublic: boolean, threadId: string) => {
		try {
			const updateThreadResponse = await updateThreadVisibility({
				isPublic: newIsPublic,
				threadId,
				jwt,
			})

			if (updateThreadResponse.success) {
				setIsPublic(newIsPublic)
				customSonner({
					type: 'success',
					text: `Thread is now ${newIsPublic ? 'public' : 'private'}!`,
				})
			}
		} catch (error) {
			console.error('Failed to update thread visibility:', error)
			customSonner({
				type: 'error',
				text: 'Failed to update the thread visibility. Try again later.',
			})
		}
	}

	const getThreadForUser = async () => {
		try {
			if (!jwt || !session?.data?.user?.id) return

			const fetchedThreads = await getThreads({
				jwt,
				userId: session?.data?.user.id,
			})

			if (fetchedThreads) {
				setThreads(fetchedThreads.threads)
			}
		} catch (error) {
			console.error('Error fetching threads:', error)
		}
	}

	const isSameUser = (thread: Thread) => {
		if (!session?.data?.user?.id) return false
		return thread.userId === session?.data?.user?.id
	}

	const initiateDeleteThread = async (
		threadId: string,
	): Promise<DeleteThreadResponse> => {
		try {
			if (!session?.data?.user?.id || !jwt) {
				return {
					success: false,
					message: 'User session not found',
					error: 'User session not found. Please log in again.',
				}
			}
			const deleteT = await deleteThread({
				threadId,
				jwt,
				userId: session?.data?.user.id,
			})
			await getThreadForUser()
			if (deleteT.success) {
				return {
					success: true,
					message: 'Thread deleted successfully',
					error: null,
				}
			}

			return {
				success: false,
				message: deleteT.error || 'Failed to delete thread',
				error: deleteT.error || 'Failed to delete thread',
			}
		} catch (error) {
			console.error('Error deleting thread:', error)
			return {
				success: false,
				message: 'Failed to delete thread',
				error:
					error instanceof Error ? error.message : 'An unknown error occurred',
			}
		}
	}
	const loadUnapprovedThreads = async () => {
		try {
			if (!jwt) {
				customSonner({ type: 'error', text: 'Authentication required' })
				return
			}
			const unapprovedThreads = await getUnapprovedThreads({ jwt })
			setThreads(unapprovedThreads)
		} catch (error) {
			console.error('Error fetching unapproved threads:', error)
		}
	}

	const handleToggleAdminMode = async () => {
		if (!isAdminMode) {
			await loadUnapprovedThreads()
		} else {
			await getThreadForUser()
		}

		setIsAdminMode(!isAdminMode)
	}

	const adminApproveThread = async (threadId: string) => {
		try {
			if (!session || !jwt) {
				customSonner({
					type: 'error',
					text: 'User session not found. Please log in again.',
				})
				return
			}
			await approveThread({
				threadId,
				jwt,
			})
			customSonner({ type: 'success', text: 'Thread approved successfully.' })
			await loadUnapprovedThreads()
		} catch (error) {
			console.error('Error approving thread:', error)
			customSonner({
				type: 'error',
				text: 'Failed to approve thread. Please try again.',
			})
		}
	}

	return (
		<ThreadVisibilityContext.Provider
			value={{
				isPublic,
				threads,
				isAdminMode,
				isContinuousThread,
				isSameUser,
				toggleVisibility,
				adminApproveThread,
				initiateDeleteThread,
				handleToggleAdminMode,
				setIsContinuousThread,
			}}
		>
			{children}
		</ThreadVisibilityContext.Provider>
	)
}
