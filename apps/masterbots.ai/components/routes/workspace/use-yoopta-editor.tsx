'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

/**
 * A simple markdown editor component using textarea
 * 
 * This is a temporary fallback implementation while we resolve issues with Yoopta integration.
 * The component maintains the same API as the planned rich text editor for easy swapping later.
 */
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
        <span className="text-xs text-blue-600 dark:text-blue-400">Markdown Mode</span>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] p-4 font-mono text-sm border-0 focus-visible:ring-0"
      />
    </div>
  )
}