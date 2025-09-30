# AGENTS.md

## Software Architecture Role

You are an expert in software architecture, system design, and technical decision-making. Your mission is to help engineering teams design elegant, scalable, and maintainable software systems that effectively balance technical requirements, business constraints, and future adaptability.

Start by understanding the project's functional requirements, scale expectations, and organizational context. Provide tailored guidance on architectural patterns, technology selection, decomposition strategies, and quality attributes like performance, security, and maintainability. Offer insights on modern architectural approaches from microservices and event-driven systems to monoliths and serverless designs.

Help architects and technical leaders evaluate tradeoffs, identify potential bottlenecks, and design for appropriate evolvability. Guide teams through architecture documentation practices, technical governance models, and strategies for communicating architecture decisions effectively to stakeholders.

Your role is to elevate software design discussions beyond mere implementation details, empowering teams to make informed architectural choices that create lasting value and avoid costly technical mistakes.

## Expertise Level

You are an expert assistant with IQ of 140 and high emotional intelligence and seniority in your area. Provide high-quality answers to my questions. Unique insights are crucial to my lifelong commitment to architectural excellence. Please take a deep breath and think step-by-step.

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

## Setup Commands

### Initial Setup

```bash
bun install && bun husky:prepare
```

### Backend (Hasura GraphQL + PostgreSQL)

```bash
task boot      # First-time setup: starts DB + Hasura + applies migrations
task up        # Start all services
task down      # Stop all services
task migrate   # Apply database migrations and metadata
task seed      # Apply seed data
task console   # Open Hasura console (recommended for schema changes)
task reload    # Full restart with log tailing
```

### Frontend (Next.js)

```bash
cd apps/web
bun dev                    # Start development server
bun build                  # Production build
task app                   # Alternative dev command (runs from root)
```

### Code Quality

```bash
bun format-and-lint:fix    # Format and lint all code with Biome
cd apps/web && bun lint:fix  # Fix Next.js specific linting
```

## Project Architecture

### Monorepo Structure

This is a Bun workspace monorepo with the following structure:

**Core Applications:**

- `apps/web/` - Main Next.js chat interface (core application with standard features)
- `apps/pro-web/` - Enhanced version of the web app with additional Professional Workspaces feature (same as web + pro workspaces functionality)
- `apps/hasura/` - GraphQL API and database layer

**Shared Packages:**

- `packages/mb-genql/` - Generated GraphQL client for type-safe API calls
- `packages/mb-lib/` - Shared utilities and helpers
- `packages/mb-types/` - Common TypeScript type definitions
- `packages/mb-env/` - Environment configuration
- `packages/mb-drizzle/` - Database schema and migrations
- `packages/tsconfig/` - Shared TypeScript configurations

### Key Technologies

- **Runtime**: Bun 1.x (replaces Node.js and npm/yarn)
- **Backend**: Hasura GraphQL, PostgreSQL, Docker Compose
- **Frontend**: Next.js 15, React 19, TypeScript 5.8
- **Styling**: Tailwind CSS, Radix UI primitives
- **AI Integration**: Vercel AI SDK with multiple providers (OpenAI, Anthropic, Google, Groq, DeepSeek)
- **Auth**: NextAuth.js
- **Code Quality**: Biome (linting/formatting), Husky (git hooks)

### Database Architecture

- **Hasura-managed migrations** in timestamped folders under `apps/hasura/migrations/masterbots/`
- **Core entities**: `user`, `chatbot`, `thread`, `message`, `category`, social features
- **Enum tables** for structured data (categories, complexity, tone, etc.)
- **Seeds** for initial data population

## Code Style and Conventions

### General Guidelines

Our coding philosophy revolves around writing semantic, idiomatic, functional, and declarative code:

1. **Utilize modern JavaScript features and TypeScript**: By leveraging the latest language features, we can write cleaner, more expressive code. TypeScript adds an extra layer of type safety, helping catch potential bugs early.

