import { getBrowseThreads, getUserInfoFromBrowse } from '@/services/hasura'
import BrowseUserDetails from '@/components/routes/browse/browse-user-details'
import BrowseSpecificThreadList from '@/components/routes/browse/browse-specific-thread-list'
import { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'

const PAGE_SIZE = 50

export default async function BotThreadsPage({
  params
}: {
  params: { slug: string }
}) {
  const user = await getUserInfoFromBrowse(params.slug)
  if (!user) return <div className="m-auto">No user found.</div>

  const threads = await getBrowseThreads({
    slug: params.slug,
    limit: PAGE_SIZE
  })
  console.log({ threads})
  return (
    <div className="w-full py-5">
      <BrowseUserDetails user={threads?.[0]?.user} />
      <BrowseSpecificThreadList
        initialThreads={threads}
        PAGE_SIZE={PAGE_SIZE}
        query={{
          slug: params.slug
        }}
        pageType="user"
      />
    </div>
  )
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const user = await getUserInfoFromBrowse(params.slug)

  const seoData = {
    title: user?.username || '',
    description: user?.username || '',
    ogType: 'website',
    ogImageUrl: user?.profilePicture || '',
    twitterCard: 'summary_large_image'
  }

  return generateMetadataFromSEO(seoData)
}
