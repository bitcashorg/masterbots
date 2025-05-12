'use client'
import type { Thread, User } from 'mb-genql'
import UserThreadPanel from '../thread/user-thread-panel'

export function UserThreadList({
	user,
	threads,
	count,
}: {
	user: User
	threads: Thread[]
	count: number
}) {
	if (!user) return null

	return (
		<div className="max-w-screen-xl pb-10 mx-auto w-full">
			<UserThreadPanel
				threads={threads}
				user={user}
				count={count}
				page="profile"
			/>
		</div>
	)
}
