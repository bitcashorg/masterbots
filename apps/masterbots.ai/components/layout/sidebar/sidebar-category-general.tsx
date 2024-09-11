'use client'

import React, { useState, useEffect } from 'react'
import { getCategories } from '@/services/hasura'
import SidebarLink from '@/components/layout/sidebar/sidebar-link'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Category } from 'mb-genql'

export function SidebarCategoryGeneral() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { filterValue } = useSidebar()

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

  const filteredCategories = React.useMemo(() => 
    categories.filter(category =>
      category.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      category.chatbots.some(chatbot => 
        chatbot.chatbot.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    ),
    [categories, filterValue]
  )

  if (isLoading) return <div className="p-4 text-center">Loading categories...</div>
  if (filteredCategories.length === 0) return <div className="p-4 text-center">No matching categories found</div>

  return (
    <ul className="space-y-2">
      {filteredCategories.map((category) => (
        <li key={category.categoryId}>
          <SidebarLink category={category} />
        </li>
      ))}
    </ul>
  )
}