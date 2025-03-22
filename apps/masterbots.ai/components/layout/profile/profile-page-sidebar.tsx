'use client'

import { IconCaretRight } from '@/components/ui/icons'
import { useProfile } from '@/lib/hooks/use-profile'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import { MessagesSquare, ReceiptIcon, Settings } from 'lucide-react'
import { appConfig } from 'mb-env'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAsync, useLocation } from 'react-use'
import FooterCT from '../footer/footer-ct'
import Sidebar from '../sidebar/sidebar'

export const ProfileSidebar = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	const openSidebar = pathname.includes('/t')
	const [isThreadsOpen, setIsThreadsOpen] = useState(openSidebar)
	const { userSlug } = useParams()
	const { isSidebarOpen, toggleSidebar, setActiveCategory, setActiveChatbot } =
		useSidebar()
	const { currentUser, isSameUser } = useProfile()
	const { data: session } = useSession()
	const { value: user } = useAsync(async () => {
		if (currentUser === null) return null
		return currentUser
	}, [userSlug, currentUser])

	const sameUser = isSameUser(user?.userId)

	const handleToggleThreads = () => {
		if (!sameUser) return
		setIsThreadsOpen(!isThreadsOpen)
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
					'fixed lg:sticky z-[70] top-0 h-[100vh] ', // Changed to sticky and match parent height
					'w-[18.75rem] bg-gray-50 dark:bg-black border-r',
					'lg:transform-none lg:transition-none',
					isSidebarOpen
						? 'translate-x-0'
						: '-translate-x-full lg:translate-x-0',
				)}
			>
				<nav className="flex-1  h-full">
					<div className="flex flex-col space-y-1 font-Geist">
						{/* Threads Accordion */}
						<div className="rounded-lg">
							{/* <Link
								href={urlBuilders.profilesUrl({
									type: 'user',
									usernameSlug: userSlug as string,
								})}
								onClick={handleToggleThreads}
								className={cn(
									'flex w-full items-center justify-between px-4 py-3',
									'hover:bg-gray-200 dark:hover:bg-mirage transition-colors duration-200',
									isThreadsOpen || openSidebar
										? 'bg-gray-200 dark:bg-mirage'
										: '',
								)}
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
								<div className="flex items-center space-x-2">
									<MessagesSquare className="w-5 h-5" />
									<span className="font-normal">Threads</span>
								</div>
								<IconCaretRight
									className={cn(
										'transition-transform duration-300 stroke-[#09090b] dark:stroke-[#FAFAFA]',
										isThreadsOpen ? 'rotate-90' : 'rotate-0',
									)}
								/>
							</Link> */}
							<div
								className={cn(
									'overflow-y-auto w-full scrollbar transition-all duration-300 max-w-[300px]',
									{
										'border dark:border-b-mirage border-b-gray-200':
											isThreadsOpen,
										'max-h-0': !isThreadsOpen,
										'border-b-none': !sameUser,
									},
								)}
							>
								<Sidebar page="profile" />
							</div>
						</div>
						{sameUser &&
							session?.user.hasuraJwt &&
							appConfig.features.devMode && (
								<>
									<Link
										//
										href={`/u/${userSlug}/s/pref`}
										className={cn(
											'flex items-center space-x-2 px-4 py-3',
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
											'flex items-center space-x-2 px-4 py-3',
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
					</div>
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
			</section>
		</div>
	)
}
