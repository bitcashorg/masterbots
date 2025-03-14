import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { getThreads } from '@/services/hasura'
export default async function HomePage() {
	const threads = await getThreads({ limit: PAGE_SIZE, jwt: '' })

	return (
		<>
			<BrowseSearchInput />
			<BrowseList initialThreads={threads} />
		</>
	)
}
