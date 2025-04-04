/**
 * ThreadPublicitySwitch Component
 *
 * A toggle switch component that allows users to change the visibility
 * of a chat thread between public and private states.
 *
 * Key Features:
 * - Displays an eye icon for public visibility and an eye-off icon for private visibility
 * - Provides visual feedback on the current state of the thread's visibility
 * - Integrates with the useThreadVisibility hook to manage visibility state
 *
 * Functionality:
 * - Toggles the visibility state when the switch is changed
 * - Updates the visibility status of the thread based on user interaction
 *
 * Props:
 * - threadId: The ID of the thread whose visibility is being toggled
 */

import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { cn } from '@/lib/utils'
import * as Switch from '@radix-ui/react-switch'
import { Eye, EyeOff } from 'lucide-react'

export function ThreadPublicitySwitch({ threadId }: { threadId: string }) {
	const { isPublic, toggleVisibility } = useThreadVisibility()

	return (
		<Switch.Root
			className="relative inline-flex items-center h-[32px] w-[60px] bg-gray-300 dark:bg-gray-600 rounded-full"
			checked={isPublic}
			onCheckedChange={() => toggleVisibility(!isPublic, threadId)}
		>
			<Switch.Thumb
				title={isPublic ? 'Make public' : 'Make Private'}
				className={cn(
					'w-[32px] h-[32px] pr-4 bg-gray-100 dark:bg-gray-800 rounded-full transform transition-transform duration-100 ease-in-out',
					isPublic ? 'translate-x-[28px]' : '',
				)}
			/>
			<div className="absolute left-0 right-0 flex justify-between items-center w-full h-full px-[4px]">
				<Eye
					className={cn(
						'px-0.5 size-[24px] transition-opacity duration-300',
						isPublic ? 'text-muted-foreground/40' : 'text-muted-foreground',
					)}
				/>
				<EyeOff
					className={cn(
						'px-0.5 size-[24px] transition-opacity duration-300',
						!isPublic ? 'text-muted-foreground/40' : 'text-muted-foreground',
					)}
				/>
			</div>
		</Switch.Root>
	)
}
