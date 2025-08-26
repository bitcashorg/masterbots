import ShareLink from '@/components/routes/thread/thread-share-link'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { cn, isFollowed, numberShortener } from '@/lib/utils'
import type { BrowseChatbotLayoutProps } from '@/types/types'
import {
	Bot,
	ChevronLeft,
	MessageSquareIcon,
	MessageSquarePlusIcon,
	Users,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function BrowseChatbotDesktopDetails({
	chatbot,
	variant,
	isWelcomeView,
	descriptionPoints,
	hasMultiplePoints,
	botUrl,
	followers,
	onFollow,
}: BrowseChatbotLayoutProps) {
	const { data: session } = useSession()
	const followed = isFollowed({ followers, userId: session?.user?.id || '' })

	return (
		<div className="profile-hero-bg" id="hero-section">
			<div className="relative z-10 max-w-screen-lg mx-auto px-4">
				<Link
					href="/"
					className="w-max mr-auto my-2 flex items-center leading-none gap-2 text-[#09090Baf] hover:text-[#09090B]"
				>
					<ChevronLeft className="size-4" />
					<span>Back to browse</span>
				</Link>
				<Card className="relative w-full dark:bg-[#09090B] bg-white mx-auto">
					<CardHeader className="flex flex-row gap-4 items-center px-4 pt-4 pb-2">
						<h1 className="text-2xl font-bold text-zinc-950 dark:text-gray-300">
							{isWelcomeView ? 'Welcome to Masterbots!' : chatbot.name}
						</h1>
						<ShareLink
							variant={variant === 'selected' ? 'active' : 'default'}
						/>
					</CardHeader>
					<CardContent className="p-0">
						<div className="flex items-center text-zinc-950 dark:text-gray-400" />
						<div className="flex items-center px-4 pb-1.5">
							<Bot className="size-4" />
							<span className="px-1">bio:</span>
						</div>

						<div className="relative p-4 border-t-[3px] border-zinc-200 dark:border-gray-800">
							<div className="flex absolute right-0 -top-20 flex-col gap-4 items-center px-4">
								<div
									className={cn(
										'overflow-hidden p-0 m-0 rounded-full size-32',
										'bg-iron dark:bg-mirage',
										'ring-4 selected-bot-avatar',
									)}
								>
									<Image
										src={chatbot?.avatar || ''}
										alt={`${chatbot.name} avatar`}
										className="object-cover !relative w-full h-full"
										fill
									/>
								</div>

								<Button
									asChild
									className={cn(
										'w-full flex items-center gap-2 px-4 py-2 rounded-md mt-4',
										'bg-[#82e46a] hover:bg-[#82e46a]/90',
										'text-zinc-950',
									)}
								>
									<Link href={botUrl} className="flex gap-2 items-center">
										<MessageSquarePlusIcon className="size-4" />
										<span>New Chat</span>
									</Link>
								</Button>
							</div>

							<div className="max-w-[calc(100%-144px)]">
								<MemoizedReactMarkdown
									className="text-base text-black dark:text-white min-h-24 onboarding-chatbot-card__content"
									components={memoizedMarkdownComponents()}
								>
									{chatbot.description}
								</MemoizedReactMarkdown>
							</div>
						</div>
					</CardContent>

					<CardFooter className="flex w-full gap-4 items-center justify-start">
						<div className="flex items-center">
							<div className="flex gap-2 items-center text-zinc-950 dark:text-gray-300">
								<MessageSquareIcon className="size-4" />
								<span>
									Threads:{' '}
									<span className="text-gray-400">
										{numberShortener(chatbot.threads.length)}
									</span>
								</span>
							</div>
						</div>

						<div className="flex justify-between items-center">
							<div className="flex gap-4 items-center">
								<div className="flex gap-2 items-center text-zinc-950 dark:text-gray-300">
									<Users className="size-4" />
									<span>
										Followers:{' '}
										<span className="text-gray-400">
											{numberShortener(followers?.length || 0)}
										</span>
									</span>
								</div>
								<Button
									variant="outline"
									size="sm"
									className={cn(
										'h-[21px] px-3 py-0.5 rounded-md shadow',
										'border border-zinc-100/50',
										'font-normal text-zinc-500 text-sm',
										'flex justify-center items-center gap-1',
									)}
									onClick={onFollow}
								>
									{followed ? 'Following' : 'Follow'}
								</Button>
							</div>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
