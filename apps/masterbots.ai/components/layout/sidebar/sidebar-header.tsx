'use client'

import React from 'react'
import {FilterInput} from '@/components/shared/filter-input';

export function SidebarHeader() {

  return (
    <div className="p-4 space-y-2">
      <FilterInput />
    </div>
  )
}