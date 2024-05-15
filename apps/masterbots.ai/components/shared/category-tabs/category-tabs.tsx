'use client'

import { MB } from '@repo/supabase'
import { CategoryLink } from './category-link'

export function CategoryTabs({
  categories,
  initialCategory = 'all'
}: {
  categories: MB.Category[]
  initialCategory?: string
}) {
  return (
    <div className="w-full py-[10px] my-3 !overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar small-thumb justify-between flex">
      <CategoryLink category="all" id="browse-category-tab__null" />
      {categories.map((category, key) => (
        <CategoryLink
          category={category.name}
          id={`browse-category-tab__${category.categoryId}`}
          key={key}
        />
      ))}
    </div>
  )
}
