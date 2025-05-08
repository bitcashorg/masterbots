'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import YooptaEditor, { createYooptaEditor, type YooptaContentValue, type YooptaOnChangeOptions, type YooptaBlockData } from '@yoopta/editor'
import Paragraph from '@yoopta/paragraph'
import Headings from '@yoopta/headings'
import Blockquote from '@yoopta/blockquote'
import Code from '@yoopta/code'
import Lists from '@yoopta/lists'
import Divider from '@yoopta/divider'
import Link from '@yoopta/link'
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks'
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar'
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list'
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool'
import type { Descendant } from 'slate'

// Essential plugins for markdown editing
const PLUGINS = [
  Paragraph,
  Headings,
  Blockquote,
  Code,
  Lists,
  Divider,
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

// Add this helper function at the top
const createBlock = (type: string, content: { text: string }[], extra = {}) => ({
  type,
  content,
  id: crypto.randomUUID(),
  value: content as Descendant[],
  meta: { order: 0, depth: 0 },
  ...extra
} as YooptaBlockData<Descendant>);

// Helper to convert Markdown to Yoopta format - basic implementation
const markdownToYoopta = (markdown: string): YooptaContentValue => {
  if (!markdown) return [{ type: 'yoopta-paragraph', content: [{ text: '' }] }] as unknown as YooptaContentValue;

  // Split by lines and convert to basic blocks
  const lines = markdown.split('\n')
  const blocks = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines but preserve paragraph breaks
    if (!line) {
      if (i > 0 && lines[i-1].trim() !== '' && i < lines.length - 1 && lines[i+1].trim() !== '') {
        blocks.push(createBlock('yoopta-paragraph', [{ text: '' }]));
      }
      continue
    }
    
    // Check for headings
    if (line.startsWith('# ')) {
      blocks.push(createBlock('yoopta-heading', [{ text: line.substring(2) }], { level: 1 }));
    } else if (line.startsWith('## ')) {
      blocks.push(createBlock('yoopta-heading', [{ text: line.substring(3) }], { level: 2 }));
    } else if (line.startsWith('### ')) {
      blocks.push(createBlock('yoopta-heading', [{ text: line.substring(4) }], { level: 3 }));
    } else if (line.startsWith('#### ')) {
      blocks.push(createBlock('yoopta-heading', [{ text: line.substring(5) }], { level: 4 }));
    } else if (line.startsWith('> ')) {
      blocks.push(createBlock('yoopta-blockquote', [{ text: line.substring(2) }]));
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push(createBlock('yoopta-unordered-list', [{ text: line.substring(2) }]));
    } else if (line.startsWith('```')) {
      // Code block - find the end
      const codeLines = []
      let j = i + 1
      while (j < lines.length && !lines[j].startsWith('```')) {
        codeLines.push(lines[j])
        j++
      }
      blocks.push(createBlock('yoopta-code', [{ text: codeLines.join('\n') }], { language: 'text' }));
      i = j // Skip to end of code block
    } else if (line === '---') {
      blocks.push(createBlock('yoopta-divider', [{ text: '' }]));
    } else {
      blocks.push(createBlock('yoopta-paragraph', [{ text: line }]));
    }
  }
  
  return blocks.length > 0 ? blocks as unknown as YooptaContentValue : 
    [{ type: 'yoopta-paragraph', content: [{ text: '' }] }] as unknown as YooptaContentValue;
}

// Helper to convert Yoopta format to Markdown
const yooptaToMarkdown = (value: YooptaContentValue): string => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return ''
  }

  return value.map(block => {
    const text = block.content?.map((child: { text: string }) => child.text || '').join('') || ''
    
    switch (block.type) {
      case 'yoopta-heading': {
        const level = block.level || 1;
        return `${'#'.repeat(level)} ${text}`;
      }
      case 'yoopta-blockquote':
        return `> ${text}`
      case 'yoopta-code':
        return `\`\`\`${block.language || ''}\n${text}\n\`\`\``
      case 'yoopta-unordered-list':
        return `- ${text}`
      case 'yoopta-ordered-list':
        return `1. ${text}`
      case 'yoopta-divider':
        return '---'
      default:
        return text
    }
  }).join('\n\n')
}

// Simplified YooptaMarkdownEditor component to avoid runtime errors
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
  const editor = useMemo(() => createYooptaEditor(), []);
  const yooptaValue = useMemo(() => markdownToYoopta(value), [value]);
  
  const handleChange = (newValue: YooptaContentValue) => {
    const markdown = yooptaToMarkdown(newValue);
    onChange(markdown);
  };

  return (
    <div className={cn("w-full border rounded-md overflow-hidden", className)}>
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium border-b flex justify-between items-center">
        <span>Text Editor</span>
        <span className="text-xs text-green-600 dark:text-green-400">Markdown Mode</span>
      </div>
      
      <YooptaEditor
        editor={editor}
        value={yooptaValue}
        onChange={handleChange}
        plugins={PLUGINS}
        marks={MARKS}
        tools={TOOLS}
        placeholder={placeholder}
      />
    </div>
  )
}