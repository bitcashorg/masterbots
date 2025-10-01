# Next Session Action Plan: Fix Workspace Document Upload

## Problem Summary

When creating a document in workspace mode and sending the first message, the document remains showing as "Draft" in the UI instead of being properly associated with the thread. This indicates the document upload and thread metadata update is not happening correctly.

## Root Cause Analysis

The issue is architectural - document upload logic was incorrectly placed in `use-mb-chat.tsx` `onFinish` function, which creates timing issues because:

1. **Workspace state** (`activeProject`, `activeDocument`, etc.) lives in `use-workspace.tsx`
2. **Thread creation** happens in `use-mb-chat.tsx`
3. **Document upload logic** was incorrectly placed in `use-mb-chat.tsx` `onFinish`
4. By the time `onFinish` runs, workspace state may have been cleared, causing `newDocuments` array to be empty

## Correct Architecture

The document upload should be handled by the **workspace layer** (`use-workspace-chat.tsx`), not `use-mb-chat.tsx`. The workspace hooks have direct access to workspace state and can detect when a thread is created.

### Proper Flow:

1. User types in workspace → saved locally to IndexedDB
2. User sends message → thread is created in `use-mb-chat.tsx`
3. **Workspace hooks detect thread creation** → upload document → call `updateThreadDocumentsMetadata`
4. `use-thread-documents.ts` picks up changes from updated thread metadata
5. UI removes "Draft" badge as document is now associated with thread

## Changes Already Made (Keep These)

- ✅ Fixed CTA reset issue in `use-workspace-chat.tsx`
- ✅ Removed premature thread creation from `workspace-content.tsx`
- ✅ Added workspace state cleanup delay (500ms) to prevent race conditions
- ✅ Added local IndexedDB save when no active thread

## Changes Reverted (Incorrect Approach)

- ❌ Document upload logic in `use-mb-chat.tsx` (reverted)
- ❌ Manual thread metadata manipulation in `use-mb-chat.tsx` (reverted)

## Next Session Implementation Plan

### 1. Analyze Current Hook Integration

- [ ] Study `use-workspace-chat.tsx` to understand how it detects thread creation
- [ ] Examine how `use-workspace.tsx` state changes when threads are created
- [ ] Check existing thread detection patterns in workspace hooks

### 2. Implement Document Upload in Workspace Layer

- [ ] Add thread creation detection to `use-workspace-chat.tsx`
- [ ] Implement document upload logic in workspace hooks when thread is detected
- [ ] Use proper server action `updateThreadDocumentsMetadata` to update thread
- [ ] Ensure document metadata includes all required fields

### 3. Integration with use-thread-documents.ts

- [ ] Verify `use-thread-documents.ts` picks up changes from updated thread metadata
- [ ] Test that UI reflects document association (removes "Draft" badge)
- [ ] Ensure IndexedDB sync works properly

### 4. Key Files to Modify

- **Primary**: `apps/pro-web/lib/hooks/use-workspace-chat.tsx`
  - Add thread creation detection
  - Add document upload logic when thread is created
- **Secondary**: `apps/pro-web/lib/hooks/use-workspace.tsx` (if needed)
  - May need state updates for thread association

### 5. Testing Success Criteria

- [ ] Create document in workspace mode (no active thread)
- [ ] Send first message → thread should be created
- [ ] Document should immediately lose "Draft" badge
- [ ] Document should appear in thread metadata
- [ ] Document should be uploaded to bucket with proper URL
- [ ] No console errors during the process

### 6. Reference Implementation Pattern

Look at how `workspace-content.tsx` manually saves documents:

```typescript
await updateThreadDocumentsMetadata({
  threadSlug: activeThread.slug,
  documents: [
    {
      /* full document metadata */
    },
  ],
});
```

This same pattern should be used in workspace hooks when thread creation is detected.

## Key Technical Details

- Use `/api/documents/upload` endpoint (not direct `uploadWorkspaceDocument`)
- Call `updateThreadDocumentsMetadata` server action to update thread
- Ensure workspace state is available when upload happens
- Handle both new documents and content changes
- Maintain messageIds array for document-message association

## Current PR

- **PR #567**: https://github.com/bitcashorg/masterbots/pull/567
- Keep existing fixes, implement new workspace upload logic
- Test thoroughly before final deployment

## Notes

- The 500ms cleanup delay in `use-workspace-chat.tsx` should help prevent timing issues
- Document upload should happen BEFORE workspace state is cleaned up
- Use console logs during development to trace execution flow
- Focus on the workspace layer having ownership of document lifecycle
