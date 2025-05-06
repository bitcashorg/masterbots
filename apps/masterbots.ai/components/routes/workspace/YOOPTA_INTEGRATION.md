# Yoopta Rich Text Editor Integration

This document outlines the changes needed to integrate the Yoopta rich text editor into the workspace text document editor.

## Implementation Summary

The implementation adds a toggle button that lets users switch between:
1. The original plain text editor (using a Textarea)
2. A rich text editor powered by Yoopta

## Files Created

1. **`yoopta-editor.tsx`**: Contains a placeholder implementation of the Yoopta editor.
2. **`workspace-content-yoopta.tsx`**: A complete version of the workspace content component with Yoopta integration.

## Integration Steps

To use the new implementation, you can either:

1. Replace the workspace-content.tsx file with workspace-content-yoopta.tsx (make a backup first), or
2. Manually apply the changes described below.

## Manual Integration Changes

1. **Import the Yoopta component**:
   ```tsx
   import { YooptaMarkdownEditor } from './yoopta-editor'
   ```

2. **Add state to toggle between editors**:
   ```tsx
   const [useYooptaEditor, setUseYooptaEditor] = React.useState<boolean>(false)
   ```

3. **Replace the Source view section with**:
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

## Full Yoopta Implementation Notes

1. The current implementation uses a simple contentEditable div as a placeholder.
2. To implement the full Yoopta editor:
   - Install the Yoopta packages: `@yoopta/editor`, `@yoopta/headless-editor`, and `@yoopta/core`
   - Update the `yoopta-editor.tsx` file to use the actual Yoopta components

## Next Steps

After applying these changes, you'll need to:

1. Install the Yoopta packages using Bun
2. Customize the styling to match your application's design
3. Add any specific Yoopta plugins or extensions you need for your use case