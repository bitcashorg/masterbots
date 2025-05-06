# Yoopta Integration Patch

To integrate Yoopta editor into the workspace text editor, you need to:

1. First, install Yoopta packages:
```bash
bun add @yoopta/editor @yoopta/headless-editor @yoopta/core
```

2. Create a YooptaEditor component file (yoopta-editor.tsx) in the workspace folder with:
```tsx
'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// This is a placeholder component that will be replaced with the actual Yoopta editor
// once the package is installed
export function YooptaEditor({
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
  // We'll store the editor's content as HTML until we can integrate the real Yoopta editor
  const [content, setContent] = useState(value)

  // Update the local content when the value prop changes
  useEffect(() => {
    setContent(value)
  }, [value])

  // Handle content changes and propagate to parent
  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML
    setContent(newContent)
    onChange(newContent)
  }

  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert w-full min-h-[400px] border rounded-md p-4 overflow-auto focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      contentEditable
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: content }}
      placeholder={placeholder}
      suppressContentEditableWarning
    />
  )
}

// This is just a placeholder for now - will be replaced with actual Yoopta implementation
export const YooptaMarkdownEditor = YooptaEditor
```

3. In workspace-content.tsx:

a. Import the Yoopta component at the top:
```tsx
import { YooptaMarkdownEditor } from './yoopta-editor'
```

b. Add the useYooptaEditor state:
```tsx
const [useYooptaEditor, setUseYooptaEditor] = React.useState<boolean>(false)
```

c. Replace the Source view section to include Yoopta:
```tsx
{/* Source view with Yoopta integration */}
{viewMode === 'source' && (
  <div className="border rounded-lg p-4">
    {/* Toggle between Yoopta editor and plain Textarea */}
    <div className="flex justify-end mb-2">
      <button 
        onClick={() => setUseYooptaEditor(prev => !prev)} 
        className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
      >
        {useYooptaEditor ? 'Switch to Plain Editor' : 'Switch to Rich Editor'}
      </button>
    </div>
    
    {useYooptaEditor ? (
      <YooptaMarkdownEditor
        value={fullMarkdown}
        onChange={(newValue) => {
          setFullMarkdown(newValue)
          // When source is changed, update sections
          setSections(parseMarkdownSections(newValue))
        }}
        className="min-h-[400px]"
        placeholder="# Document Title..."
      />
    ) : (
      <Textarea
        value={fullMarkdown}
        onChange={(e) => {
          setFullMarkdown(e.target.value)
          // When source is changed, update sections
          setSections(parseMarkdownSections(e.target.value))
        }}
        className="min-h-[400px] font-mono text-sm"
        placeholder="# Document Title..."
      />
    )}
    <div className="mt-2 text-xs text-muted-foreground">
      <p>
        Edit the full markdown source. Changes will be applied when you
        switch back to section view.
      </p>
    </div>
  </div>
)}
```

4. Once the Yoopta packages are installed, you can update the yoopta-editor.tsx file to use the actual Yoopta editor implementation.

Note: The current implementation includes a placeholder for the Yoopta editor that uses a simple contentEditable div. Once the packages are installed, you can implement the actual Yoopta editor in the YooptaMarkdownEditor component.