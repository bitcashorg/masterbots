import { getCategories } from '@/services/db'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function BrowsePage() {
  const categories = await getCategories()
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] justify-center py-10">
      {categories.map((category, key) => (
        <span key={key} className="pl-8">
          {category.name}
        </span>
      ))}
    </div>
  )
}
