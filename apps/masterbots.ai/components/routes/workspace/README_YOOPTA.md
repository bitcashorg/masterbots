# Yoopta Rich Text Editor Integration

This directory contains the implementation of the Yoopta rich text editor integration for the workspace document editor.

## Architecture

The integration follows the recommended pattern for client-side only libraries in Next.js:

1. **YooptaShell.tsx**: A client component that uses `next/dynamic` to load the actual Yoopta implementation.
2. **YooptaInner.tsx**: The component containing the actual Yoopta implementation, loaded with `ssr: false` to avoid SSR issues.
3. **FallbackEditor.tsx**: A simple fallback editor that uses a standard textarea when Yoopta packages aren't available.
4. **yoopta-editor.module.css**: A CSS module with basic styles for the editor.

## Error Handling

The implementation includes several layers of error handling:

1. Dynamic import with fallback: If loading YooptaInner fails, it automatically falls back to FallbackEditor
2. Try/catch blocks for dependency loading: YooptaInner uses try/catch blocks to avoid crashing if Yoopta packages are missing
3. Fallback rendering: If dependencies fail to load, a simple textarea editor is shown with a message

## Installation

To install the required Yoopta dependencies, run the provided installation script:

```bash
cd apps/masterbots.ai
sh components/routes/workspace/install-yoopta.sh
```

## Required Packages

The following Yoopta packages are required:

- @yoopta/editor
- @yoopta/paragraph
- @yoopta/headings
- @yoopta/blockquote
- @yoopta/code
- @yoopta/lists
- @yoopta/divider
- @yoopta/link
- @yoopta/marks
- @yoopta/toolbar
- @yoopta/action-menu-list
- @yoopta/link-tool

## Usage

The Yoopta editor is integrated into the workspace content view and can be toggled on/off using the toggle button in the "Full Source" view. The state is managed through the workspace context in `use-workspace.tsx`.

```tsx
// Example usage in workspace-content.tsx
{useRichEditor ? (
  <YooptaMarkdownEditor
    value={fullMarkdown}
    onChange={(newValue) => {
      setFullMarkdown(newValue)
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
      setSections(parseMarkdownSections(e.target.value))
    }}
    className="min-h-[400px] font-mono text-sm"
    placeholder="# Document Title..."
  />
)}
```

## Troubleshooting

If you encounter errors related to missing Yoopta packages, run the installation script provided. The implementation includes fallbacks to ensure the application doesn't crash even if the packages are missing.