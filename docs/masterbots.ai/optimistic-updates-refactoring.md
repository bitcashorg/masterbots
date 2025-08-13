# Optimistic Updates Refactoring

## Overview

This refactoring addresses the delay and misleading states in optimistic updates when submitting new messages to threads. The new system provides immediate UI feedback, better error recovery, and server-side caching for disconnection scenarios.

## Key Improvements

### 1. Immediate Optimistic Updates

**Before:** Optimistic messages had delays showing in the UI, creating misleading states.

**After:** Messages appear instantly in the UI when submitted, providing immediate feedback to users.

```tsx
// Message appears instantly when user clicks send
const optimisticMessageId = optimisticActions.addOptimisticMessage(
  cleanedContent,
  threadId,
);

// UI shows the message immediately while processing happens in background
```

### 2. Enhanced State Management

**New State Transitions:**

- `optimistic` → `sending` → `sent` | `failed`
- Clear visual feedback for each state
- Automatic retry mechanisms for failed messages

### 3. Server-Side Caching

**Problem Solved:** Users losing their input during disconnections or errors.

**Solution:** Automatic caching of user prompts with recovery mechanisms:

```tsx
// Cache immediately when user submits
const cacheId = serverCache.cachePrompt(cleanedContent, threadId);

// Automatic retry using cached content
optimisticActions.registerRetryCallback(optimisticMessageId, async () => {
  const cachedPrompt = serverCache.getCachedPrompt(cacheId);
  if (cachedPrompt) {
    await appendWithMbContextPrompts(
      {
        ...userMessage,
        content: cachedPrompt.content,
      },
      chatRequestOptions,
    );
  }
});
```

### 4. Better Error Recovery

- Visual error indicators with retry buttons
- Automatic cleanup of expired optimistic messages
- Detailed error messages for debugging
- Graceful fallback to cached inputs

## Architecture Changes

### useOptimisticChat Hook

```tsx
interface OptimisticChatState {
  pendingMessages: PendingMessage[];
  isOptimisticUpdate: boolean;
  cachedInputs: Map<string, string>;
  optimisticMessages: (Message & { id: string })[];
}

interface OptimisticChatActions {
  addOptimisticMessage: (content: string, threadId: string) => string;
  markMessageAsSending: (messageId: string) => void;
  markMessageAsSent: (messageId: string, serverMessage?: Message) => void;
  markMessageAsFailed: (messageId: string, error: string) => void;
  retryMessage: (messageId: string) => Promise<void>;
  getMergedMessages: (dbMessages: Message[]) => Message[];
  // ... other actions
}
```

### useServerCache Hook

```tsx
interface ServerCacheActions {
  cachePrompt: (content: string, threadId: string) => string;
  getCachedPrompt: (promptId: string) => CachedPrompt | undefined;
  markPromptAsSent: (promptId: string) => void;
  markPromptAsFailed: (promptId: string) => void;
  getFailedPrompts: () => CachedPrompt[];
  retryFailedPrompts: () => CachedPrompt[];
  clearCache: () => void;
  clearExpiredCache: () => void;
}
```

## UI Components

### OptimisticMessageStatus Component

Provides visual feedback for message states:

```tsx
<OptimisticMessageStatus messageId={message.id} />
```

States shown:

- **Preparing...** (with spinner) - Initial optimistic state
- **Sending...** (with spinner) - Being sent to server
- **Sent** (with checkmark) - Successfully sent
- **Failed** (with X and retry button) - Failed with retry option

## Implementation Details

### Message Flow

1. **User Submission:**

   ```tsx
   // 1. Add optimistic message (appears instantly)
   const optimisticMessageId = optimisticActions.addOptimisticMessage(
     content,
     threadId,
   );

   // 2. Cache for recovery
   const cacheId = serverCache.cachePrompt(content, threadId);

   // 3. Show popup immediately
   setIsOpenPopup(true);
   ```

2. **Processing:**

   ```tsx
   // 4. Mark as sending (show sending state)
   optimisticActions.markMessageAsSending(optimisticMessageId);

   // 5. Process message (AI improvement, validation, etc.)
   const processedThread = await processOptimisticMessage(
     userMessage,
     optimisticMessageId,
     cacheId,
   );

   // 6. Send to server
   await appendNewMessage(userMessage, chatRequestOptions);
   ```

3. **Completion:**

   ```tsx
   // 7a. Success: Replace optimistic with server message
   optimisticActions.markMessageAsSent(optimisticMessageId, serverMessage);

   // 7b. Failure: Mark failed and enable retry
   optimisticActions.markMessageAsFailed(optimisticMessageId, error.message);
   ```

### Error Handling Strategy

```tsx
try {
  // Process and send message
  await appendNewMessage(userMessage, chatRequestOptions);
} catch (error) {
  // Mark optimistic message as failed
  optimisticActions.markMessageAsFailed(optimisticMessageId, error.message);

  // Mark cache as failed for potential retry
  serverCache.markPromptAsFailed(cacheId);

  // Show user-friendly error with retry option
  customSonner({
    type: "error",
    text: "Failed to send message. You can retry from the message menu.",
  });
}
```

### Auto-cleanup

```tsx
// Automatic cleanup of expired optimistic messages (5 minutes)
useEffect(() => {
  const cleanup = () => {
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;

    // Remove messages older than 5 minutes
    setState((prev) => ({
      optimisticMessages: prev.optimisticMessages.filter((msg) => {
        const messageTime = new Date(msg.createdAt).getTime();
        return messageTime > fiveMinutesAgo;
      }),
    }));
  };

  const interval = setInterval(cleanup, 60000);
  return () => clearInterval(interval);
}, [setState]);
```

## Benefits

1. **Better UX:** Messages appear instantly, no delays
2. **Error Resilience:** Automatic retry with cached inputs
3. **Network Resilience:** Works offline and recovers on reconnection
4. **Clear Feedback:** Users always know the status of their messages
5. **Reduced Support:** Fewer "my message disappeared" issues
6. **Performance:** Optimized state updates and message merging

## Testing

To test the optimistic updates:

1. **Normal Flow:**
   - Send a message
   - Verify it appears instantly
   - Check state transitions: optimistic → sending → sent

2. **Error Scenarios:**
   - Disconnect network during send
   - Verify cached message is retained
   - Reconnect and verify retry works

3. **Edge Cases:**
   - Multiple rapid messages
   - Page refresh during sending
   - Long content messages

## Migration Notes

- All existing message handling continues to work
- Optimistic messages are seamlessly integrated
- No breaking changes to existing components
- Server-side caching is transparent to users
- Error states are automatically managed

The refactoring maintains backward compatibility while significantly improving the user experience around message submission and error recovery.
