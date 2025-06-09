# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

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
cd apps/masterbots.ai
bun dev                    # Start development server
bun build                  # Production build
task app                   # Alternative dev command (runs from root)
```

### Code Quality

```bash
bun format-and-lint:fix    # Format and lint all code with Biome
cd apps/masterbots.ai && bun lint:fix  # Fix Next.js specific linting
```

## Architecture Overview

### Monorepo Structure

- **Bun workspaces** with `apps/*` and `packages/*`
- **Backend**: Hasura GraphQL Engine over PostgreSQL in `apps/hasura/`
- **Frontend**: Next.js 15 with App Router in `apps/masterbots.ai/`
- **Shared packages**: `mb-env`, `mb-genql`, `mb-lib`, `mb-types`, `mb-drizzle`, `tsconfig`

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

### Workspace Packages

- **`mb-env`**: Environment configuration management
- **`mb-genql`**: Auto-generated GraphQL client from Hasura schema
- **`mb-lib`**: Shared utilities (JWT, text processing, Hasura helpers)
- **`mb-types`**: Common TypeScript type definitions
- **`mb-drizzle`**: Alternative ORM layer with Drizzle
- **`tsconfig`**: Shared TypeScript configurations

## Development Patterns

### GraphQL Code Generation

The `mb-genql` package auto-generates TypeScript types and client code from the Hasura schema. After schema changes:

1. Update Hasura schema via console (`task console`)
2. Apply migrations (`task migrate`)
3. Regenerate GraphQL client types in `mb-genql`

### Component Architecture

- **UI components** in `components/ui/` follow Radix UI patterns
- **Route components** organized under `components/routes/`
- **Shared components** in `components/shared/`
- Components use TypeScript, Tailwind classes, and follow Next.js App Router patterns

### Environment Configuration

- Root `.env` for backend/database configuration
- `apps/masterbots.ai/.env` for frontend-specific vars
- Use `mb-env` package for typed environment access

### AI Integration

- Multiple LLM providers supported via Vercel AI SDK
- Streaming chat responses with React Server Components
- Provider selection based on user preferences and bot configurations

### Authentication Flow

- NextAuth.js with custom user management
- JWT tokens for API authentication
- User roles and subscription-based access control

## Important Notes

- **Always run backend first**: `task boot` before starting frontend development
- **Database changes**: Use Hasura console (`task console`) for schema modifications
- **Code formatting**: Use Biome instead of Prettier/ESLint (`bun format-and-lint:fix`)
- **Package management**: Use Bun instead of npm/yarn for all operations
- **Git workflow**: Main branch is `develop`, use conventional commits
- **Additional Context**: Refer to the markdown file at the [doc](doc/) directory for more details on project structure and development practices.
