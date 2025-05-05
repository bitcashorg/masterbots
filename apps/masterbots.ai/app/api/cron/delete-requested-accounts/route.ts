import type { User } from 'mb-genql'
import { NextResponse } from 'next/server'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const HASURA_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT!
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!

export async function GET() {
	const thirtyDaysAgo = new Date(
		Date.now() - 30 * 24 * 60 * 60 * 1000,
	).toISOString()

	// Step 1: Fetch user IDs scheduled for deletion
	const userIds = await getUserIdsMarkedForDeletion(thirtyDaysAgo)
	if (!userIds.length) {
		return NextResponse.json({ message: 'No users to delete' }, { status: 200 })
	}

	// Step 2: Delete their threads
	const deletedThreads = await deleteThreadsByUserIds(userIds)

	// Step 3: Delete the users
	const deletedUsers = await deleteUsersByIds(userIds)

	return NextResponse.json({
		deleted_users: deletedUsers,
		deleted_threads: deletedThreads,
	})
}

// === Helper Functions ===

async function getUserIdsMarkedForDeletion(date: string): Promise<string[]> {
	const query = `
    query GetUsers($date: timestamptz!) {
      users(where: { deletion_requested_at: { _lte: $date } }) {
        id
      }
    }
  `
	const response = await hasuraFetch(query, { date })
	return response.data?.users?.map((user: User) => user.userId) || []
}

async function deleteThreadsByUserIds(userIds: string[]): Promise<number> {
	const query = `
    mutation DeleteThreads($userIds: [uuid!]!) {
      deleteThread(where: { user_id: { _in: $userIds } }) {
        affected_rows
      }
    }
  `
	const response = await hasuraFetch(query, { userIds })
	return response.data?.deleteThread?.affected_rows || 0
}

async function deleteUsersByIds(userIds: string[]): Promise<number> {
	const query = `
    mutation DeleteUsers($userIds: [uuid!]!) {
      deleteUser(where: { id: { _in: $userIds } }) {
        affected_rows
      }
    }
  `
	const response = await hasuraFetch(query, { userIds })
	return response.data?.deleteUser?.affected_rows || 0
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function hasuraFetch(query: string, variables: Record<string, any>) {
	const res = await fetch(HASURA_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
		},
		body: JSON.stringify({ query, variables }),
	})
	return res.json()
}
