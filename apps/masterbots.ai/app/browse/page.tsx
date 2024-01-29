import { auth } from '@/auth'
import { isTokenExpired } from 'mb-lib'
import { redirect } from 'next/navigation'
import BrowseList from '@/components/browse-list'
import { BrowseCategoryTabs } from '@/components/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse-search-input'
import { CategoryMainTabs } from '@/components/category-main-tabs'
import { getCategories } from '@/services/hasura'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function BrowsePage() {
  const session = await auth()
  const categories = await getCategories()

  // NOTE: maybe we should use same expiration time
  const jwt = session!.user.hasuraJwt
  if (!jwt || isTokenExpired(jwt)) {
    redirect(`/sign-in`)
  }

  return (
    <>
      <CategoryMainTabs />
      <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <BrowseList />
    </>
  )
}
