export default async function BrowseProBotPage({
  params
}: {
  params: { category: string; expertise: string; chatbot: string }
}) {
  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      /c/p/{params.category}/{params.expertise}/{params.chatbot}
    </div>
  )
}
