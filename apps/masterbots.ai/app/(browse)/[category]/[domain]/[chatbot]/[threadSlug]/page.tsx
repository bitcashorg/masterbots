import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { getCategories, getThreads } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'
import { toSlug } from 'mb-lib'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage(props: ChatPageProps) {
	const params = await props.params
	// const thread = await getThread({
	// 	threadSlug: params.threadSlug,
	// 	domain: params.domain,
	// })

	// if (!thread) {
	// 	redirect('/b')
	// }

	// redirect(`/b/${params.chatbot}/${params.threadSlug}`)
	const categories = await getCategories()
	const category = categories.find(
		(category) => toSlug(category.name) === params.category,
	)
	const threads = await getThreads({
		categoryId: category?.categoryId,
		limit: PAGE_SIZE,
		jwt: '',
	})

	return (
		<div className="w-full max-w-screen-lg pb-10 mx-auto">
			{/* <BrowseCategoryTabs
				initialCategory={params.category}
				categories={categories}
			/> */}
			<BrowseSearchInput />
			<BrowseList initialThreads={threads} categoryId={category?.categoryId} />
		</div>
	)
}
