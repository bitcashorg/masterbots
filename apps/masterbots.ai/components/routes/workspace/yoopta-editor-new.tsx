'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import YooptaEditor, { createYooptaEditor, YooptaContentValue, type YooptaOnChangeOptions } from '@yoopta/editor'
import Paragraph from '@yoopta/paragraph'
import Headings from '@yoopta/headings'
import Blockquote from '@yoopta/blockquote'
import Code from '@yoopta/code'
import Lists from '@yoopta/lists'
import Divider from '@yoopta/divider'
import Image from '@yoopta/image'
import Link from '@yoopta/link'
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks'
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar'
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list'
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool'

// Essential plugins for markdown editing
const PLUGINS = [
  Paragraph,
  Headings,
  Blockquote,
  Code,
  Lists,
  Divider,
  Image,
  Link
]

// Text formatting marks
const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight]

// Editor tools
const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
}

// Helper to convert Markdown to Yoopta format - basic implementation
const markdownToYoopta = (markdown: string): YooptaContentValue => {
  // Split by lines and convert to basic blocks
  const lines = markdown.split('\n')
  const blocks = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines
    if (!line) continue
    
    // Check for headings
    if (line.startsWith('# ')) {
      blocks.push({
        type: 'yoopta-heading',
        level: 1,
        children: [{ text: line.substring(2) }]
      })
    } else if (line.startsWith('## ')) {
      blocks.push({
        type: 'yoopta-heading',
        level: 2,
        children: [{ text: line.substring(3) }]
      })
    } else if (line.startsWith('### ')) {
      blocks.push({
        type: 'yoopta-heading',
        level: 3,
        children: [{ text: line.substring(4) }]
      })
    } else if (line.startsWith('#### ')) {
      blocks.push({
        type: 'yoopta-heading',
        level: 4,
        children: [{ text: line.substring(5) }]
      })
    } else if (line.startsWith('> ')) {
      blocks.push({
        type: 'yoopta-blockquote',
        children: [{ text: line.substring(2) }]
      })
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        type: 'yoopta-unordered-list',
        children: [{ text: line.substring(2) }]
      })
    } else if (line.startsWith('```')) {
      // Code block - find the end
      const codeLines = []
      let j = i + 1
      while (j < lines.length && !lines[j].startsWith('```')) {
        codeLines.push(lines[j])
        j++
      }
      blocks.push({
        type: 'yoopta-code',
        language: 'text',
        children: [{ text: codeLines.join('\n') }]
      })
      i = j // Skip to end of code block
    } else if (line === '---') {
      blocks.push({
        type: 'yoopta-divider',
        children: [{ text: '' }]
      })
    } else {
      blocks.push({
        type: 'yoopta-paragraph',
        children: [{ text: line }]
      })
    }
  }
  
  return blocks.length > 0 ? blocks : [{ type: 'yoopta-paragraph', children: [{ text: '' }] }]
}

// Helper to convert Yoopta format to Markdown
const yooptaToMarkdown = (value: YooptaContentValue): string => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return ''
  }

  return value.map(block => {
    const text = block.children?.map(child => child.text || '').join('') || ''
    
    switch (block.type) {
      case 'yoopta-heading':
        const level = block.level || 1
        return `${'#'.repeat(level)} ${text}\n`
      case 'yoopta-blockquote':
        return `> ${text}\n`
      case 'yoopta-code':
        return `\`\`\`${block.language || ''}\n${text}\n\`\`\`\n`
      case 'yoopta-unordered-list':
        return `- ${text}\n`
      case 'yoopta-ordered-list':
        return `1. ${text}\n`
      case 'yoopta-divider':
        return '---\n'
      case 'yoopta-paragraph':
      default:
        return `${text}\n`
    }
  }).join('\n')
}

// The enhanced Yoopta Markdown Editor component
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
  // Create the editor instance
  const editor = useMemo(() => createYooptaEditor(), [])
  
  // Convert the initial markdown to Yoopta format
  const [editorValue, setEditorValue] = useState<YooptaContentValue>(() => 
    markdownToYoopta(value)
  )
  
  // Update editor content when value prop changes
  useEffect(() => {
    setEditorValue(markdownToYoopta(value))
  }, [value])

  // Handle changes in the editor
  const handleChange = (newValue: YooptaContentValue, options: YooptaOnChangeOptions) => {
    setEditorValue(newValue)
    
    // Convert back to markdown and notify parent
    const markdownValue = yooptaToMarkdown(newValue)
    onChange(markdownValue)
  }

  return (
    <div className={cn("w-full border rounded-md overflow-hidden", className)}>
      <YooptaEditor
        editor={editor}
        plugins={PLUGINS}
        marks={MARKS}
        tools={TOOLS}
        value={editorValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="min-h-[400px] p-4"
      />
    </div>
  )
}