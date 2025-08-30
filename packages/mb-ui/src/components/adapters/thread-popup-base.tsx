'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

interface ThreadPopupBaseProps {
	title: string
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	className?: string
	isBrowseView?: boolean
	headerActions?: React.ReactNode
}

export const ThreadPopupBase = React.forwardRef<
	HTMLDivElement,
	ThreadPopupBaseProps
>(
	(
		{
			title,
			isOpen,
			onClose,
			children,
			className,
			isBrowseView = false,
			headerActions,
		},
		ref,
	) => {
		if (!isOpen) return null

		return (
			<div
				ref={ref}
				className={cn(
					'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
					className,
				)}
			>
				<div className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-background rounded-lg shadow-lg overflow-hidden">
					<div className="relative rounded-t-[8px] px-2.5 md:px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]">
						<div className="flex items-center justify-between gap-6">
							<div className="items-center block overflow-y-auto whitespace-pre-line max-h-28 scrollbar small-thumb">
								<h2 className="text-lg font-semibold">{title}</h2>
							</div>
							<div className="flex items-center gap-2">
								{headerActions}
								<Button
									variant="ghost"
									size="sm"
									onClick={onClose}
									className="h-8 w-8 p-0"
								>
									<span className="sr-only">Close</span>×
								</Button>
							</div>
						</div>
					</div>
					<div
						className={cn(
							'flex flex-col gap-3 p-2.5 dark:bg-[#18181b] bg-white grow rounded-b-[8px] scrollbar h-full',
							isBrowseView ? 'pb-2 md:pb-4' : 'pb-[120px] md:pb-[180px]',
						)}
					>
						{children}
					</div>
				</div>
			</div>
		)
	},
)

ThreadPopupBase.displayName = 'ThreadPopupBase'
