'use client'

import { FilterInput } from '@/components/layout/sidebar/sidebar-filter-input'
import React from 'react'

export function SidebarHeader() {
	return (
		<div className="p-4 space-y-2">
			<FilterInput />
		</div>
	)
}
