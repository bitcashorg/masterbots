'use client'

import SidebarLink from '@/components/layout/sidebar/sidebar-link'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getCategories } from '@/services/hasura'
import { Category } from 'mb-genql'
import { useEffect, useMemo, useState } from 'react'

export function SidebarCategoryGeneral() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { filterValue, selectedCategories, isFilterMode } = useSidebar()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const filteredCategories = useMemo(() =>
    isFilterMode
      ? categories
      : categories.filter(category =>
        category.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        category.chatbots.some(chatbot =>
          chatbot.chatbot.name.toLowerCase().includes(filterValue.toLowerCase())
        )
      ).filter(category => selectedCategories.includes(category.categoryId)),
    [categories, filterValue, isFilterMode]
  )

  if (isLoading) return <div className="p-4 text-center">Loading categories...</div>
  if (!filteredCategories.length) return <div className="p-4 text-center">No matching categories found</div>
  if (!selectedCategories.length) return <div className="p-4 text-center">No categories selected</div>

  return (
    <ul className="space-y-2">
      {filteredCategories.map((category) => (
        <li key={category.categoryId}>
          <SidebarLink category={category} isFilterMode={isFilterMode} />
        </li>
      ))}
    </ul>
  )
}