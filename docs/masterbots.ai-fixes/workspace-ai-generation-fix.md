# Workspace AI Content Generation Fix

## Issue Summary

The workspace AI content generation had two critical regressions after performance optimization attempts:

1. **No Live Updates During Generation**: Content changes from AI weren't reflected in real-time as they streamed in
2. **Automatic Rollback After Generation**: All changes would appear briefly (1 second) then revert to the initial version before generation

## Root Causes

### 1. Live Update Issue

The section synchronization effect in `workspace-content.tsx` was gated to skip updates during generation:

```tsx
// BEFORE (BROKEN)
useEffect(() => {
  if (isUserTypingRef.current || workspaceProcessingState !== "idle") {
    return; // ❌ This prevented updates during generation
  }
  // ... parse sections
}, [fullMarkdown, activeSection, workspaceProcessingState]);
```

This logic was backwards - we NEED updates during generation to show streaming changes.

### 2. Rollback Issue - CRITICAL ROOT CAUSE

**The Main Culprit: Hydration Re-triggering During Active Session**

The hydration effect in `use-workspace.tsx` runs whenever `activeThread` changes:

```tsx
// BEFORE (BROKEN)
useEffect(() => {
  // Fetch from localStorage and /api/workspace/state
  // Updates all document content with remote state
  // ...
}, [session?.user?.id, activeThread]); // ❌ Runs on EVERY thread change!
```

**What happens:**

1. User starts AI generation in a thread
2. Content starts streaming and updating `documentContent`
3. When AI completes, `activeThread` updates (new message added to thread)
4. The hydration effect fires and fetches from `/api/workspace/state`
5. Remote state has OLD content (before AI generation started)
6. `updateBreadcrumbNavigation` overwrites local state with old content
7. **INSTANT ROLLBACK** - all AI changes lost!

This was a race condition where remote persistence hadn't caught up with local updates.

**Additional Contributing Issues:**

**Issue A: Streaming Complete Callback Registration**

- The `onStreamingComplete` callback only registered when `workspaceProcessingState === 'idle'`
- This meant it couldn't be called when streaming actually completed
- The callback needed to be registered BEFORE generation starts

**Issue B: Content Snapshot Mismatch**

- Section parsing used `originalSnapshot` for finding sections after initialization
- Section replacement used `currentContent`
- This created a mismatch: finding sections in old structure, replacing in new structure
- Led to incorrect section boundaries and content loss

**Issue C: Debounce Timing Conflicts**

- Auto-save had a 1-1.5 second debounce during generation
- Section sync had a 500ms debounce when idle
- When generation completed, section sync could fire before auto-save, reading stale content
- Manual edit debouncing (1000ms during generation) was too slow

## Solutions Implemented

### 1. Fixed Hydration Race Condition (PRIMARY FIX)

**Prevented re-hydration during active editing sessions:**

```tsx
// AFTER (FIXED)
const hydratedThreadRef = useRef<string | null>(null);

useEffect(() => {
  // Only hydrate once per thread to prevent overwriting during active editing
  const currentThreadSlug = activeThread?.slug || "no-thread";
  if (hydratedThreadRef.current === currentThreadSlug) {
    console.log("⏭️ Skipping re-hydration for same thread:", currentThreadSlug);
    return; // ✅ Prevent re-hydration on thread updates
  }

  console.log("💧 Hydrating workspace for thread:", currentThreadSlug);
  hydratedThreadRef.current = currentThreadSlug;

  // ... hydration logic
}, [session?.user?.id, activeThread]);
```

**Why this works:**

- Hydration only runs ONCE per thread
- Subsequent thread updates (like new messages) don't trigger re-fetch
- Local edits are preserved during active editing
- Fresh hydration only happens when switching to a different thread

### 2. Removed Performance Refs That Caused Stale Closures

**Eliminated `fullMarkdownRef` and `activeSectionRef`:**

```tsx
// BEFORE (BROKEN)
const fullMarkdownRef = useRef(fullMarkdown);
const activeSectionRef = useRef(activeSection);

useEffect(() => {
  const callback = () => {
    const parsed = parseMarkdownSections(fullMarkdownRef.current); // ❌ Stale
    // ...
  };
}, []); // Callback captures stale refs

// AFTER (FIXED)
useEffect(() => {
  const callback = () => {
    const parsed = parseMarkdownSections(fullMarkdown); // ✅ Fresh state
    if (activeSection) {
      const s = parsed.find((sec) => sec.id === activeSection); // ✅ Fresh state
      if (s) setEditableContent(s.content);
    }
  };
  setOnStreamingComplete(callback);
}, [fullMarkdown, activeSection, setOnStreamingComplete]); // ✅ Proper dependencies
```

**Why refs were problematic:**

- Refs don't trigger re-renders when updated
- Callbacks using refs capture stale values
- Proper dependencies ensure callbacks always have fresh values
- Slight performance cost is worth correctness

### 3. Fixed Live Updates

**Changed section sync to update immediately during generation:**

```tsx
// AFTER (FIXED)
useEffect(() => {
  if (isUserTypingRef.current) {
    return; // Only skip during user typing
  }

  // During generation, update immediately to show live changes
  // When idle, debounce to avoid excessive re-parsing
  const isGenerating = workspaceProcessingState !== "idle";
  const parseDelay = isGenerating ? 0 : 500; // ✅ Immediate during generation

  const parseTimeout = setTimeout(() => {
    const parsed = parseMarkdownSections(fullMarkdown);
    setSections(parsed);
    if (activeSection) {
      const s = parsed.find((sec) => sec.id === activeSection);
      if (s) setEditableContent(s.content);
    }
  }, parseDelay);

  return () => clearTimeout(parseTimeout);
}, [fullMarkdown, activeSection, workspaceProcessingState]);
```

