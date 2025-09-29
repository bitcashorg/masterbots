import HomePage from '@/components/routes/home/home-page'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { getBrowseThreads } from '@/services/hasura'

export default async function Page() {
	const { threads, count } = await getBrowseThreads({ limit: PAGE_SIZE })

	return <HomePage initialThreads={threads} initialCount={count} />
}
