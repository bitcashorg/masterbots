# Masterbots Package, Library Structure: mb-env

## package.json

```json
{
  "name": "mb-env",
  "version": "0.0.1",
  "private": true,
  "description": "masterbots environment data",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {},
  "author": "bitcash.org",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "tsconfig": "workspace:*",
    "typescript": "^5.1.3"
  }
}
```

## tsconfig.json

```json
{
  "extends": "tsconfig/react-library.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "tsup.config.ts"],
  "exclude": ["node_modules"]
}
```

## src/endpoints.env.ts

```typescript
export const endpoints = {
  prod: 'https://api.masterbots.ai/v1/graphql',
  test: 'https://dev-api.masterbots.ai/v1/graphql',
  local: 'http://localhost:8080/v1/graphql',
}
```

## src/env.type.ts

```typescript
const validEnvs = ['prod', 'test', 'local'] as const;

export type MbEnv = typeof validEnvs[number];

export function validateMbEnv(env: string | undefined): MbEnv {
    if (!env || !validEnvs.includes(env as MbEnv)) {
        throw new Error(`Invalid app environment: ${env}`);
    }

    return env as MbEnv;
}
```

## src/index.ts

```typescript
export * from './endpoints.env'
export * from './env.type'
```
