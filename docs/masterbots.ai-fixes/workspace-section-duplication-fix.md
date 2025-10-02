# Workspace AI Section Duplication Fix

## Issue Description

When using the "Expand" feature on a workspace section, the AI-generated content was being duplicated multiple times in the final document. Additionally, **content after the expanded section was being lost**, especially when expanding sections that weren't the last section in the document.

## Root Cause Analysis

### Primary Problem: Stale Closure on currentContent

The critical issue was that `currentContent` was captured in a closure when the streaming callback was created, but during streaming, multiple chunks arrived sequentially. Each chunk needed to see the UPDATED content from the previous chunk, but instead received stale content.

**The Flow (Broken):**

1. User triggers "Expand" on a section
2. `handleDocumentUpdate` is set as a callback with `currentContent` captured from `documentContent`
3. **Chunk 1 arrives** → Uses `currentContent` (original document)
4. Chunk 1 replaces section content → Calls `setDocumentContent(newMarkdown)`
5. **Chunk 2 arrives** → Still uses ORIGINAL `currentContent` (stale closure!)
6. Chunk 2 parses sections from stale content → Loses Chunk 1's changes
7. Result: **Duplication** (both chunks applied to original) OR **Lost content** (sections after edit point)

### Secondary Problem: Using Original Snapshot for Offsets

Initially, we were also parsing sections from `originalSnapshot` instead of current content, which caused section offset drift as the document grew during streaming.

## The Fix

### Solution Strategy

**Use a ref to track the current streaming content state:**

1. ✅ **Add `currentStreamingContentRef`** - Tracks the most recent document state during streaming
2. ✅ **Update ref immediately after each replacement** - Ensures next chunk sees updated content
3. ✅ **Use ref in `handleDocumentUpdate`** - Falls back to parameter on first call
4. ✅ **Parse from current content** - Always use the most recent document state for section offsets
5. ✅ **Replace in current content** - Use current offsets with current document

### Implementation

#### 1. Added Streaming Content Reference

```typescript
// Track the most recent document content during streaming to avoid stale closures
// This ref is updated immediately after each replacement so the next chunk sees current state
const currentStreamingContentRef = React.useRef<string>("");
```

This ref is updated **immediately** after each content replacement, before React state updates complete.

#### 2. Updated handleDocumentUpdate to Use Ref

```typescript
// Use the streaming content ref if available (updated after each chunk)
// Otherwise fall back to the parameter (first call)
const workingContent = currentStreamingContentRef.current || currentContent;

console.log("📝 Working with content:", {
  usingStreamingRef: !!currentStreamingContentRef.current,
  contentLength: workingContent.length,
  originalLength: originalSnapshot.length,
});

// ALWAYS parse sections from CURRENT content to get accurate offsets
const sections = parseMarkdownSections(workingContent);
```

#### 3. Update Ref After Each Replacement

**Section Mode:**

```typescript
// Replace within the CURRENT working content
const newMarkdown = replaceSectionContent(
  workingContent,
  currentSection,
  newSectionContent,
);

// CRITICAL: Update the streaming content ref IMMEDIATELY
// This ensures the next streaming chunk sees the updated content
currentStreamingContentRef.current = newMarkdown;

// Then persist to workspace state
setDocumentContent(activeProject, activeDocument, newMarkdown);
```

**Full Document Mode:**

```typescript
const newContentMarkdown = `${preservedBeforeSelectionRef.current}${aiResponse.trim()}${preservedAfterSelectionRef.current}`;

// Update streaming ref immediately
currentStreamingContentRef.current = newContentMarkdown;

if (activeProject && activeDocument) {
  setDocumentContent(activeProject, activeDocument, newContentMarkdown);
}
```

#### 4. Cleanup on Operation Complete

```typescript
const cleanupTimeout = setTimeout(() => {
  // Cleanup refs
  operationOriginalContentRef.current = "";
  operationOriginalSectionsRef.current = [];
  currentStreamingContentRef.current = ""; // ← Clear streaming ref
  streamingInitializedRef.current = false;
  setSelectionRange(null);
}, 500);
```

