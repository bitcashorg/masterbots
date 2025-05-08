'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import React from 'react'

// Import the FallbackEditor directly for now to avoid any runtime errors
import { FallbackEditor } from './FallbackEditor'

// Temporary replacement until we fix the Yoopta dependencies
const YooptaInner = FallbackEditor

// Shell component that renders the dynamic Yoopta editor
export function YooptaMarkdownEditor({
  value,
  onChange,
  className,
  placeholder = 'Start typing...',
}: {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}) {
  return (
    <div className={cn("w-full border rounded-md overflow-hidden", className)}>
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium border-b flex justify-between items-center">
        <span>Rich Text Editor</span>
        <span className="text-xs text-blue-600 dark:text-blue-400">Edit Mode</span>
      </div>
      <YooptaInner 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default YooptaMarkdownEditor