'use client'

import { ThreadPopup } from '@/components/routes/thread/thread-popup'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { useProfile } from '@/lib/hooks/use-profile'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import { MessagesSquareIcon, ReceiptIcon, Settings } from 'lucide-react'
import { appConfig } from 'mb-env'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAsync } from 'react-use'
import FooterCT from '../footer/footer-ct'
import Sidebar from '../sidebar/sidebar'

export const UserProfileSidebar = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const pathname = usePathname()
	const openSidebar = pathname.includes('/t')
	const [isThreadsOpen, setIsThreadOpen] = useState(openSidebar)
	const { userSlug } = useParams()
	const { isSidebarOpen, toggleSidebar, setActiveCategory, setActiveChatbot } =
		useSidebar()
	const { isOpenPopup } = useThread()
	const { currentUser, isSameUser, getUserInfo } = useProfile()
	const { data: session } = useSession()
	const { value: user } = useAsync(async () => {
		await getUserInfo(userSlug as string)
		// if (currentUser === null) return null
		return currentUser
	}, [userSlug, currentUser])

	const sameUser = isSameUser(user?.userId)

	const handleToggleThreads = () => {
		if (!sameUser) return
		setIsThreadOpen(!isThreadsOpen)
		setActiveCategory(null)
		setActiveChatbot(null)
	}

	return (
		<div className={cn('transition-all relative w-full flex h-full')}>
			{/* Overlay for mobile */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 z-30 lg:hidden"
					onClick={() => toggleSidebar()}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === 'Space') {
							toggleSidebar()
						}
					}}
				/>
			)}
			{/* Sidebar */}
			<aside
				className={cn(
					'fixed lg:sticky z-[70] top-[64px] lg:top-0 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]', // Changed to sticky and match parent height
					'w-[18.75rem] bg-gray-50 dark:bg-black border-r',
					'transition-all',
					isSidebarOpen
						? 'translate-x-0'
						: '-translate-x-full lg:translate-x-0',
				)}
			>
				<nav className="flex-1 h-full flex flex-col space-y-1 font-Geist">
					{/* Threads Accordion */}
					<div className="h-full">
						{/* User Pref is getting close. Enabling for devMode ONLY */}
						{sameUser && appConfig.features.devMode ? (
							<Accordion type="single" collapsible defaultValue="threads">
								<AccordionItem value="threads">
									<AccordionTrigger
										className={cn(
											'flex w-full items-center justify-between px-4 py-3',
											'hover:bg-gray-200 dark:hover:bg-mirage transition-colors duration-200',
											isThreadsOpen || openSidebar
												? 'bg-gray-200 dark:bg-mirage'
												: '',
										)}
									>
										<Link
											href={urlBuilders.profilesUrl({
												type: 'user',
												usernameSlug: userSlug as string,
											})}
											className="no-underline hover:no-underline focus-within:no-underline"
											onClick={handleToggleThreads}
											// biome-ignore lint/a11y/useSemanticElements: This is a button that redirects you to a page
											role="button"
											aria-expanded={isThreadsOpen}
											aria-controls="threads-panel"
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === 'Space') {
													handleToggleThreads()
												}
											}}
										>
											<div className="flex items-center gap-2">
												<MessagesSquareIcon className="w-5 h-5" />
												Threads
											</div>
										</Link>
									</AccordionTrigger>
									<AccordionContent className="px-0 pt-0 pb-10 scrollbar max-h-[calc(100vh-64px)]">
										<Sidebar page="profile" />
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						) : (
							<Sidebar page="profile" />
						)}
					</div>
					{sameUser &&
						session?.user.hasuraJwt &&
						appConfig.features.devMode && (
							<>
								<Link
									//
									href={`/u/${userSlug}/s/pref`}
									className={cn(
										'flex items-center gap-2 px-4 py-3',
										'hover:bg-gray-200 dark:hover:bg-mirage transition-colors duration-200',
										location.pathname?.includes('/s/pref')
											? 'bg-gray-200 dark:bg-mirage'
											: '',
									)}
								>
									<Settings className="w-5 h-5" />
									<span>Preferences</span>
								</Link>
								<Link
									//
									href={`/u/${userSlug}/s/subs`}
									className={cn(
										'flex items-center gap-2 px-4 py-3',
										'hover:bg-gray-200 dark:hover:bg-mirage transition-colors duration-200',
										location.pathname?.includes('/s/subs')
											? 'bg-gray-200 dark:bg-mirage'
											: '',
									)}
								>
									<ReceiptIcon className="w-5 h-5" />
									<span>Subscriptions</span>
								</Link>
							</>
						)}
				</nav>
			</aside>

			{/* Main content */}
			<section
				className={cn(
					'flex flex-col w-full h-full  lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)]',
				)}
			>
				<div className="flex flex-col w-full gap-10 pt-5 mb-10 mx-auto flex-grow ">
					{children}
				</div>
				<div className="fixed bottom-0 w-full left-0 z-10 dark:bg-black bg-white">
					<FooterCT />
				</div>
				{isOpenPopup && <ThreadPopup />}
			</section>
		</div>
	)
}
