'use client'
import Link from 'next/link'
import { toSlug } from '@/lib/url-params'
import { usePathname } from 'next/navigation'

export function CategoryLink({
  category,
  id
}: {
  category: string | 'all'
  id: string
}) {
  const pathname = usePathname()
  const slug = toSlug(category)
  const isHome = pathname === ''
  const active = (isHome && category === 'all') || pathname === `/${slug}`
  return (
    <Link
      className={`${
        active
          ? 'dark:text-white'
          : 'dark:hover:text-white dark:text-[#F4F4F580] text-zinc-500 hover:text-black'
      } relative rounded-full px-3 py-1.5 text-sm font-medium  outline-sky-400 transition focus-visible:outline-2`}
      href={category === 'all' ? '/' : `/${slug}`}
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