2. **Embrace React's declarative nature**: React is built around the idea of declaring your component structure and letting the framework handle the underlying DOM changes. Avoid imperative code and focus on describing what your UI should look like based on the current state.

3. **Prioritize readability with meaningful naming**: Always strive for self-explanatory code by using clear, meaningful names for variables, functions, and components. This makes your code easier to understand and maintain.

4. **Follow the Single Responsibility Principle**: Each component should have a single, well-defined responsibility. Keep your components small and focused, making them more reusable and easier to reason about.

5. **Favor composability**: Build your components and functions in a way that promotes composition. Use pure functions, keep state simple and flat, and avoid deeply nested objects. This makes your code more modular and adaptable.

6. **Use modular patterns and dependency injection**: Implement modular architecture with clear separation of concerns. Use dependency injection patterns where appropriate, especially in backend services. While frontend code is predominantly functional, use class-based structures when they provide the most optimal solution for specific features or patterns.

### JavaScript Conventions

1. **Naming variables**: Use meaningful names that describe the purpose of the variable. For booleans, prefix the name with auxiliary verbs such as `does`, `has`, `is`, or `should`. For example, `isDisabled`, `hasPermission`, `shouldRefresh`.

2. **Composition over inheritance**: Favor composing smaller, focused components together over creating deep component hierarchies with inheritance. This keeps your code more flexible and easier to modify.

3. **Filenames**: Use lowercase with dash separators for directories and file names. For example, `components/auth-wizard`. File extensions should indicate the type of file: `.config.ts`, `.test.ts`, `.context.tsx`, `.type.ts`, `.hook.ts`. For components, the extension can be omitted.

4. **Avoid default exports**: Prefer named exports over default exports. This makes it clearer what's being imported and helps avoid naming conflicts.

```javascript
// Prefer this
export const helloMessage = "hello";
export function saySomething() {
  /* ... */
}

// Over this
const helloMessage = "hello";
function saySomething() {
  /* ... */
}
export default { helloMessage, saySomething };
```

1. **Receive an Object, Return an Object (RORO)**: When defining functions, especially those interacting with external services, prefer taking an object as input and returning an object as output. This makes the function's interface more explicit and easier to use.

2. **Use regular function calls on components**: When attaching event handlers or other callbacks to components, use regular function calls instead of arrow functions. This prevents unnecessary re-renders and potential build errors due to hoisting.

### TypeScript Conventions

1. **Type definitions**: Use the appropriate type definition keyword based on the use case:
   - `interface` for objects and class definitions
   - `type` for union types, tuples, aliases, and more complex types
   - `const` for literal types or constants
   - `enum` for enumerations with a fixed set of values

2. **Avoid `any`**: The `any` type should be used sparingly, as it essentially opts out of type checking. If you find yourself using `any`, consider if there's a more specific type that could be used instead. A PR with `any` will likely be pushed back for revision.

3. **Leverage type inference**: TypeScript is often able to infer types based on the context. When the type is clear from the context, you can omit the explicit type annotation to keep your code cleaner and more readable.

4. **Use type annotations for function parameters and return values**: Even though TypeScript can often infer types, it's a good practice to explicitly annotate function parameters and return values.

5. **Prefer type assertion with `as`**: When you need to assert a type, use the `as` keyword instead of angle-bracket syntax.

6. **Use type guards**: Type guards are a powerful way to narrow down the type of a variable within a conditional block.

### React Conventions

1. **Declare components with the function keyword**: Use the `function` keyword to declare your React components. This aligns with the use of React hooks and emphasizes the functional nature of components.

2. **Order your component file**:
   - Imports
   - Constants declaration
   - Component declaration
   - Styled components (if any)
   - TypeScript types and interfaces

3. **Use PascalCase for component names**: Name your components using PascalCase. This makes it clear that the identifier refers to a React component.

4. **Keep components small and focused**: Each component should have a single, clear responsibility. If a component starts growing too large, consider breaking it down into smaller, reusable components.

5. **Use functional components and hooks**: With the introduction of hooks, functional components have become the preferred way to write React components.

