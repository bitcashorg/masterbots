'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { ThreadPopupBase } from './thread-popup-base'

interface ThreadPopupProProps {
	title: string
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	className?: string
	isBrowseView?: boolean
	onConvertToDocument?: () => void
	showConvertButton?: boolean
	isConverting?: boolean
}

export const ThreadPopupPro = React.forwardRef<
	HTMLDivElement,
	ThreadPopupProProps
>(
	(
		{
			title,
			isOpen,
			onClose,
			children,
			className,
			isBrowseView = false,
			onConvertToDocument,
			showConvertButton = false,
			isConverting = false,
		},
		ref,
	) => {
		const headerActions =
			showConvertButton && onConvertToDocument ? (
				<Button
					variant="outline"
					size="sm"
					onClick={onConvertToDocument}
					disabled={isConverting}
					className="text-xs"
				>
					{isConverting ? 'Converting...' : 'Convert to Document'}
				</Button>
			) : null

		return (
			<ThreadPopupBase
				ref={ref}
				title={title}
				isOpen={isOpen}
				onClose={onClose}
				className={cn('animate-in fade-in-0 duration-200', className)}
				isBrowseView={isBrowseView}
				headerActions={headerActions}
			>
				{children}
			</ThreadPopupBase>
		)
	},
)

ThreadPopupPro.displayName = 'ThreadPopupPro'
