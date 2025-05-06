import { getHasuraClient } from 'mb-lib'
import { NextResponse } from 'next/server'

export async function GET() {
	const client = getHasuraClient()
	const thirtyDaysAgo = new Date(
		Date.now() - 30 * 24 * 60 * 60 * 1000,
	).toISOString()

	let userIds: string[] = []

	// Step 1: Fetch user IDs scheduled for deletion
	try {
		const userQuery = await client.query({
			user: {
				userId: true,
				__args: {
					where: {
						deletionRequestedAt: { _lte: thirtyDaysAgo },
					},
				},
			},
		})

		userIds = userQuery.user.map((u) => u.userId)

		if (!userIds.length) {
			return NextResponse.json(
				{ message: 'No users to delete' },
				{ status: 200 },
			)
		}
	} catch (error) {
		console.error('Error fetching users:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch users' },
			{ status: 500 },
		)
	}

	// Step 2: Delete threads
	let deletedThreads = 0
	try {
		const threadMutation = await client.mutation({
			deleteThread: {
				__args: {
					where: {
						userId: { _in: userIds },
					},
				},
				affectedRows: true,
			},
		})
		deletedThreads = threadMutation?.deleteThread?.affectedRows || 0
	} catch (error) {
		console.error('Error deleting threads:', error)
		return NextResponse.json(
			{ error: 'Failed to delete threads' },
			{ status: 500 },
		)
	}

	// Step 3: Delete users
	let deletedUsers = 0
	try {
		const userMutation = await client.mutation({
			deleteUser: {
				__args: {
					where: {
						userId: { _in: userIds },
					},
				},
				affectedRows: true,
			},
		})
		deletedUsers = userMutation.deleteUser?.affectedRows || 0
	} catch (error) {
		console.error('Error deleting users:', error)
		return NextResponse.json(
			{ error: 'Failed to delete users' },
			{ status: 500 },
		)
	}

	return NextResponse.json({
		deleted_users: deletedUsers,
		deleted_threads: deletedThreads,
	})
}