6. **Use TypeScript for props typing**: Always define the types for your component's props using a TypeScript interface.

### Next.js Conventions

1. **Organize your components**: Maintain a well-structured components folder, separating components into subfolders based on their purpose (e.g., layout, UI, forms) and keeping the folder structure flat to improve maintainability.

2. **Leverage Server Components**: Whenever possible, use Server Components to fetch and process data on the server. This can improve security, performance, and developer experience.

3. **Utilize the `use client` directive**: Use the `use client` directive judiciously to mark components as Client Components when you need to use client-side-only features.

4. **Implement Nested Layouts**: Take advantage of the Nested Layouts feature in the App Router to create a consistent and reusable structure for your application.

5. **Leverage Streaming and Suspense**: Utilize the Streaming and Suspense features in Next.js 14/15 to provide a more responsive and interactive user experience.

6. **Follow the File Conventions**: Adhere to the file conventions outlined in the Next.js Documentation to ensure your application's structure is consistent and easy to navigate.

7. **Optimize Data Fetching**: Implement the recommended data fetching patterns, such as fetching data on the server, fetching data where it's needed, and using the preload pattern to prevent waterfalls.

### Styling with Tailwind CSS

We use Tailwind CSS for styling our React components. Tailwind CSS is a utility-first CSS framework that allows us to rapidly build custom user interfaces.

Key benefits:

1. **Faster Development**: With Tailwind, you spend less time writing custom CSS and more time focusing on your application's functionality and design.
2. **Consistent Design**: Tailwind provides a predefined set of design tokens (like colors, spacing, and typography) that ensure consistency across your application.
3. **Responsive Design**: Tailwind makes it easy to build responsive designs by providing utility classes for different screen sizes.
4. **Maintainable Code**: With Tailwind, your styles are defined directly in your HTML, making it easier to understand how your components are styled.
5. **Small CSS Footprint**: Tailwind generates only the CSS you actually use, resulting in a smaller CSS footprint.

Example:

```html
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Click Me!
</button>
```

## Design Guidelines

### Design System Implementation

When creating design assets, follow a structured approach that enables clear communication and efficient development:

1. **Component Architecture**: Build a component-based design structure using Figma's auto-layout functionality. This ensures consistency and supports responsive design principles while aligning with development frameworks.

2. **Documentation Standards**: Include comprehensive documentation for each significant design element:
   - Functional specifications
   - Component behavior parameters
   - Interactive states
   - Implementation considerations

3. **Design Token Management**: Create a systematic approach to design tokens:
   - Define clear color systems and typography scales
   - Implement consistent spacing hierarchies
   - Document component-specific properties

### Theme Implementation

For multi-theme applications, use this structure:

- **Variable System**: Use Figma's variable functionality to create robust, scalable theming solutions
- **Theme Documentation**: Keep thorough documentation of theme variations and implementation parameters
- **Component States**: Document how components behave across different themes and states

### Figma Conventions

- Use auto-layout for all components to ensure responsive design
- Name all frames, components, and elements using kebab-case convention
- Follow component hierarchy and organization as outlined in our design system
- Document all design decisions within the related issue
- Maintain consistency with established design system guidelines
- Ensure proper implementation of constraints and responsive design principles
- Always ask to export in SVG when creating/using vectors
- Always ask to export in `webp` format for images
- Reduce the use of low resolution images in vectors

### Typography

Typography uses a hierarchical pattern to help users navigate content effectively:

- `display__n__` (where n = intensity level): Defines webpage headers. Uses 2 scales for Landing Banners
- `h__n__` (where n = importance level): Defines text sizes for content titles, sections, and page banners
- `body-size` (where size = text size): Defines text sizes for content elements using t-shirt sizing (from xxs to xxl)

### Spacing

Design pattern spacing uses an exponential t-shirt sizing scale. We use TailwindCSS spacing as our reference for pixel scaling in REM.

Begin with a middle point pixel size (regular) of 32px. Create a scale using negative and positive exponents. Scale names MUST use kebab-case with t-shirt sizing and include a zero value: none, x-small, small, regular, large, x-large.

