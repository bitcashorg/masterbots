/**
 * BrowseCategoryButton Component
 * 
 * This component represents a button for selecting a category in the browsing interface.
 * It allows users to navigate to different categories or return to the main page.
 * 
 * Props:
 * - category: The category object or 'all' to represent all categories.
 * - activeTab: The currently active category ID or null if 'all' is active.
 * - onClick: Callback function triggered when the button is clicked.
 * - id: Unique identifier for the button element.
 * 
 * Key Features:
 * - Dynamic Navigation: Navigates to the appropriate category page based on the category selected.
 * - Active State Styling: Applies different styles based on whether the button is active or not.
 * - Animation: Uses Framer Motion to animate the active state with a bubble effect.
 * - Accessibility: Includes focus-visible styles for better accessibility.
 */

import { motion } from 'framer-motion'
import type { Category } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Link from 'next/link'

export function BrowseCategoryButton({
  category,
  activeTab,
  onClick,
  id
}: {
  category: Category | 'all'
  activeTab: null | number
  onClick: () => void
  id: string
}) {
  return (
    <Link
      href={
        category === 'all'
          ? '/'
          : `/${toSlug(category.name)}`
      }
      shallow
      id={id}
      onClick={onClick}
      className={`${(activeTab === null && category === 'all') ||
          (category !== 'all' && activeTab === category.categoryId)
          ? 'dark:text-white'
          : 'dark:hover:text-white dark:text-[#F4F4F580] text-zinc-500 hover:text-black'
        } relative rounded-full px-3 py-1.5 text-sm font-medium  outline-sky-400 transition focus-visible:outline-2`}
      style={{
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {((activeTab === null && category === 'all') ||
        (category !== 'all' && activeTab === category.categoryId)) && (
          <motion.span
            layoutId="bubble"
            className="absolute inset-0 z-10 bg-transparent border-b-2 border-[#388DE2]"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      {category === 'all' ? 'All' : category.name}
    </Link>
  )
}
