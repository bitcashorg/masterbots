import { motion } from 'framer-motion'
import { Category } from 'mb-genql'

export function BrowseCategoryButton({
  category,
  activeTab,
  onClick
}: {
  category: Category | 'all'
  activeTab: null | number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        (activeTab === null && category === 'all') ||
        (category !== 'all' && activeTab === category.categoryId)
          ? 'dark:text-white'
          : 'dark:hover:text-white dark:text-[#F4F4F580]'
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
    </button>
  )
}
