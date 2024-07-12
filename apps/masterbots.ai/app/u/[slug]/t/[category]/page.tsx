export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string }
}) {
  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      /u/[slug]/t/{params.category}
    </div>
  )
}
