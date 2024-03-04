'use client'

import { useBrowse } from '@/lib/hooks/use-browse'
import { Category } from 'mb-genql'
import { BrowseCategoryButton } from './browse-category-button'
import { useEffect } from 'react'

export function BrowseCategoryTabs({ categories }: { categories: Category[] }) {
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
