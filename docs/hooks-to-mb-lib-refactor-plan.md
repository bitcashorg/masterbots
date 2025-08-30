# Hooks-to-mb-lib Refactor Plan

## Overview

Migrate shared hooks from apps to `packages/mb-lib` for better code reuse and maintainability.

## Current Hook Analysis

### Shared Hooks Identified

1. **Chat Hooks** (`apps/*/lib/hooks/`)
   - `useChat` - Chat state management
   - `useChatMessages` - Message handling
   - `useThreads` - Thread operations
   - `useChatPanel` - Panel state

2. **UI Hooks** (`apps/*/lib/hooks/`)
   - `useImageGeneration` - Image generation state
   - `useImageToggle` - Image toggle functionality
   - `useSonner` - Toast notifications
   - `useLocalStorage` - Local storage utilities

3. **Auth Hooks** (`apps/*/lib/hooks/`)
   - `useUser` - User state management
   - `useSession` - Session handling

## Proposed API Structure

### Core Chat Hooks

```typescript
// packages/mb-lib/src/hooks/chat/useChat.ts
export interface UseChatOptions {
  threadId?: string;
  initialMessages?: Message[];
  onMessageUpdate?: (messages: Message[]) => void;
}

export function useChat(options: UseChatOptions): {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
};
```

### UI State Hooks

```typescript
// packages/mb-lib/src/hooks/ui/useImageGeneration.ts
export interface UseImageGenerationOptions {
  apiEndpoint: string;
  maxRetries?: number;
}

export function useImageGeneration(options: UseImageGenerationOptions): {
  generateImage: (prompt: string) => Promise<string>;
  isGenerating: boolean;
  progress: number;
  error: Error | null;
};
```

### Storage Hooks

```typescript
// packages/mb-lib/src/hooks/storage/useLocalStorage.ts
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void, () => void];
```

## Migration Strategy

### Phase 1: Core Infrastructure

- Create `packages/mb-lib/src/hooks/` directory structure
- Set up TypeScript configuration for hooks
- Create base hook utilities and types

### Phase 2: Chat Hooks Migration

- Move `useChat` and related hooks to mb-lib
- Update import paths in both apps
- Ensure backward compatibility

### Phase 3: UI Hooks Migration

- Migrate image generation and UI state hooks
- Update component dependencies
- Test cross-app functionality

### Phase 4: Auth and Storage Hooks

- Move authentication hooks to mb-lib
- Migrate storage utilities
- Update session management

## File References

### Source Files (to be moved)

- `apps/web/lib/hooks/useChat.ts`
- `apps/web/lib/hooks/useChatMessages.ts`
- `apps/web/lib/hooks/useImageGeneration.ts`
- `apps/pro-web/lib/hooks/useChat.ts`
- `apps/pro-web/lib/hooks/useWorkspace.ts`

### Target Structure

```
packages/mb-lib/src/hooks/
├── chat/
│   ├── useChat.ts
│   ├── useChatMessages.ts
│   ├── useThreads.ts
│   └── index.ts
├── ui/
│   ├── useImageGeneration.ts
│   ├── useImageToggle.ts
│   ├── useSonner.ts
│   └── index.ts
├── storage/
│   ├── useLocalStorage.ts
│   ├── useSessionStorage.ts
│   └── index.ts
└── index.ts
```

## Breaking Changes and Migration Guide

### Import Path Changes

```typescript
// Before
import { useChat } from "@/lib/hooks/useChat";

// After
import { useChat } from "@masterbots/mb-lib/hooks";
```

### Hook API Standardization

- Consistent error handling patterns
- Standardized loading states
- Unified configuration options

## Testing Strategy

- Unit tests for each migrated hook
- Integration tests for cross-app usage
- Performance benchmarks for hook efficiency

## Timeline

- Phase 1: 1 week (infrastructure)
- Phase 2: 2 weeks (chat hooks)
- Phase 3: 1 week (UI hooks)
- Phase 4: 1 week (auth/storage hooks)
- Testing and refinement: 1 week

## Success Metrics

- Reduced code duplication between apps
- Improved hook reusability
- Consistent API patterns across hooks
- Maintained or improved performance
