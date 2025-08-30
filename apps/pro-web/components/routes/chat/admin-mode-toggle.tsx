//? Component for toggling admin mode on and off

'use client'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { Button } from '@masterbots/mb-ui'
import { ShieldCheck, ShieldX } from 'lucide-react'

export function AdminModeToggle() {
	//* Retrieves admin mode state and toggle handler from useThreadVisibility hook
	const { isAdminMode, handleToggleAdminMode } = useThreadVisibility()

	return (
		<>
			<Button
				variant={isAdminMode ? 'destructive' : 'secondary'}
				onClick={handleToggleAdminMode}
				size="xl"
				className="flex items-center justify-center transition-all duration-300 rounded-md shadow-md"
			>
				{isAdminMode ? (
					<>
						<ShieldX className="w-5 h-5 mr-2" />
						Disable Admin Mode
					</>
				) : (
					<>
						<ShieldCheck className="w-5 h-5 mr-2" />
						Enable Admin Mode
					</>
				)}
			</Button>
		</>
	)
}
