'use client'

import { FilterInput } from '@/components/layout/sidebar/sidebar-filter-input'
import React from 'react'

interface SidebarHeaderProps {
	userId?: string
}

export function SidebarHeader({ userId }: SidebarHeaderProps) {
	return (
		<div className="p-4 space-y-2">
			<FilterInput userId={userId} />
		</div>
	)
}
