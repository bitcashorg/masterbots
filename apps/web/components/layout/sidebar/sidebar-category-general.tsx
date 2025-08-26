'use client'

import { SidebarLink } from '@/components/layout/sidebar/sidebar-link'
import { useSidebar } from '@/lib/hooks/use-sidebar'

export function SidebarCategoryGeneral({ page }: { page?: string }) {
	const { filteredCategories, isFilterMode } = useSidebar()

	if (!filteredCategories.length)
		return (
			<div className="p-4 text-center min-h-inherit">
				Choose topics to get started
			</div>
		)
	return (
		<ul className="space-y-0 min-h-inherit">
			{filteredCategories.map((category) => (
				<li key={category.categoryId}>
					<SidebarLink
						category={category}
						isFilterMode={isFilterMode}
						page={page}
					/>
				</li>
			))}
		</ul>
	)
}
