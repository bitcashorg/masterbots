'use client'

import { ThemeToggle } from '@/components/shared/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useProfile } from '@/lib/hooks/use-profile'
import { urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import { getUserInfoFromBrowse } from '@/services/hasura'
import type { User } from 'mb-genql'
import { toSlugWithUnderScore } from 'mb-lib'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
	const [data, setData] = React.useState<User | null>(null)

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
			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(
						buttonVariants({
							variant: 'ghost',
							radius: 'full',
						}),
						'pl-0',
					)}
				>
					{user?.image ? (
						<Image
							className="transition-opacity duration-300 rounded-full select-none size-8 bg-background/50 ring-1 ring-zinc-100/10 hover:opacity-80"
							src={data?.profilePicture ? data.profilePicture : ''}
							alt={user.name ?? 'Avatar'}
							height={42}
							width={42}
						/>
					) : (
						<div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
							{user?.name ? getUserInitials(user?.name) : null}
						</div>
					)}
					<span className="ml-2">
						{user?.name && truncateUsername(user.name)}
					</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
					<DropdownMenuItem className="flex-col items-start">
						<Link
							href={urlBuilders.profilesUrl({
								type: 'user',
								usernameSlug: user?.slug
									? user.slug
									: toSlugWithUnderScore(user?.name || ''),
							})}
							className="text-xs"
						>
							<div className="text-xs font-medium">{user?.name}</div>
							<div className="text-xs text-zinc-500">{user?.email}</div>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="w-full">
						<ThemeToggle />
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							signOut({
								callbackUrl: '/',
							})
						}
						className="text-xs"
					>
						Log Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
