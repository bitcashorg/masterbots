'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useSonner } from '@/lib/hooks/useSonner'
import { updateUserDeletionRequest } from '@/services/hasura'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IconSpinner } from '../ui/icons'

export function DeletionRequest({
	deletionDate,
}: {
	deletionDate: string | number | Date
}) {
	const router = useRouter()
	const { data: session } = useSession()
	const { customSonner } = useSonner()
	const [isLoading, setIsLoading] = React.useState(false)

	const revertRequest = async () => {
		setIsLoading(true)
		const userId = session?.user.id
		const jwt = session?.user.hasuraJwt
		if (!userId || !jwt) {
			console.error('User must be authenticated to revert deletion request.')
			return
		}
		const response = await updateUserDeletionRequest({
			userId,
			jwt,
			reset: true,
		})
		if (!response.success) {
			setIsLoading(false)
			customSonner({
				type: 'error',
				text:
					response.error || 'Unknown error occurred while requesting deletion',
			})
			return
		}
		router.push('/c')
	}

	const requestedDate = new Date(deletionDate)
	const currentDate = new Date()
	const remainingDays = Math.max(
		30 -
			Math.floor(
				(currentDate.getTime() - requestedDate.getTime()) /
					(1000 * 60 * 60 * 24),
			),
		0,
	)

	return (
		<Dialog open={true} onOpenChange={() => console.log('Dialog closed')}>
			<DialogContent className="flex flex-col rounded-sm max-h-screen md:min-h-[540px] w-full md:w-11/12 p-0 md:max-w-2xl z-50 bg-gray-100 dark:bg-[#27272A] border border-iron dark:border-mirage overflow-y-auto">
				{/* Centered Main Content */}
				<div className="flex flex-col items-center justify-center min-h-[500px] p-10">
					<h2 className="text-2xl mb-4">Account Deletion Requested</h2>
					<p className="mb-4 text-center">
						You requested to delete your account on{' '}
						<span className="font-semibold">
							{requestedDate.toLocaleString()}
						</span>
						. Your account will be permanently deleted in{' '}
						<span className="font-semibold">{remainingDays}</span> days if you
						do not cancel this request.
					</p>

					<div className="flex gap-5 mt-4">
						<Button
							className="bg-fuchsia-800 text-white px-4 py-2 rounded mb-4 mr-5"
							onClick={revertRequest}
							disabled={isLoading}
						>
							Cancel Request
							{isLoading && <IconSpinner className="ml-2 animate-spin" />}
						</Button>
						<Button
							className="bg-gray-500 text-white px-4 py-2 rounded"
							onClick={() => signOut({ callbackUrl: '/' })}
						>
							Go Back
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
