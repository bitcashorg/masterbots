# Pro Workspace Performance Roadmap

Status: draft
Owner: Workspace Editor
Last updated: 2025-09-03

## Context

Navigation became slow and the workspace grew expensive (large re-renders, frequent parsing, global store writes). We optimized streaming and state flow to keep the UI snappy while maintaining live updates.

## What’s implemented

- Full-document state derived from store
  - fullMarkdown is derived via `useMemo(() => savedContent ?? initialContent)` so UI follows the workspace/state source of truth.

- Streaming throttling and single-commit finalize
  - Live AI streaming updates only patch the active section’s visible text with a 50 ms throttle.
  - No store writes during streaming; we splice the streamed content into the full document and persist once when streaming ends.

- Editor responsiveness
  - Source view uses a local `sourceValue` synced to `fullMarkdown` for smooth typing; saves are debounced.

## Goals

- Keep streaming updates live and responsive.
- Minimize global re-renders during streaming.
- Defer non-critical work (server cache, IndexedDB, parsing) until streaming ends or idle windows.
- Memoize selectively to reduce wasted renders without over-memoizing.

## Next steps (prioritized)

- [ ] Persist scheduler (debounce + rate limit)
  - Single utility to debounce `setDocumentContent` calls (e.g., 400–600 ms) and optionally cap to N calls/min per documentKey.
  - Always bypass during active streaming; run once on finalize.

- [ ] Pause non-critical writes during streaming
  - [ ] Server cache: disable updates while `isLoading` is true; commit once on finalize.
  - [ ] IndexedDB: postpone writes during streaming and only write on manual Save or finalize.

- [ ] Memoize expensive UI
  - [ ] `WorkspaceSectionTree` rows via `React.memo` with stable keys.
  - [ ] Stable callbacks with `useCallback` for tree item handlers to avoid child re-renders.
  - [ ] Keep `buildSectionTree(sections)` under `useMemo` (already in place) and ensure `sections` identity changes only when actual content changes.

- [ ] Parsing and rendering cost
  - [ ] Debounce `parseMarkdownSections` during typing (~100–150 ms).
  - [ ] Use `startTransition` around `setSections(parseMarkdownSections(...))` for non-urgent updates.
  - [ ] Consider `useDeferredValue(fullMarkdown)` in source view for very large documents.

- [ ] Frame-coalesced streaming updates
  - [ ] Optionally batch visual updates with `requestAnimationFrame` besides the 50 ms throttle for extra smoothness on large sections.

- [ ] Diagnostics
  - [ ] Add React Profiler traces and measure render counts for sidebar and editor during streaming.
  - [ ] Add performance marks around finalize (splice + parse) to track duration.

- [ ] UX polish
  - [ ] Avoid toasts/logging in the hot streaming path.
  - [ ] Show lightweight inline “Generating…” state without blocking scroll/click.

- [ ] Edge cases
  - [ ] Switching sections mid-stream: keep streaming to the original section or auto-switch with explicit UX.
  - [ ] Undo/redo compatibility: ensure streamed edits are grouped logically and selection persists.

## Implementation notes

- Throttling
  - Use a simple timestamp + `setTimeout` (50 ms) to throttle active section text updates.
  - Clear throttle timeout and reset timestamps on finalize.

- Finalize-on-end
  - On `isLoading` → false, splice `editableContent` into `fullMarkdown` via `replaceSectionContent`, re-parse once, and call `setDocumentContent` once.

- Rate limiting (optional)
  - Maintain per-documentKey counters/timestamps in a module-local map; drop or delay calls if exceeding configured quota.

## Guardrails

- Avoid over-memoization: add memos only when inputs are stable and rendering is proven hot via profiling.
- Keep streaming path free of network/IO work.
- Prefer a single source of truth for the document (store → fullMarkdown) and derive view state from it.

## Done checklist (running)

- [x] Use `useMemo` for `fullMarkdown` derived from `savedContent`.
- [x] Throttle streaming UI updates and commit once at the end.
- [x] Debounced saves for source view typing.
- [x] Fix debouncedSaveFullSource to use stable function reference.

## References

- Files: `apps/pro-web/components/routes/workspace/workspace-content.tsx`, `workspace-text-editor.tsx`, `lib/hooks/use-workspace-chat.tsx`.
- Utils: `parseMarkdownSections`, `replaceSectionContent`.
