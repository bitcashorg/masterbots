# GitHub Copilot Instructions

## Development Philosophy & Environment Awareness

### Understanding Your Working Environment

Before implementing solutions, always consider the environment and tools you're working with:

**Browser/DOM Environment:**

- DOM operations are asynchronous and may require timing considerations
- Browser APIs like `scrollTo()` can be unreliable without proper fallbacks
- Always verify that DOM manipulations actually occurred (don't assume success)
- Use multiple approaches: try modern APIs first, then fallback to legacy methods
- Consider render timing - operations may need delays or `requestAnimationFrame`

**React/Component Environment:**

- State updates are asynchronous and may cause re-renders that interfere with DOM operations
- useEffect dependencies can cause infinite loops if not carefully managed
- Refs provide stable references to DOM elements across renders
- Consider component lifecycle when timing DOM operations

**General Environment Principles:**

- **Test assumptions**: Don't assume an API call worked - verify the result
- **Provide fallbacks**: Always have backup approaches for critical functionality
- **Add debugging**: Include logging to understand what's actually happening
- **Consider timing**: Many issues are timing-related, especially with async operations
- **Understand constraints**: Each environment has limitations (browser security, React lifecycle, etc.)

### Problem-Solving Approach

1. **Analyze the environment** - What tools, frameworks, and constraints are you working with?
2. **Understand the flow** - How do data, events, and updates move through the system?
3. **Identify failure points** - Where might things go wrong? What are the edge cases?
4. **Design resilient solutions** - Include error handling, fallbacks, and verification
5. **Add observability** - Include logging/debugging to understand actual behavior
6. **Test incrementally** - Verify each step works before building on it

### Implementation Guidelines

**For DOM/Browser Work:**

- Use feature detection before modern APIs
- Implement progressive enhancement (basic functionality first, enhancements after)
- Add timing delays or RAF when DOM needs to settle
- Verify operations completed successfully

**For React/State Management:**

- Minimize useEffect dependencies to prevent loops
- Use refs for values that shouldn't trigger re-renders
- Consider component lifecycle timing for DOM operations
- Separate concerns: state updates vs DOM manipulation

**For Any Environment:**

- Start with the simplest approach that could work
- Add complexity only when simple approaches fail
- Document why complex solutions are needed
- Make code readable - future developers need to understand the constraints you solved for

This approach applies whether working with databases, APIs, file systems, mobile environments, or any other development context. The key is understanding your tools and environment before implementing solutions.

## Masterbots Monorepo Architecture

### Understanding the System Architecture

The masterbots platform follows modern web application patterns with clear separation of concerns:

**Core Applications:**

- `apps/web/` - Main Next.js chat interface
- `apps/pro-web/` - Pro workspace editor (current focus)
- `apps/hasura/` - GraphQL API and database layer

**Shared Packages:**

- `packages/mb-genql/` - Generated GraphQL client for type-safe API calls
- `packages/mb-lib/` - Shared utilities and helpers
- `packages/mb-types/` - Common TypeScript type definitions
- `packages/mb-env/` - Environment configuration
- `packages/mb-drizzle/` - Database schema and migrations

### State Management Patterns

When working with the masterbots codebase, follow established patterns:

**Provider Architecture:**

- Use hierarchical provider structure for global state
- Custom hooks (`useMBChat`, `useThread`, `useSidebar`, `useModel`) manage domain-specific concerns
- Keep providers focused and compose them hierarchically

**Data Flow:**

- Follow unidirectional data flow: User Input → Component State → Custom Hooks → Server Actions → Database
- Use `hasura.service.ts` for all GraphQL operations
- Leverage IndexedDB for local caching and immediate UI updates

**Component Composition:**

- Build complex components by composing smaller, focused components
- Separate presentation from business logic
- Use custom hooks to encapsulate complex state logic

### AI Integration Environment

The platform integrates multiple AI providers with specific patterns:

**Model Management:**

- Use `getModelClientType()` to determine appropriate AI client
- Route through `ai-main-call.actions` for unified AI API handling
- Support multiple providers (OpenAI, Anthropic, etc.) through consistent interfaces

**Chat System:**

- `useMBChat` orchestrates all chat functionality
- Integrate with AI SDK's `useChat` hook for streaming responses
- Handle file attachments through hybrid storage (IndexedDB + Cloud Storage)

### GraphQL Integration

All data operations follow consistent patterns:

**Service Layer:**

- Use `hasura.service.ts` as the single point of GraphQL interaction
- Generated types from `mb-genql` ensure type safety
- Abstract Hasura-specific details behind service methods

**Error Handling:**

- GraphQL operations can fail at network, parsing, or business logic levels
- Always handle partial success scenarios
- Provide meaningful fallbacks for degraded functionality

### Development Guidelines

**File Organization:**

- Components: `components/routes/[feature]/` for page-specific components
- Shared Components: `components/shared/` for reusable UI elements
- Hooks: `lib/hooks/` for custom React hooks
- Services: `services/` for external API integrations
- Types: `types/` for TypeScript definitions

**External Documentation:**

- [DeepWiki Documentation](https://deepwiki.com/bitcashorg/masterbots) - Comprehensive system overview
- [Hasura GraphQL](https://hasura.io/docs/) - GraphQL API patterns
- [Next.js App Router](https://nextjs.org/docs/app) - Routing and server components
- [AI SDK](https://sdk.vercel.ai/docs) - AI integration patterns

**Working with Pro Workspace:**

- Editor components follow controlled/uncontrolled patterns
- Markdown processing uses dedicated utility functions
- Section management requires careful state synchronization
- Auto-scroll and DOM manipulation need timing considerations (as demonstrated in recent work)

Remember: Each layer of the stack has its own constraints and capabilities. Always consider the full data flow from user interaction to database persistence when implementing features.
