'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

interface ChatPanelProProps {
	children: React.ReactNode
	className?: string
	onSaveDocument?: () => void
	showSaveButton?: boolean
	isSaving?: boolean
	saveDialogOpen?: boolean
	onSaveDialogClose?: () => void
	saveDialogTitle?: string
	saveDialogContent?: React.ReactNode
}

export const ChatPanelPro = React.forwardRef<HTMLDivElement, ChatPanelProProps>(
	(
		{
			children,
			className,
			onSaveDocument,
			showSaveButton = false,
			isSaving = false,
			saveDialogOpen = false,
			onSaveDialogClose,
			saveDialogTitle = 'Save Document',
			saveDialogContent,
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={cn('flex flex-col h-full w-full relative', className)}
			>
				{showSaveButton && onSaveDocument && (
					<div className="flex justify-end p-4 border-b">
						<Button
							variant="outline"
							size="sm"
							onClick={onSaveDocument}
							disabled={isSaving}
						>
							{isSaving ? 'Saving...' : 'Save Document'}
						</Button>
					</div>
				)}

				<div className="flex-1 overflow-hidden">{children}</div>

				{saveDialogOpen && onSaveDialogClose && (
					<Dialog open={saveDialogOpen} onOpenChange={onSaveDialogClose}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{saveDialogTitle}</DialogTitle>
							</DialogHeader>
							{saveDialogContent}
						</DialogContent>
					</Dialog>
				)}
			</div>
		)
	},
)

ChatPanelPro.displayName = 'ChatPanelPro'
