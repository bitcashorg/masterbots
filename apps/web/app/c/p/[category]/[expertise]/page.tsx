export default async function BrowseProExpertisePage(props: {
	params: Promise<{ category: string; expertise: string }>
}) {
	const params = await props.params
	return (
		<div className="max-w-screen-xl pb-10 mx-auto w-full">
			/c/p/{params.category}/{params.expertise}
		</div>
	)
}
