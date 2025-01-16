export default async function BrowseProCategoryPage({
	params,
}: {
	params: { category: string }
}) {
	return (
		<div className="max-w-screen-lg pb-10 mx-auto w-full">
			/c/p/{params.category}
		</div>
	)
}
