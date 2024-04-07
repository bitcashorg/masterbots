'use client'

import type { Category } from '@repo/mb-genql'
import { useEffect } from 'react'
import { useBrowse } from '@/hooks/use-browse'
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
        `browse-category-tab__${activeTab.toString()}`
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
            c.name.toLowerCase().replace(/\s+/g, '_').replace(/\&/g, 'n') ===
            initialCategory
        )[0]?.categoryId
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory])

  return (
    <div className="w-full py-[10px] my-3 !overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar small-thumb">
      <BrowseCategoryButton
        activeTab={activeTab}
        category="all"
        id="browse-category-tab__null"
        onClick={() => {
          setActiveTab(null)
        }}
      />
      {categories.map((category, key) => (
        <BrowseCategoryButton
          activeTab={activeTab}
          category={category}
          id={`browse-category-tab__${category.categoryId}`}
          key={key}
          onClick={() => {
            setActiveTab(category.categoryId)
          }}
        />
      ))}
    </div>
  )
}
