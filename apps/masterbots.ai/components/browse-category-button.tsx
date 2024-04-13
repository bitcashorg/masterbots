import { motion } from 'framer-motion'
import { Category } from 'mb-genql'
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
          : `/${category.name.toLowerCase().replace(/\s+/g, '_').replace(/\&/g, 'n')}`
      }
      shallow
      id={id}
      onClick={onClick}
      className={`${
        (activeTab === null && category === 'all') ||
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
          className="absolute inset-0 z-10 bg-transparent border-b-[2px] border-[#388DE2]"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      {category === 'all' ? 'All' : category.name}
    </Link>
  )
}
