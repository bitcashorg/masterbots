'use client'

import { IconArrowDown } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@masterbots/mb-ui'
import { omit } from 'lodash'

export function ButtonScrollToBottom({
	className,
	isAtBottom,
	scrollToBottom,
	...props
}: ButtonScrollToBottomProps) {
	return (
		<Button
			variant="outline"
			size="icon"
			className={cn(
				'z-10 bg-background transition-opacity duration-300',
				isAtBottom ? 'opacity-0' : 'opacity-100',
				className,
			)}
			onClick={() => {
				scrollToBottom()
			}}
			{...(omit(props, [
				'isAtBottom',
				'scrollToBottom',
				'textClassName',
			]) as ButtonProps)}
		>
			<IconArrowDown className="transition-all" />
			<span className={props?.textClassName ? props.textClassName : 'sr-only'}>
				Scroll to bottom
			</span>
		</Button>
	)
}

interface ButtonScrollToBottomProps extends ButtonProps {
	scrollToBottom: () => void
	isAtBottom?: boolean
	textClassName?: string
}
