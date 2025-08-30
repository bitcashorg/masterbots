'use client'

import { ThemeToggle } from '@/components/shared/theme-toggle'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@masterbots/mb-ui'
import { Sheet, SheetContent, SheetTrigger } from '@masterbots/mb-ui'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	LogOut,
	ReceiptIcon,
	SettingsIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface ProfileSidebarProps {
	user: Session['user'] & {
		hasuraJwt?: string
	}
}

function getUserInitials(name: string) {
	const [firstName, lastName] = name.split(' ')
	return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { setActiveCategory, setActiveChatbot } = useSidebar()
	const router = useRouter()

	const handleNavigation = () => {
		setIsOpen(false)
		// TODO: This is a temporary fix to reset the active category and chatbot. Consider to update the navigation according to the active category and chatbot.
		setActiveCategory(null)
		setActiveChatbot(null)
	}

	const handleLogout = useCallback(async () => {
		try {
			setIsOpen(false)
			await new Promise((resolve) => setTimeout(resolve, 100))
			await signOut({ callbackUrl: '/' })
		} catch (error) {
			console.error('Logout error:', error)
			window.location.href = '/'
		}
	}, [])

	const goToProfile = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			setIsOpen(false)
			router.push(`/u/${user.slug}/t`)
		},
		[router, user.slug],
	)

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger
				className={cn(
					buttonVariants({ variant: 'ghost', radius: 'full' }),
					'relative inline-block h-full p-2 rounded-full md:hidden',
				)}
			>
				{user?.image ? (
					<Image
						className="transition-opacity duration-300 rounded-full select-none size-8 bg-foreground/10 ring-1 ring-zinc-100/10 hover:opacity-80"
						src={user?.image ? user.image : ''}
						alt={user.name ?? 'Avatar'}
						height={32}
						width={32}
						priority
					/>
				) : (
					<div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
						{user?.name ? getUserInitials(user?.name) : null}
					</div>
				)}
				<span className="sr-only">{user?.name}</span>
				<ChevronLeftIcon className="absolute size-3 mt-auto -right-1 top-1.5" />
			</SheetTrigger>
			<SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
				<div className="flex flex-col h-full">
					{/* Profile Header */}
					<div className="border-b mt-10">
						<Button
							onClick={goToProfile}
							variant="sideBarProfile"
							size="sideBarProfile"
							className="p-4 rounded-none"
						>
							{/* {user?.image ? (
								<Image
									className="rounded-full size-10"
									src={user.image}
									alt={user.name ?? 'Avatar'}
									height={40}
									width={40}
									priority
								/>
							) : (
								<div className="flex justify-center text-sm font-medium uppercase rounded-full size-10 bg-muted/50">
									{user?.name ? getUserInitials(user?.name) : null}
								</div>
							)}
							<div className="flex flex-col gap-1 items-start">
								<p className="text-sm font-medium">{user?.name}</p>
								<p className="text-xs text-muted-foreground">{user?.email}</p>
							</div> */}
							<span className="flex justify-center text-sm font-medium uppercase rounded-full size-10 bg-muted/50">
								{' '}
								Profile
							</span>
							<ChevronRightIcon className="ml-auto size-4" />
						</Button>
					</div>

					{/* Navigation Links - Only visible on mobile */}
					<nav className="flex h-full flex-col p-4 lg:hidden">
						<Link
							href="/c"
							onClick={handleNavigation}
							className={cn(
								buttonVariants({ variant: 'ghost' }),
								'justify-start w-full text-sm py-4 px-2',
							)}
						>
							Chat
						</Link>

						<Link
							href="/"
							onClick={handleNavigation}
							className={cn(
								buttonVariants({ variant: 'ghost' }),
								'justify-start w-full text-sm py-4 px-2',
							)}
						>
							Public
						</Link>

						{appConfig.features.devMode && (
							<Link
								href="/c/p"
								onClick={handleNavigation}
								className={cn(
									buttonVariants({ variant: 'ghost' }),
									'justify-start w-full text-sm py-4 px-2',
								)}
							>
								Pro
							</Link>
						)}
						{/* Logout Button */}
						<div className="flex flex-col items-center justify-between py-4 mt-auto border-t">
							<ThemeToggle className="px-2 py-4" onClick={handleNavigation} />
							<Link
								href={`/u/${user.slug}/s/pref`}
								onClick={handleNavigation}
								className={cn(
									buttonVariants({
										variant: 'ghost',
									}),
									'flex w-full gap-4 justify-between px-2 py-4 text-sm',
								)}
							>
								Preferences
								<SettingsIcon className="size-4" />
							</Link>
							{appConfig.features.devMode && (
								<Link
									href={`/u/${user.slug}/s/subs`}
									onClick={handleNavigation}
									className={cn(
										buttonVariants({
											variant: 'ghost',
										}),
										'flex w-full gap-4 justify-between px-2 py-4 text-sm',
									)}
								>
									Subscriptions
									<ReceiptIcon className="size-4" />
								</Link>
							)}
							<hr className="w-full border-t my-4" />
							<Button
								variant="ghost"
								className="flex w-full gap-4 justify-between px-2 py-4 text-sm"
								onClick={handleLogout}
							>
								Log Out
								<LogOut className="size-4" />
							</Button>
						</div>
					</nav>
				</div>
			</SheetContent>
		</Sheet>
	)
}
