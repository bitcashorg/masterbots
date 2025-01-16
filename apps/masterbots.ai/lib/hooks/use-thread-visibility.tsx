'use client'
import {
	UpdateThreadVisibility,
	approveThread,
	deleteThread,
	getThreads,
	getUnapprovedThreads,
} from '@/services/hasura'
import type { Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface DeleteThreadResponse {
	success: boolean
	message: string
	error: string | null
}

interface ThreadVisibilityContextProps {
	isPublic: boolean
	toggleVisibility: (newIsPublic: boolean, threadId: string) => void
	threads: Thread[]
	isSameUser: (thread: Thread) => boolean
	initiateDeleteThread: (threadId: string) => Promise<DeleteThreadResponse>
	handleToggleAdminMode: () => void
	adminApproveThread: (threadId: string) => void
	isAdminMode: boolean
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

export function ThreadVisibilityProvider({
	children,
}: ThreadVisibilityProviderProps) {
	const [isPublic, setIsPublic] = useState(false)
	const [threads, setThreads] = useState<Thread[]>([])
	const [isAdminMode, setIsAdminMode] = React.useState<boolean>(false)

	const session = useSession()
	const jwt = session?.data?.user?.hasuraJwt

	useEffect(() => {
		getThreadForUser()
	}, [jwt])

	const toggleVisibility = async (newIsPublic: boolean, threadId: string) => {
		try {
			setIsPublic(newIsPublic)
			await UpdateThreadVisibility({ isPublic: newIsPublic, threadId, jwt })
			await getThreadForUser()
		} catch (error) {
			console.error('Failed to update thread visibility:', error)
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
				setThreads(fetchedThreads)
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
				error: deleteT.error || 'An unknown error occurred',
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
				toast.error('Authentication required')
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
				toast.error('User session not found. Please log in again.')
				return
			}
			await approveThread({
				threadId,
				jwt,
			})
			toast.success('Thread approved successfully.')
			await loadUnapprovedThreads()
		} catch (error) {
			console.error('Error approving thread:', error)
			toast.error('Failed to approve thread. Please try again.')
		}
	}

	return (
		<ThreadVisibilityContext.Provider
			value={{
				isPublic,
				toggleVisibility,
				threads,
				isSameUser,
				initiateDeleteThread,
				handleToggleAdminMode,
				adminApproveThread,
				isAdminMode,
			}}
		>
			{children}
		</ThreadVisibilityContext.Provider>
	)
}
