import { motion } from 'framer-motion'
import Link from 'next/link'
import { toSlug } from '@/lib/url'

export function CategoryLink({
  category,
  id
}: {
  category: string | 'all'
  id: string
}) {
  return (
    <Link
      className={`${
        category === 'all'
          ? 'dark:text-white'
          : 'dark:hover:text-white dark:text-[#F4F4F580] text-zinc-500 hover:text-black'
      } relative rounded-full px-3 py-1.5 text-sm font-medium  outline-sky-400 transition focus-visible:outline-2`}
      href={category === 'all' ? '/' : `/${toSlug(category)}`}
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
      {category === 'all' ? 'All' : category}
    </Link>
  )
}
