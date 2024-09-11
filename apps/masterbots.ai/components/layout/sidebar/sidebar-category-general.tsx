'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { getCategories } from '@/services/hasura'
import { useSession } from 'next-auth/react'
import SidebarLink from '@/components/layout/sidebar/sidebar-link'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Category } from 'mb-genql'

export function SidebarCategoryGeneral() {
  const { data: session } = useSession()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const {
    isFilterMode,
    filterValue,
    selectedCategories,
    selectedChatbots
  } = useSidebar()

  useEffect(() => {
    async function fetchCategories() {
      if (session) {
        try {
          setIsLoading(true)
          setError(null)
          const fetchedCategories = await getCategories()
          setCategories(fetchedCategories)
        } catch (err) {
          setError('Failed to fetch categories')
          console.error('Error fetching categories:', err)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchCategories()
  }, [session])

  const filteredCategories = useMemo(() => 
    categories.filter(category =>
      category.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      category.chatbots.some(chatbot => 
        chatbot.chatbot.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    ),
    [categories, filterValue]
  )

  const renderCategory = useCallback((category: Category) => (
    <li key={category.categoryId}>
      <SidebarLink 
        category={category}
      />
    </li>
  ), [])

  if (!session) return null
  if (isLoading) return <div className="p-4 text-center">Loading categories...</div>
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>
  if (filteredCategories.length === 0) return <div className="p-4 text-center">No matching categories found</div>

  return (
    <ul className="space-y-2">
      {filteredCategories.map(renderCategory)}
    </ul>
  )
}