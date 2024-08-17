'use client'

import { useBrowse } from '@/lib/hooks/use-browse'
import { Category } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { useEffect } from 'react'
import { BrowseCategoryButton } from './browse-category-button'

export function BrowseCategoryTabs({
  categories,
  initialCategory = 'all'
}: {
  categories: Category[]
  initialCategory?: string
}) {
  const { tab: activeTab, changeTab: setActiveTab } = useBrowse()
  useEffect(() => {
    if (document) {
      const element = document.getElementById(
        `browse-category-tab__${activeTab?.toString()}`
      )

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }
    }
  })

  useEffect(() => {
    if (initialCategory === 'all') {
      setActiveTab(null)
    } else {
      setActiveTab(
        categories.filter(
          c =>
            toSlug(c.name) ===
            initialCategory
        )[0]?.categoryId
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory])

  return (
    <div className="w-full py-[10px] my-3 !overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar small-thumb">
      <BrowseCategoryButton
        id="browse-category-tab__null"
        onClick={() => setActiveTab(null)}
        category="all"
        activeTab={activeTab}
      />
      {categories.map((category, key) => (
        <BrowseCategoryButton
          id={`browse-category-tab__${category.categoryId}`}
          key={key}
          onClick={() => setActiveTab(category.categoryId)}
          category={category}
          activeTab={activeTab}
        />
      ))}
    </div>
  )
}
