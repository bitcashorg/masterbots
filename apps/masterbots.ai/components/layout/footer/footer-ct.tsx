/* eslint-disable react/no-unescaped-entities */
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ElementType } from 'react'

export default function FooterCT({
	nonFooterTag,
	fixed,
	className,
}: {
	nonFooterTag?: boolean
	fixed?: boolean
	className?: string
}) {
	const Footer: ElementType = ({ children }) =>
		nonFooterTag ? (
			<div
				className={cn(
					"max-h-[64px] whitespace-break-spaces text-xs font-semibold font-['Geist_Mono'] flex justify-center items-center opacity-50",
					fixed && 'opacity-100 fixed w-full z-40 bottom-0 bg-accent',
				)}
			>
				{children}
			</div>
		) : (
			<footer
				className={cn(
					"max-h-[64px] whitespace-pre-wrap text-xs font-semibold font-['Geist_Mono'] contents justify-center items-center opacity-50 dark:text-[#83E56A] text-[#BE17E8]",
					fixed && 'opacity-100 fixed w-full z-40 bottom-0 bg-accent',
				)}
			>
				{children}
			</footer>
		)

	return (
		<div className={cn('layout-footer', className)}>
			<Footer>
				<span className="w-full">
					Masterbots isn't infallible; verify crucial facts. Not professional
					advice.
					{'\n'}Robot avatars by{' '}
					<a
						href="https://robohash.org"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
					>
						robohash.org
					</a>
					{' • '}
					<Link
						href="/terms"
						className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
					>
						terms & policies
					</Link>
				</span>
			</Footer>
		</div>
	)
}
