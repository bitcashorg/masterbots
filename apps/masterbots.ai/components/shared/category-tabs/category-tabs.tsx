'use client'

import { toSlug } from '@/lib/url-params'
import { MB } from '@repo/supabase'
import { useEffect } from 'react'
import { CategoryLink } from './category-link'

export function CategoryTabs({
  categories,
  initialCategory = 'all'
}: {
  categories: MB.Category[]
  initialCategory?: string
}) {
  useEffect(() => {
    if (document) {
      const element = document.getElementById(
        `browse-category-tab__${initialCategory === 'all'
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
