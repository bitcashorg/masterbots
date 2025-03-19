'use client'
/**
 * ThreadPanel Component
 *
 * A wrapper component that serves as a container for displaying user threads.
 * It integrates the UserThreadPanel component to present threads associated
 * with a specific chatbot.
 *
 * Key Features:
 * - Passes the selected chatbot and threads to the UserThreadPanel
 * - Supports optional search parameters for filtering threads
 *
 * Props:
 * - chatbot: Optional string representing the selected chatbot
 * - threads: Optional array of Thread objects to display
 * - search: Optional object for search parameters (key-value pairs)
 */

import UserThreadPanel from '@/components/routes/thread/user-thread-panel'
import type { Thread } from 'mb-genql'
import { Suspense } from 'react'

export default function ThreadPanel({ threads }: { threads?: Thread[] }) {
	return (
		<Suspense fallback={null}>
			<UserThreadPanel threads={threads} showSearch />
		</Suspense>
	)
}
