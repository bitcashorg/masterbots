'use client'

import type { Category } from '@repo/mb-genql'
import { CategoryLink } from './category-link'
import { useEffect } from 'react'
import { toSlug } from '@/lib/url'

export function CategoryTabs({
  categories,
  initialCategory = 'all'
}: {
  categories: Category[]
  initialCategory?: string
}) {
  useEffect(() => {
    if (document) {
      const element = document.getElementById(
        `browse-category-tab__${
          initialCategory === 'all'
            ? 'all'
            : categories.filter(c => toSlug(c.name) === initialCategory)[0]
                ?.categoryId
        }`
      )

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }
    }
  }, [initialCategory])

  return (
    <div className="w-full py-[10px] my-3 !overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar small-thumb justify-between flex">
      <CategoryLink
        activeTab={initialCategory}
        category="all"
        id="browse-category-tab__all"
      />
      {categories.map((category, key) => (
        <CategoryLink
          activeTab={initialCategory}
          category={category}
          id={`browse-category-tab__${category.categoryId}`}
          key={key}
        />
      ))}
    </div>
  )
}