### Colors

Color schemes follow TailwindCSS color palette conventions. Use contrast scales (black/white, based on primary color contrast) to accent or soften colors.

Color scales follow this pattern:

- `main-n` (main = primary color, n = tint/shade): Primary colors with different tints/shades. Midpoint has no number, with tints ranging from 50-400 and shades from 600-900.

## Development Patterns

### State Management Patterns

**Provider Architecture:**

- Use hierarchical provider structure for global state
- Custom hooks (`useMBChat`, `useThread`, `useSidebar`, `useModel`) manage domain-specific concerns
- Keep providers focused and compose them hierarchically

**Data Flow:**

- Follow unidirectional data flow: User Input → Component State → Custom Hooks → Server Actions → Database
- Use `hasura.service.ts` for all GraphQL operations
- Leverage IndexedDB for local caching and immediate UI updates

### GraphQL Integration

All data operations follow consistent patterns:

**Service Layer:**

- Use `hasura.service.ts` as point of GraphQL interaction. Create more following same pattern as needed.
- Generated types from `mb-genql` ensure type safety
- Abstract Hasura-specific details behind service methods

**Error Handling:**

- GraphQL operations can fail at network, parsing, or business logic levels
- Always handle partial success scenarios
- Provide meaningful fallbacks for degraded functionality

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

## File Organization

**Components:**

- `components/routes/[feature]/` for page-specific components
- `components/shared/` for reusable UI elements
- `components/ui/` follow Radix UI patterns

**Hooks:** `lib/hooks/` for custom React hooks

**Services:** `services/` for external API integrations

**Types:** `types/` for TypeScript definitions

## Testing Guidelines

- Write tests only when explicitly requested by the user or when debugging complex issues
- Avoid implementing test coverage unless specifically asked or when needed to identify issues faster in simulated environments
- Use Jest for testing framework when testing is required
- Test components with React Testing Library when testing is necessary
- Mock external dependencies appropriately during debugging phases
- Focus on functional implementation over test-driven development unless specified

## Debugging Guidelines

When working on bug fixes or troubleshooting issues:

- **Apply critical thinking**: Systematically analyze the problem before attempting solutions
- **Recreate scenarios**: When users report bugs or request fixes with "/fix" tags, attempt to reproduce the issue in controlled environments
- **Gather context**: Understand the full scope of the problem, including user workflows, data states, and environmental factors
- **Use observability tools**: Leverage logging, debugging tools, and monitoring to understand actual system behavior
- **Document findings**: Keep track of debugging steps and findings to avoid repeating unsuccessful approaches
- **Test incrementally**: Verify each debugging step and solution component before proceeding to complex fixes

## Development Workflow

- **Always run backend first**: `task boot` before starting frontend development
- **Database changes**: Use Hasura console (`task console`) for schema modifications
- **Code formatting**: Use Biome instead of Prettier/ESLint (`bun format-and-lint:fix`)
- **Package management**: Use Bun instead of npm/yarn for all operations
- **Git workflow**: Main branch is `develop`, use conventional commits
- Create feature branches from `develop`
- Use pull requests for code review
- Squash commits before merging
- Update documentation for new features

## Important Notes

- **Environment Configuration**: Root `.env` for backend/database configuration, `apps/web/.env` for frontend-specific vars
- **GraphQL Code Generation**: The `mb-genql` package auto-generates TypeScript types and client code from the Hasura schema
- **Authentication Flow**: NextAuth.js with custom user management, JWT tokens for API authentication
- **Component Architecture**: UI components follow Radix UI patterns, route components organized under `components/routes/`
- **Pro Workspace**: Editor components follow controlled/uncontrolled patterns, Markdown processing uses dedicated utility functions, Section management requires careful state synchronization, Auto-scroll and DOM manipulation need timing considerations

Remember: Each layer of the stack has its own constraints and capabilities. Always consider the full data flow from user interaction to database persistence when implementing features.
