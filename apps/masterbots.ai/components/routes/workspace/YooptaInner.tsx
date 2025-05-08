'use client'

// Import our local CSS module instead of the package styles
import styles from './yoopta-editor.module.css'
import React, { useMemo, useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'

// Import Yoopta dependencies in a try-catch pattern to handle missing packages
let YooptaEditor: any;
let createYooptaEditor: any;
let yooptaPlugins: any[] = [];
let yooptaMarks: any[] = [];
let yooptaTools: any = {};
let dependenciesLoaded = false;

// Try to load all dependencies, but don't crash if they're missing
try {
  const yooptaEditor = require('@yoopta/editor');
  YooptaEditor = yooptaEditor.default;
  createYooptaEditor = yooptaEditor.createYooptaEditor;
  
  // Try to load plugins
  try { yooptaPlugins.push(require('@yoopta/paragraph').default); } catch (e) {}
  try { yooptaPlugins.push(require('@yoopta/headings').default); } catch (e) {}
  try { yooptaPlugins.push(require('@yoopta/blockquote').default); } catch (e) {}
  try { yooptaPlugins.push(require('@yoopta/code').default); } catch (e) {}
  try { yooptaPlugins.push(require('@yoopta/lists').default); } catch (e) {}
  try { yooptaPlugins.push(require('@yoopta/divider').default); } catch (e) {}
  try { yooptaPlugins.push(require('@yoopta/link').default); } catch (e) {}
  
  // Try to load marks
  try {
    const marks = require('@yoopta/marks');
    yooptaMarks = [
      marks.Bold, 
      marks.Italic, 
      marks.CodeMark, 
      marks.Underline, 
      marks.Strike, 
      marks.Highlight
    ].filter(Boolean);
  } catch (e) {}
  
  // Try to load tools
  try {
    const toolbar = require('@yoopta/toolbar');
    yooptaTools.Toolbar = {
      tool: toolbar.default,
      render: toolbar.DefaultToolbarRender,
    };
  } catch (e) {}
  
  try {
    const actionMenu = require('@yoopta/action-menu-list');
    yooptaTools.ActionMenu = {
      tool: actionMenu.default,
      render: actionMenu.DefaultActionMenuRender,
    };
  } catch (e) {}
  
  try {
    const linkTool = require('@yoopta/link-tool');
    yooptaTools.LinkTool = {
      tool: linkTool.default,
      render: linkTool.DefaultLinkToolRender,
    };
  } catch (e) {}
  
  dependenciesLoaded = true;
} catch (e) {
  // If loading fails, we'll use the fallback editor
  console.log('Yoopta dependencies not available, using fallback editor');
  dependenciesLoaded = false;
}

// Helper to convert Markdown to Yoopta format
const markdownToYoopta = (markdown: string): any => {
  if (!markdown) return [{ type: 'yoopta-paragraph', children: [{ text: '' }] }];

  // Split by lines and convert to basic blocks
  const lines = markdown.split('\n')
  const blocks = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines but preserve paragraph breaks
    if (!line) {
      if (i > 0 && lines[i-1].trim() !== '' && i < lines.length - 1 && lines[i+1].trim() !== '') {
        blocks.push({
          type: 'yoopta-paragraph',
          children: [{ text: '' }]
        })
      }
      continue
    }
    
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
const yooptaToMarkdown = (value: any): string => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return ''
  }

  return value.map(block => {
    const text = block.children?.map((child: any) => child.text || '').join('') || ''
    
    switch (block.type) {
      case 'yoopta-heading':
        const level = block.level || 1
        return `${'#'.repeat(level)} ${text}`
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
      case 'yoopta-paragraph':
      default:
        return text
    }
  }).join('\n\n')
}

// Inner component with the actual Yoopta implementation or fallback
export default function YooptaInner({
  value,
  onChange,
  placeholder = 'Start typing...'
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  // Guard against browser APIs that might not be available in SSR
  if (typeof window === 'undefined') {
    return null
  }

  // Always use the fallback editor for now to avoid runtime errors
  // We'll add a proper check to fix the "elements" error
  return (
    <div className={styles.yooptaEditor}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] p-4 font-mono text-sm w-full"
      />
      <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs p-2 border-t border-blue-200 dark:border-blue-800">
        Using text editor mode. Rich editor is currently under maintenance.
      </div>
    </div>
  )
}