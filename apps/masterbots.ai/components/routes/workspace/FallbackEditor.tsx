'use client'

import React, { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import styles from './yoopta-editor.module.css'

// Fallback editor component for when Yoopta packages aren't available
export function FallbackEditor({
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
  const [localValue, setLocalValue] = useState(value)

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Handle changes and notify parent
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className={className}>
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium border-b flex justify-between items-center">
        <span>Rich Text Editor (Fallback Mode)</span>
        <span className="text-xs text-yellow-600 dark:text-yellow-400">Markdown Supported</span>
      </div>
      <Textarea
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`min-h-[400px] p-4 font-mono text-sm ${styles.yooptaEditor}`}
      />
    </div>
  )
}