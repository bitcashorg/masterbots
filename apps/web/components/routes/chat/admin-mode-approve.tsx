//? Component for approving threads in admin mode

import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { Button } from '@masterbots/mb-ui'
import { ShieldCheck } from 'lucide-react'
import { useState } from 'react'

interface AdminModeApproveProps {
	threadId: string
}

export function AdminModeApprove({ threadId }: AdminModeApproveProps) {
	const { adminApproveThread } = useThreadVisibility()
	const [isLoading, setIsLoading] = useState(false) //* Tracks the loading state during approval
	const [error, setError] = useState<string | null>(null) //* Stores any error message from approval

	//* Handles the approval of a thread by calling the adminApproveThread function
	const approveThread = async () => {
		setIsLoading(true)
		try {
			await adminApproveThread(threadId)
		} catch (err) {
			setError('Failed to approve thread. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="transition-all scale-[0.98] hover:scale-[0.99] bg-[#BE17E81A] flex justify-between w-full border-t border-[#BE17E8] -mt-2 rounded-b-lg">
			<Button
				aria-label="Approve thread"
				disabled={isLoading}
				onClick={approveThread}
				variant="ghost"
				size="lg"
				className="w-full flex justify-between font-semibold text-[#BE17E8] rounded-t-none rounded-b-lg"
			>
				<ShieldCheck className="size-4 mr-2" />
				{isLoading ? 'Approving...' : 'Approve'}
			</Button>
			{error && <p className="mt-2 text-red-500">{error}</p>}
		</div>
	)
}
