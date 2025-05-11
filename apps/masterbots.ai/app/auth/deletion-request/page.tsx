'use client'

import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export default function DeletionRequestPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const deletionDate = searchParams.get('date')

	return (
		<div className="flex flex-col items-center p-4">
			<h2 className="text-2xl mb-4">Account Deletion Requested</h2>
			<p className="mb-2">
				You requested to delete your account on{' '}
				{new Date(deletionDate || '').toLocaleString()}.
			</p>
			<Button
				className="bg-red-500 text-white px-4 py-2 rounded mb-4"
				onClick={() => router.push('/c')}
			>
				Remove Deletion Request
			</Button>
			<Button
				className="bg-gray-500 text-white px-4 py-2 rounded"
				onClick={() => router.push('/')}
			>
				Go Back
			</Button>
		</div>
	)
}
