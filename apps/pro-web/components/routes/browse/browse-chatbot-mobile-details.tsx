'use client'

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

export function BrowseChatbotMobileDetails({
	chatbot,
	botUrl,
	followers,
	onFollow,
}: BrowseChatbotLayoutProps) {
	const { data: session } = useSession()
	const followed = isFollowed({ followers, userId: session?.user?.id || '' })

	return (
		<div className="md:hidden profile-hero-bg">
			<div className="relative z-10">
				<div className="px-2 mx-auto mb-4">
					<Link
						href="/"
						className="flex items-center leading-none gap-2 text-[#09090Baf] hover:text-[#09090B]"
					>
						<ChevronLeft className="size-4" />
						<span>Back to browse</span>
					</Link>
				</div>
				<Card className="relative mx-2 dark:bg-[#09090B] bg-white">
					<CardHeader>
						<div className="flex justify-between items-start p-5 w-full">
							<div className="space-y-2">
								<h1 className="text-xl font-bold text-zinc-950 dark:text-gray-300">
									{chatbot.name}
								</h1>
								<div className="flex gap-2 items-center">
									<MessageSquareIcon className="size-4" />
									<span className="text-zinc-950 dark:text-gray-300">
										Threads: {chatbot.threads.length}
									</span>
								</div>
								<div className="flex items-center text-zinc-950 dark:text-gray-400">
									<Bot className="mr-2 size-4" />
									<span>bio:</span>
								</div>
							</div>
							<div
								className={cn(
									'size-[74px] rounded-full relative',
									'bg-zinc-200 dark:bg-black',
									'ring-4 selected-bot-avatar',
								)}
							>
								<Image
									src={chatbot?.avatar || ''}
									alt={`${chatbot.name} avatar`}
									width={74}
									height={74}
									className="object-cover p-0 m-0 size-full object-cover rounded-full"
								/>
							</div>
						</div>
					</CardHeader>
					<div className="h-[1px] bg-zinc-200 dark:bg-zinc-800 my-1" />

					<CardContent className="space-y-6 px-4">
						<MemoizedReactMarkdown
							className="pt-2.5 text-base text-black dark:text-white min-h-24 onboarding-chatbot-card__content [&ul]:flex"
							components={memoizedMarkdownComponents()}
						>
							{chatbot.description}
						</MemoizedReactMarkdown>
					</CardContent>

					<CardFooter className="flex flex-col space-y-4">
						<Button
							asChild
							className={cn(
								'h-8 px-3 py-2',
								'text-zinc-950 bg-[#82e46a] hover:bg-[#82e46a]/90',
								'rounded-md shadow',
								'font-normal font-geist leading-none',
							)}
						>
							<Link
								href={botUrl}
								className="flex gap-1 justify-center items-center"
							>
								<MessageSquarePlusIcon className="size-4" />
								<span className="text-base">New Chat</span>
							</Link>
						</Button>

						<div className="h-[42px] flex-col justify-center items-center inline-flex gap-3 justify-center items-center">
							<div className="w-[67px] flex-col justify-end items-center gap-1.5 inline-flex">
								{/* <div className="w-[70px] h-5 text-center text-zinc-950 dark:text-gray-300 text-[13px] font-normal">
									Following
								</div> */}
								{/* <div className="justify-start items-end gap-1.5 inline-flex">
									<Users className="size-4 text-zinc-950 dark:text-gray-300" />
									<div className="text-center text-zinc-500 text-[13px] font-normal">
										{numberShortener(followers?.length || 0)}
									</div>
								</div> */}
							</div>
							<div className="flex items-center space-x-5">
								<div className="inline-flex flex-col justify-center items-center">
									<div className="w-[70px] h-5 text-center text-zinc-950 dark:text-gray-300 text-[13px] font-normal">
										Followers
									</div>
									<div className="inline-flex gap-5 justify-start items-center">
										<div className="justify-start items-end gap-1.5 flex">
											<Users className="size-4 text-zinc-950 dark:text-gray-300" />
											<div className="text-center text-zinc-500 text-[13px] font-normal">
												{numberShortener(followers?.length || 0)}
											</div>
										</div>
									</div>
								</div>

								<Button
									variant="outline"
									size="sm"
									className={cn(
										'h-[21px] px-3 py-0.5',
										'rounded-md shadow',
										'border border-zinc-100/50',
										'text-zinc-500 text-sm font-normal',
										'hover:bg-zinc-100/10 hover:text-zinc-400',
										'transition-colors',
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
