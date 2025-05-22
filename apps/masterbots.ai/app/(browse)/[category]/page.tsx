import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getBrowseThreads, getCategories } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import type { Metadata } from 'next'

export default async function BrowseCategoryPage(props: {
	params: Promise<{ category: string }>
}) {
	const params = await props.params
	const categories = await getCategories()
	const category = categories.find(
		(category) => toSlug(category.name) === params.category,
	)
	const { threads, count } = await getBrowseThreads({
		categoryId: category?.categoryId,
		limit: PAGE_SIZE,
	})

	return (
		<div className="w-full max-w-screen-xl pb-10 mx-auto">
			{/* <BrowseCategoryTabs
        initialCategory={params.category}
        categories={categories}
      /> */}
			<BrowseSearchInput />
			<BrowseList
				initialThreads={threads}
				categoryId={category?.categoryId}
				initialCount={count}
			/>
		</div>
	)
}

export async function generateMetadata(props: {
	params: Promise<{ category: string }>
}): Promise<Metadata> {
	const params = await props.params
	const categories = await getCategories()
	const category = categories.find(
		(category) => toSlug(category.name) === params.category,
	)

	const seoData = {
		title: category?.name || '',
		description: `Browse the threads and find the one that suits your needs, from the ${category?.name} category`,
		ogType: 'website',
		ogImageUrl: `${process.env.BASE_URL}/api/og`,
		twitterCard: 'summary',
	}

	return await generateMetadataFromSEO(seoData, params)
}
