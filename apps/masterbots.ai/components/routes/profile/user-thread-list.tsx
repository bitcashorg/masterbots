'use client'
import type { Thread, User } from 'mb-genql'
import UserThreadPanel from '../thread/user-thread-panel'

export function UserThreadList({
	user,
	threads,
}: {
	user: User
	threads: Thread[]
}) {
	if (!user) return null
	return (
		<div className="max-w-screen-lg pb-10 mx-auto w-full">
			<UserThreadPanel threads={threads} user={user} page="profile" />
		</div>
	)
}
