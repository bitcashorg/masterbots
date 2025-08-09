'use client'

import { ThemeToggle } from '@/components/shared/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import { getUserInfoFromBrowse } from '@/services/hasura'
import {
	ChevronRightIcon,
	CircleUserRound,
	LogOutIcon,
	ReceiptIcon,
	SettingsIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { User } from 'mb-genql'
import { toSlugWithUnderScore } from 'mb-lib'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export interface UserMenuProps {
	user: Session['user']
}

function getUserInitials(name: string) {
	const [firstName, lastName] = name.split(' ')
	return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

function truncateUsername(username: string | null | undefined, maxLength = 10) {
	if (!username) return ''
	return username.length > maxLength
		? `${username.slice(0, maxLength - 4)}`
		: username
}

export function UserMenu({ user }: UserMenuProps) {
	const [data, setData] = useState<User | null>(null)
	const [open, setOpen] = useState(false)

	React.useEffect(() => {
		const fetchUser = async () => {
			if (!user?.slug) return
			try {
				const res = getUserInfoFromBrowse(user.slug as string)
				const userData = await res
				if (userData) {
					setData(userData as User)
				}
			} catch (error) {
				console.error('Failed to fetch user data:', error)
			}
		}
		fetchUser()
	}, [user])
	return (
		<div className="items-center justify-between hidden md:block">
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger
					className={cn(
						buttonVariants({
							variant: 'ghost',
							radius: 'full',
						}),
						'pl-0',
					)}
				>
					{user?.image && data?.profilePicture ? (
						<Image
							className="transition-opacity duration-300 rounded-full select-none size-8 bg-background/50 ring-1 ring-zinc-100/10 hover:opacity-80"
							src={(user?.image || data?.profilePicture) as string}
							alt={user.name ?? 'Avatar'}
							height={42}
							width={42}
						/>
					) : (
						<div className="flex items-center justify-center text-sm font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
							{user?.name ? getUserInitials(user?.name) : null}
						</div>
					)}
					<span className="ml-2">
						{user?.name && truncateUsername(user.name)}
					</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					sideOffset={8}
					align="start"
					className="w-[200px]"
					onClick={(e) => {
						setOpen(false)
					}}
				>
					<DropdownMenuGroup>
						<DropdownMenuItem className="flex items-center justify-between w-full py-0 px-0">
							<Link
								href={urlBuilders.profilesUrl({
									type: 'user',
									usernameSlug: user?.slug
										? user.slug
										: toSlugWithUnderScore(user?.name || ''),
								})}
								className={cn(
									buttonVariants({
										variant: 'ghost',
									}),
									'flex w-full gap-4 justify-between px-2 text-sm py-3 h-11',
								)}
							>
								Profile
								<CircleUserRound className="size-4" />
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem className="flex items-center justify-between w-full py-0 px-0">
							<ThemeToggle className="py-3 px-2" />
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center justify-between w-full py-0 px-0">
							<Link
								href={`/u/${user.slug}/s/pref`}
								className={cn(
									buttonVariants({
										variant: 'ghost',
									}),
									'flex w-full gap-4 justify-between px-2 text-sm py-3 h-11',
								)}
							>
								Preferences
								<SettingsIcon className="size-4" />
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center justify-between w-full py-0 px-0">
							<Link
								href={`/u/${user.slug}/s/subs`}
								className={cn(
									buttonVariants({
										variant: 'ghost',
									}),
									'flex w-full gap-4 justify-between px-2 text-sm py-3 h-11',
								)}
							>
								Subscriptions
								<ReceiptIcon className="size-4" />
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() =>
								signOut({
									callbackUrl: '/',
								})
							}
							className={cn(
								buttonVariants({
									variant: 'ghost',
								}),
								'flex w-full gap-4 justify-between px-2 text-sm py-3 h-11 cursor-pointer',
							)}
						>
							Log Out
							<LogOutIcon className="size-4" />
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
