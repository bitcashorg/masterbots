export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string }
}) {
  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      /c/{params.category}
    </div>
  )
}
