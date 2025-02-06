# Masterbots Package, Library Structure: mb-types

## package.json

```json
{
  "name": "mb-types",
  "private": true,
  "version": "0.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "license": "MIT",
  "scripts": {
    "lint": "eslint \"**/*.ts*\""
  },
  "devDependencies": {
    "typescript": "^5.1.3"
  },
  "dependencies": {
    "jose": "^5.1.3"
  }
}
```

## src/hasura.type.ts

```typescript
export interface HasuraClaims {
  'x-hasura-allowed-roles': string[]
  'x-hasura-default-role': string
  'x-hasura-user-id': string
}
```

## src/index.ts

```typescript
export * from './hasura.type'
export * from './jwt.type'
```

## src/jwt.type.ts

```typescript
import { HasuraClaims } from './hasura.type'
import { type JWTPayload } from 'jose';

export interface JwtUser {
  role: string
  account: string
  sessionId: string
}

export interface JwtData extends JWTPayload {
  user: JwtUser
  'https://hasura.io/jwt/claims': HasuraClaims
}
```