## Why This Works

### Ref vs State for Streaming

**React State (`documentContent`):**

- Updates asynchronously
- Causes re-renders
- Closures capture stale values

**React Ref (`currentStreamingContentRef`):**

- Updates synchronously
- No re-renders
- Always provides current value
- ✅ Perfect for tracking mutable state during streaming

### The Critical Sequence

```
Chunk 1:
  1. Read: workingContent = currentStreamingContentRef.current || currentContent
     → Gets original content (ref is empty)
  2. Parse sections from original content
  3. Replace section content → newMarkdown
  4. UPDATE REF: currentStreamingContentRef.current = newMarkdown ← KEY!
  5. Call setDocumentContent (async)

Chunk 2 (arrives while state update pending):
  1. Read: workingContent = currentStreamingContentRef.current || currentContent
     → Gets Chunk 1's newMarkdown (ref is updated!) ← KEY!
  2. Parse sections from Chunk 1's content ← Correct offsets!
  3. Replace section content → newer markdown
  4. UPDATE REF: currentStreamingContentRef.current = newer markdown
  5. Call setDocumentContent (async)

Chunk 3:
  1. Read: workingContent = currentStreamingContentRef.current
     → Gets Chunk 2's markdown ← Always current!
  ...continues correctly
```

## Before vs After

### Before (Broken)

```typescript
// ❌ Stale closure - currentContent never updates during streaming
const currentContent = documentContent?.[documentKey] || "";

handleDocumentUpdate(
  message.content,
  activeWorkspaceSection,
  currentContent, // ← Captured once, stays stale
  documentKey,
  selectionRange,
);
```

### After (Fixed)

```typescript
// ✅ Use ref that updates immediately after each chunk
const workingContent = currentStreamingContentRef.current || currentContent;

// Parse from current state
const sections = parseMarkdownSections(workingContent);

// Replace in current state
const newMarkdown = replaceSectionContent(workingContent, section, content);

// Update ref IMMEDIATELY (before async state update)
currentStreamingContentRef.current = newMarkdown;
```

## Testing

To verify the fix:

1. **Test Section Expansion:**
   - Open a workspace document with multiple sections
   - Click "Expand" on a section that's NOT the last one
   - Verify:
     - ✅ Content appears only once (no duplication)
     - ✅ Content after the expanded section is preserved
     - ✅ All sections remain in correct order

2. **Test Streaming Updates:**
   - During generation, watch the section update in real-time
   - Verify each streaming chunk builds on the previous one
   - No content loss between chunks

3. **Test Multiple Operations:**
   - Expand one section
   - Then expand another
   - Verify each operation starts fresh with correct content

## Key Insights

### Why Refs Are Essential for Streaming

In streaming scenarios with rapid sequential updates:

- **State updates are async** → Multiple chunks can arrive before state updates complete
- **Closures capture stale values** → Callbacks see old state
- **Refs provide synchronous access** → Always get the latest value
- **No re-renders needed** → Updates happen immediately

### The Lesson

When implementing streaming or rapid sequential operations:

1. Use refs to track mutable state that changes faster than React re-renders
2. Update refs immediately after mutations
3. Use refs as the source of truth for dependent operations
4. Let state updates happen async for UI updates

## Related Files

- `/apps/pro-web/lib/hooks/use-workspace-chat.tsx` - Main streaming logic (fixed)
- `/apps/pro-web/lib/markdown-utils.ts` - Section parsing and replacement utilities
- `/apps/pro-web/components/routes/workspace/workspace-content.tsx` - UI component

## Related Fixes

1. **Hydration race condition** - Prevented state overwrites during updates
2. **Section offset drift** - Fixed by parsing from current content
3. **Stale closure** - Fixed with currentStreamingContentRef (this fix)

All three issues combined to cause the duplication and content loss problems.
