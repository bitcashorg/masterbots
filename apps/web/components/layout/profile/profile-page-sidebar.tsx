'use client'

import { ThreadPopupSkeleton } from '@/components/shared/skeletons/thread-popup-skeleton'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useProfile } from '@/lib/hooks/use-profile'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import { DotIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAsync } from 'react-use'
import FooterCT from '../footer/footer-ct'
import Sidebar from '../sidebar/sidebar'

const ThreadPopup = dynamic(
	() =>
		import('@/components/routes/thread/thread-popup').then(
			(mod) => mod.ThreadPopup,
		),
	{
		ssr: false,
		loading: () => <ThreadPopupSkeleton />,
	},
)

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
	const { getUserInfo, isSameUser } = useProfile()
	const { value: user } = useAsync(async () => {
		const { user, error } = await getUserInfo(userSlug as string)

		if (error) {
			throw new Error(error)
		}

		return user
	}, [userSlug])

	const handleToggleThreads = () => {
		if (!sameUser) return
		setIsThreadOpen(!isThreadsOpen)
		setActiveCategory(null)
		setActiveChatbot(null)
	}

	const sameUser = isSameUser(user?.userId)
	const isMainProfilePage =
		pathname.includes(`/u/${userSlug}/t`) || pathname === `/u/${userSlug}`
	const currentPage = pathname.includes(`/u/${userSlug}/s/pref`)
		? 'preferences'
		: 'subscriptions'

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
			{isMainProfilePage && (
				<div
					className={cn(
						'fixed lg:sticky z-[70] top-[64px] lg:top-0 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]', // Changed to sticky and match parent height
						'w-[18.75rem] bg-gray-50 dark:bg-black border-r',
						'flex-1 flex flex-col gap-1',
						'transition-all',
						isSidebarOpen
							? 'translate-x-0'
							: '-translate-x-full lg:translate-x-0',
					)}
				>
					<Sidebar page="profile" />
				</div>
			)}

			{/* Main content */}
			<section
				className={cn('flex flex-col size-full', {
					'lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)]': isMainProfilePage,
					'lg:pl-0 lg:pr-0 max-w-screen-xl mx-auto': !isMainProfilePage,
				})}
			>
				{/* {!isMainProfilePage && (
					<Breadcrumb className="px-4 py-2">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href={`/u/${userSlug}/t`}>
									Profile
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<DotIcon className="size-5" />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink href="#" className="capitalize">
									{currentPage}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				)} */}
				<div className="flex flex-col w-full gap-10 pt-5 mb-10 mx-auto flex-grow ">
					{children}
				</div>
				{isMainProfilePage && (
					<div className="fixed bottom-0 w-full left-0 z-10 dark:bg-black bg-white">
						<FooterCT />
					</div>
				)}
				{isOpenPopup && <ThreadPopup />}
			</section>
		</div>
	)
}
