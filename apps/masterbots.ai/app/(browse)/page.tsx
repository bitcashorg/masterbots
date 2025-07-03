import BrowseList from '@/components/routes/browse/browse-list'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { getBrowseThreads } from '@/services/hasura'

export default async function HomePage() {
	const { threads, count } = await getBrowseThreads({ limit: PAGE_SIZE })

	return (
		<BrowseList initialThreads={threads} initialCount={count} />
	)
}
