import { motion } from 'framer-motion'
import type { Category } from '@repo/mb-genql'
import Link from 'next/link'
import { toSlug } from '@/lib/url'

export function CategoryLink({
  category,
  id,
  activeTab
}: {
  category: Category | 'all'
  id: string
  activeTab: string
}) {
  return (
    <Link
      className={`${
        (activeTab === 'all' && category === 'all') ||
        (category !== 'all' && activeTab === toSlug(category.name))
          ? 'dark:text-white'
          : 'dark:hover:text-white dark:text-[#F4F4F580] text-zinc-500 hover:text-black'
      } relative rounded-full px-3 py-1.5 text-sm font-medium  outline-sky-400 transition focus-visible:outline-2`}
      href={category === 'all' ? '/' : `/${toSlug(category.name)}`}
      id={id}
      shallow
      style={{
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {((activeTab === 'all' && category === 'all') ||
        (category !== 'all' && activeTab === toSlug(category.name))) && (
        <motion.span
          className="absolute inset-0 z-10 bg-transparent border-solid border-b-2 border-[#388DE2]"
          layoutId="bubble"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      {category === 'all' ? 'All' : category.name}
    </Link>
  )
}