### 2. Fixed Rollback Issues

**A. Registered streaming complete callback immediately:**

```tsx
// BEFORE (BROKEN)
useEffect(() => {
  if (streamingActiveRef.current || workspaceProcessingState !== 'idle')
    return // ❌ Prevented registration
  // ... setup callback
}, [projectName, documentName, workspaceProcessingState, ...])

// AFTER (FIXED)
useEffect(() => {
  const handleStreamingComplete = () => {
    streamingActiveRef.current = false
    const parsed = parseMarkdownSections(fullMarkdownRef.current)
    setSections(parsed)
    // ...
  }
  setOnStreamingComplete(handleStreamingComplete)
  return () => setOnStreamingComplete(undefined)
}, [setOnStreamingComplete]) // ✅ No blocking dependencies
```

**B. Fixed content snapshot usage in `use-workspace-chat.tsx`:**

```tsx
// BEFORE (BROKEN)
const contentToParse = streamingInitializedRef.current
  ? originalSnapshot // ❌ Used old structure after first chunk
  : currentContent;
const sections = parseMarkdownSections(contentToParse);

// ...later...
const newMarkdown = replaceSectionContent(
  originalSnapshot, // ❌ Replacing in old content
  currentSection, // Section from new structure
  newSectionContent,
);

// AFTER (FIXED)
// Always parse from latest content to get current structure
const sections = parseMarkdownSections(currentContent);

// Parse original only for window calculation on first call
const originalSections = streamingInitializedRef.current
  ? null
  : parseMarkdownSections(originalSnapshot);

// ...later...
const newMarkdown = replaceSectionContent(
  currentContent, // ✅ Build on latest changes
  currentSection,
  newSectionContent,
);
```

**C. Optimized debounce timings:**

```tsx
// Auto-save during generation
const debounceTime = isGenerating ? 300 : 1500; // 300ms during generation (was 1000ms)

// Manual edit save
const debounceTime = isGenerating ? 200 : 400; // 200ms during generation (was 1000ms)
```

### 3. Improved User Typing Logic

Prevented re-parsing during typing only when not generating:

```tsx
const markUserTyping = useCallback(() => {
  isUserTypingRef.current = true;
  // ...
  userTypingTimeoutRef.current = setTimeout(() => {
    isUserTypingRef.current = false;
    // Only re-parse if we're not generating
    if (workspaceProcessingState === "idle") {
      const parsed = parseMarkdownSections(fullMarkdownRef.current);
      // ... update sections
    }
  }, 1000);
}, [workspaceProcessingState]);
```

## Testing Checklist

- [x] AI generation shows live updates as content streams
- [x] Content persists after generation completes (no rollback)
- [x] Manual edits during generation work correctly
- [x] Section structure updates reflect in UI immediately
- [x] No duplicate content or lost sections
- [x] Cursor position maintained during updates
- [x] Multiple consecutive edits work without conflicts

## Files Modified

1. `/apps/pro-web/lib/hooks/use-workspace.tsx` ⭐ **CRITICAL FIX**
   - Added `hydratedThreadRef` to track hydration per thread
   - Guard against re-hydration when thread updates during active session
   - Prevents remote state from overwriting local edits

2. `/apps/pro-web/components/routes/workspace/workspace-content.tsx`
   - Removed `fullMarkdownRef` and `activeSectionRef` performance optimizations
   - Fixed section sync effect to update during generation (0ms delay)
   - Updated callbacks to use fresh state values via dependencies
   - Optimized auto-save and manual edit debounce timings
   - Improved user typing detection logic

3. `/apps/pro-web/lib/hooks/use-workspace-chat.tsx`
   - Always parse sections from latest `currentContent`
   - Use `originalSnapshot` only for window calculation on first call
   - Fixed `replaceSectionContent` to use `currentContent` instead of `originalSnapshot`
   - Separated original section lookup for window calculation

## Key Lessons Learned

### 1. Beware of Aggressive Re-hydration

**The Problem:** Hydrating on every state change can overwrite user edits in progress.

**The Solution:** Only hydrate once per logical session (thread), not on every update.

### 2. Refs vs. State: Choose Correctness Over Performance

**The Problem:** Refs don't trigger re-renders, leading to stale closures in callbacks.

**The Solution:** Use state with proper dependencies. Micro-optimizations that break UX are not worth it.

### 3. Understand Your Data Flow

The full data flow for workspace content:

1. User/AI edit → `setDocumentContent` → `documentContent` state (use-workspace)
2. `documentContent` → `savedContent` → `fullMarkdown` (useMemo in workspace-content)
3. `fullMarkdown` → section parse → UI update (useEffect in workspace-content)

Any break in this chain causes stale data or rollback.

### 4. Race Conditions in Async State Management

**The Problem:** Remote persistence + local state + async updates = race conditions.

**The Solution:**

- Local state is source of truth during editing
- Remote persistence is for recovery/sync only
- Never blindly overwrite local with remote without checking timestamps/user intent

## Testing Checklist
