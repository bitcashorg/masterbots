export default async function BrowseProCategoryPage(props: {
	params: Promise<{ category: string }>
}) {
	const params = await props.params
	return (
		<div className="max-w-screen-lg pb-10 mx-auto w-full">
			/c/p/{params.category}
		</div>
	)
}
