import { motion } from 'framer-motion'
import type { Category } from '@repo/mb-genql'
import Link from 'next/link'

export function CategoryLink({
  category,
  id
}: {
  category: Category | 'all'
  id: string
}) {
  return (
    <Link
      className={`${
        category === 'all'
          ? 'dark:text-white'
          : 'dark:hover:text-white dark:text-[#F4F4F580] text-zinc-500 hover:text-black'
      } relative rounded-full px-3 py-1.5 text-sm font-medium  outline-sky-400 transition focus-visible:outline-2`}
      href={
        category === 'all'
          ? '/'
          : `/${category.name.toLowerCase().replace(/\s+/g, '_').replace(/\&/g, '_')}`
      }
      id={id}
      shallow
      style={{
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {/* {((activeTab === null && category === 'all') ||
        (category !== 'all' && activeTab === category.categoryId)) && (
        <motion.span
          className="absolute inset-0 z-10 bg-transparent border-b-2 border-[#388DE2]"
          layoutId="bubble"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )} */}
      {category === 'all' ? 'All' : category.name}
    </Link>
  )
}
