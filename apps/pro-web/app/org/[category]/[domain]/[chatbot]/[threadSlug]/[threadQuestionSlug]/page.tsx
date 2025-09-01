import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { getBrowseThreads, getCategories } from '@/services/hasura'
import type { PageProps } from '@/types'
import { toSlug } from 'mb-lib'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function BrowserThreadQuestionPage(props: PageProps) {
	const params = await props.params
	// const thread = await getThread({ threadSlug: params.threadSlug, jwt: '' })

	// if (!thread) {
	//   redirect('/b')
	// }

	// redirect(`/b/${params.chatbot}/${params.threadSlug}/${params.threadQuestionSlug}`)
	const categories = await getCategories()
	const category = categories.find(
		(category) => toSlug(category.name) === params.category,
	)
	const { threads, count } = await getBrowseThreads({
		categoryId: category?.categoryId,
		limit: PAGE_SIZE,
	})

	return (
		<BrowseList
			initialThreads={threads}
			initialCount={count}
			categoryId={category?.categoryId}
		/>
	)
}
