# Yoopta Editor Integration

Here are the changes needed to integrate Yoopta into the text document editing workspace:

## 1. Create yoopta-editor.tsx Component

First, create a new component file for the Yoopta editor in the same directory:

```tsx
// File: /components/routes/workspace/yoopta-editor.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// This component serves as a placeholder until the actual Yoopta packages are installed
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
  // Store editor content as HTML for now
  const [content, setContent] = useState(value)

  // Update when value prop changes
  useEffect(() => {
    setContent(value)
  }, [value])

  // Handle content changes and notify parent
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

// This placeholder will be replaced with the actual Yoopta implementation later
export const YooptaMarkdownEditor = YooptaEditor
```

## 2. Modify workspace-content.tsx

Then, modify the workspace-content.tsx file with these specific changes:

### a. Add imports at the top:

```tsx
import { YooptaMarkdownEditor } from './yoopta-editor'
```

### b. Add a new state variable for toggling Yoopta:

```tsx
const [useYooptaEditor, setUseYooptaEditor] = React.useState<boolean>(false)
```

### c. Replace the Source view section with:

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

## 3. Next Steps for Full Implementation

After these changes are in place and working, you can:

1. Install the actual Yoopta packages:
   ```bash
   bun add @yoopta/editor @yoopta/headless-editor @yoopta/core
   ```

2. Enhance the `yoopta-editor.tsx` file to use the actual Yoopta editor components instead of the placeholder.

The placeholder approach allows you to test the UI integration before committing to the full package installation.

## Notes

- This implementation provides a toggle to switch between the plain text editor and the rich Yoopta editor.
- The rich editor is implemented as a simple contentEditable div for now until the Yoopta packages are installed.
- The changes keep the core functionality intact while adding the new features.