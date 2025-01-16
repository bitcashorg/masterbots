import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'

export default async function HomePage() {
	return (
		<>
			<BrowseSearchInput />
			<BrowseList />
		</>
	)
}
