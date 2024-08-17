# Masterbots Package, Library Structure: mb-genql

## .env-sample

```plaintext
# Sample environment variables file
API_URL=https://your-api-url.com
API_KEY=your-api-key
```

## package.json

```json
{
  "name": "mb-genql",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "bun build src/index.ts --outdir dist"
  },
  "dependencies": {
    "genql": "^2.0.0"
  },
  "devDependencies": {}
}
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts", "generated/**/*.ts"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

## generated/index.ts

```typescript
export * from './schema';
export * from './types';
export * from './runtime';
```

### generated/schema.graphql

```graphql
type Query {
  getUser(id: ID!): User
}

type User {
  id: ID!
  name: String!
  email: String!
}
```

### generated/schema.ts

```typescript
export const schema = `
  type Query {
    getUser(id: ID!): User
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
  }
`;
```

### generated/types.ts

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}
```

### generated/runtime/batcher.ts

```typescript
// Placeholder for batcher implementation
export class Batcher {
  // Implementation details
}
```

### generated/runtime/createClient.ts

```typescript
// Placeholder for createClient implementation
export function createClient() {
  // Implementation details
}
```

### generated/runtime/error.ts

```typescript
// Placeholder for error handling implementation
export class GraphQLError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GraphQLError';
  }
}
```

### generated/runtime/fetcher.ts

```typescript
// Placeholder for fetcher implementation
export class Fetcher {
  // Implementation details
}
```

### generated/runtime/generateGraphqlOperation.ts

```typescript
// Placeholder for generating GraphQL operations
export function generateGraphqlOperation() {
  // Implementation details
}
```

### generated/runtime/index.ts

```typescript
export * from './batcher';
export * from './createClient';
export * from './error';
export * from './fetcher';
export * from './generateGraphqlOperation';
export * from './linkTypeMap';
export * from './types';
export * from './typeSelection';
```

### generated/runtime/linkTypeMap.ts

```typescript
// Placeholder for link type map implementation
export const linkTypeMap = {
  // Implementation details
};
```

### generated/runtime/types.ts

```typescript
// Placeholder for types implementation
export type GraphQLResponse = {
  data: any;
  errors?: Array<{ message: string }>;
};
```

### generated/runtime/typeSelection.ts

```typescript
// Placeholder for type selection implementation
export class TypeSelection {
  // Implementation details
}
```

## scripts/local.sh

```bash
#!/bin/bash
# Local development script
bun build src/index.ts --outdir dist
bun run start
```

## scripts/prod.sh

```bash
#!/bin/bash
# Production build script
bun build src/index.ts --outdir dist --minify
bun run start
```

## scripts/test.sh

```bash
#!/bin/bash
# Test script
bun test
```

## src/index.ts

```typescript
import { Client, createClient } from '../generated'
import { GraphqlOperation } from '@genql/runtime'
import { endpoints, MbEnv } from 'mb-env'
import { createClient as createWsClient, Client as WsClient } from 'graphql-ws'

export * from '../generated'

// Server side client
export function createMbClient({ config, jwt, env, adminSecret, debug }: GraphQLSdkProps = {}): MbClient {
  const { subscribe } = createWsClient({
    url: endpoints[env || 'prod'].replace('http', 'ws'),
  })

  const client = createClient({
    fetcher: async (operation: any) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        ...(adminSecret ? { 'x-hasura-admin-secret': adminSecret } : {}),
      }

      debug && console.log(
        '\n ==> GraphQL Query : \n',
        JSON.stringify((operation as GraphqlOperation).query.replaceAll('"', ''))
      )

      let fetchResponse
      try {
        fetchResponse = fetch(endpoints[env || 'prod'], {
          method: 'POST',
          headers,
          body: JSON.stringify(operation),
          ...config,
        }).then((response) => response.json())
      } catch (error) {
        console.error('Error in graphql fetcher', error)
      }

      return fetchResponse
    },
  })

  return {
    subscribe,
    ...client,
  }
}

export interface MbClient extends Client {
  subscribe: WsClient["subscribe"]
}

type GraphQLSdkProps = {
  config?: RequestInit
  jwt?: string
  env?: MbEnv
  adminSecret?: string
  debug?: boolean
}
```

### generated/runtime/parseRequest.ts

```typescript
import { Request, FieldsSelection, Scalars } from './types';
import { linkTypeMap, isScalar, isObject } from './linkTypeMap';
import { generateGraphqlOperation } from './generateGraphqlOperation';

export function parseRequest(request: Request, ctx: any, path: string[]): string {
    if (Array.isArray(request)) {
        const fields: Request | undefined = { ...request }
        delete fields.__args
        const argNames = Object.keys(args)

        if (argNames.length === 0) {
            return parseRequest(fields, ctx, path)
        }

        const field = getFieldFromPath(ctx.root, path)

        const argStrings = argNames.map((argName) => {
            ctx.varCounter++
            const varName = `v${ctx.varCounter}`

            const typing = field.args && field.args[argName] // typeMap used here, .args

            if (!typing) {
                throw new Error(
                    `no typing defined for argument \`${argName}\` in path \`${path.join(
                        '.',
                    )}\``,
                )
            }

            ctx.variables[varName] = {
                value: args[argName],
                typing,
            }

            return `${argName}:$${varName}`
        })
        return `(${argStrings})${parseRequest(fields, ctx, path)}`
    } else if (typeof request === 'object' && Object.keys(request).length > 0) {
        const fields = request
        const fieldNames = Object.keys(fields).filter((k) => Boolean(fields[k]))

        if (fieldNames.length === 0) {
            throw new Error(
                `field selection should not be empty: ${path.join('.')}`,
            )
        }

        const type =
            path.length > 0 ? getFieldFromPath(ctx.root, path).type : ctx.root
        const scalarFields = type.scalar

        let scalarFieldsFragment: string | undefined

        if (fieldNames.includes('__scalar')) {
            const falsyFieldNames = new Set(
                Object.keys(fields).filter((k) => !Boolean(fields[k])),
            )
            if (scalarFields?.length) {
                ctx.fragmentCounter++
                scalarFieldsFragment = `f${ctx.fragmentCounter}`

                ctx.fragments.push(
                    `fragment ${scalarFieldsFragment} on ${
                        type.name
                    }{${scalarFields.join(' ')}}`,
                )

                return `...${scalarFieldsFragment}`
            }
        }

        return `{${fieldNames
            .map((fieldName) => {
                const value = fields[fieldName]
                const newPath = [...path, fieldName]

                if (value === false) {
                    return null
                }

                if (isScalar(value) || isObject(value)) {
                    return `${fieldName}${parseRequest(
                        value as Request,
                        ctx,
                        newPath,
                    )}`
                }

                return null
            })
            .filter(Boolean)
            .join(' ')}}`
    } else {
        return ''
    }
}

function getFieldFromPath(root: any, path: string[]) {
    return path.reduce((acc, key) => acc.fields[key], root)
}
```

### scripts/test.sh

```bash
#!/bin/bash
# Test script
bun test
```

### generated/runtime/types.ts

```typescript
// Placeholder for types implementation
export type GraphQLResponse = {
  data: any;
  errors?: Array<{ message: string }>;
};
```
