import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn, getRouteType, isFollowed, numberShortener } from '@/lib/utils'
import type { ChatbotDetailsProps } from '@/types'
import { Bot, BotMessageSquareIcon, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function OnboardingMobileChatbotDetails({
	botName = 'BuildBot',
	avatar = '',
	description,
	threadCount = 0,
	followersCount = 3200,
	isWelcomeView = true,
	categoryName,
	onNewChat,
	onFollow,
	followers,
}: ChatbotDetailsProps) {
	const { data: session } = useSession()
	const followed = isFollowed({ followers, userId: session?.user?.id || '' })
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	// Background image class
	const bgImage = 'bg-[url(/background.webp)] dark:bg-[url(/background.webp)]'
	return (
		<div
			className="md:hidden mt-10 mid:h-[calc(50vh-196px)] flex items-center justify-center -translate-y-8"
			data-route={routeType}
		>
			<Card className="w-full relative bg-white/95 dark:bg-[#09090B]/95 overflow-hidden border-2 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-xl">
				{/* Background image layer */}
				<div
					className={`absolute inset-0 rounded-md bg-center bg-cover opacity-20 ${bgImage}`}
				/>
				<CardHeader>
					<div className="flex flex-col gap-4">
						{isWelcomeView ? (
							<>
								<div className="px-4 pt-2.5 flex flex-col gap-2.5">
									<h1 className="text-xl font-bold text-zinc-950 dark:text-gray-300">
										Welcome to Masterbots!
									</h1>
									<p className="w-full text-sm text-zinc-500 dark:text-zinc-500 min-h-24">
										Here you can create new threads and share them to your
										network! Navigate with the sidebar and pick any bot of your
										interest.
									</p>
								</div>

								<div className="h-[3px] bg-zinc-200 dark:bg-slate-800" />

								<div className="flex items-start justify-between gap-4 px-4">
									<div className="flex-1">
										<h2 className="text-lg font-semibold text-zinc-950 dark:text-gray-300">
											Your Journey
											<br />
											Begins Here!
										</h2>
										<p className="text-base text-zinc-500 dark:text-zinc-500">
											Try and start with: <br />
											{botName}
										</p>
									</div>

									<div
										className={cn(
											'size-24 shrink-0 rounded-full relative',
											'bg-zinc-200 dark:bg-black',
											'ring selected-bot-avatar',
										)}
									>
										<Image
											src={avatar}
											alt={`${botName} avatar`}
											className="object-cover rounded-full"
											fill
										/>
									</div>
								</div>
							</>
						) : (
							<>
								<h1 className="px-4 pt-2 text-xl font-bold text-zinc-950 dark:text-gray-300">
									{botName}
								</h1>
								<div className="h-[3px] bg-zinc-200 dark:bg-slate-800" />
								<div className="flex items-start justify-between gap-4 px-4">
									<p className="flex-1 text-sm text-zinc-500 dark:text-zinc-500">
										{description}
									</p>

									<div
										className={cn(
											'size-16 shrink-0 rounded-full relative',
											'bg-zinc-200 dark:bg-black',
											'ring-2 selected-bot-avatar',
										)}
									>
										<Image
											src={avatar}
											alt={`${botName} avatar`}
											height={64}
											width={64}
											className="object-cover rounded-full"
										/>
									</div>
								</div>
							</>
						)}
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="flex items-center justify-center gap-2 pt-2">
						<Bot className="size-4 text-zinc-950 dark:text-gray-300" />
						<span className="text-zinc-500 dark:text-zinc-500">
							Threads: {numberShortener(threadCount)}
						</span>
					</div>

					<div className="flex items-center justify-center gap-6">
						<div className="flex items-center gap-2">
							<Users className="size-4" />
							<span className="text-zinc-500 dark:text-zinc-500">
								Followers: {numberShortener(followersCount)}
							</span>
						</div>
						<Button
							variant="outline"
							size="sm"
							disabled={!session}
							onClick={onFollow}
							className="border-zinc-200 dark:border-zinc-100/50 text-zinc-500"
						>
							{followed ? 'Following' : 'Follow'}
						</Button>
					</div>
				</CardContent>

				<CardFooter>
					<Button
						onClick={onNewChat}
						// eslint-disable-next-line tailwindcss/no-contradicting-classname
						className={cn(
							'w-3/4 mx-auto text-sm',
							'selected-bot-text',
							'flex items-center justify-center gap-2',
							'[data-route="chat"] &:hover:bg-purple-500/90',
							'[data-route="public"] &:hover:bg-green-500/90',
							'[data-route="chat"] &:hover:text-white',
							'[data-route="public"] &:hover:text-zinc-950',
						)}
					>
						<BotMessageSquareIcon className="size-6" />
						New Chat With {botName}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
