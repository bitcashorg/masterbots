export default async function BrowseProExpertisePage({
  params
}: {
  params: { category: string; expertise: string }
}) {
  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      /c/p/{params.category}/{params.expertise}
    </div>
  )
}
