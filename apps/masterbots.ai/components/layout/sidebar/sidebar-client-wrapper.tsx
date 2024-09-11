'use client'

import React from 'react'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Category } from 'mb-genql'
import { SidebarCategoryGeneral } from '@/components/layout/sidebar/sidebar-category-general'

interface SidebarClientWrapperProps {
  categories: Category[]
}

export function SidebarClientWrapper({ categories }: SidebarClientWrapperProps) {
  const { filterValue } = useSidebar()

  const filteredCategories = React.useMemo(() => 
    categories.filter(category => 
      category.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      category.chatbots.some(chatbot => 
        chatbot.chatbot.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    ),
    [categories, filterValue]
  )

  return <SidebarCategoryGeneral categories={filteredCategories} />
}