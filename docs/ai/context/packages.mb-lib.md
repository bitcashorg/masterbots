# Masterbots Package, Library Structure: mb-lib

## package.json

```json
{
  "name": "mb-lib",
  "private": true,
  "version": "0.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "license": "MIT",
  "scripts": {},
  "dependencies": {
    "jose": "^5.1.3",
    "lodash": "^4.17.21",
    "mb-types": "workspace:*"
  },
  "devDependencies": {
    "@types/jsonwebtoken": "^9.0.5",
    "@types/lodash": "^4.14.195",
    "eslint": "^8.15.0",
    "tsconfig": "workspace:*",
    "typescript": "^5.1.3"
  }
}
```

## tsconfig.json

```json
{
  "extends": "tsconfig/react-library.json",
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

## src/index.ts

```typescript
export * from './text'
export * from './error'
export * from './hasura'
export * from './jwt'
export * from './platform'
export * from './fetch'
```

### src/error/error.lib.ts

```typescript
// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
export type ErrorWithMessage = {
  message: string
}

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}
```

### src/error/index.ts

```typescript
export * from './error.lib'
```

### src/fetch/fetch.lib.ts

```typescript
// ! fetchJson not working: TypeError: FetchError Not Found
// TODO: Fix for better error handling
export async function fetchJson(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init)
  if (!response.ok) {
    const error = new Error(response.statusText)
    throw error
  }
  return response.json()
}
```

### src/fetch/index.ts

```typescript
export * from './fetch.lib'
```

### src/hasura/hasura.lib.ts

```typescript
export async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
) {
  const result = await fetchJson(
    'https://your-hasura-instance/v1/graphql',
    {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': 'your-secret-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  )

  if (result.errors) {
    throw new Error(result.errors.map((error: any) => error.message).join("\n"))
  }

  return result.data
}
```

### src/hasura/index.ts

```typescript
export * from './hasura.lib'
```

### src/jwt/index.ts

```typescript
export * from './jwt.lib'
export * from './jwt.type'
```

### src/jwt/jwt.lib.ts

```typescript
import { SignJWT, jwtVerify } from 'jose'
import { getErrorMessage } from '../error'
import { JwtSecret, TokenLibGetTokenParams, TokenLibRefreshTokenParams } from './jwt.type'

export async function getToken({
  user,
  jwtSecret,
  jwtExpiration = '2h',
}: TokenLibGetTokenParams) {
  try {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + jwtExpiration
    const payload = { ...user, iat, exp }

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: jwtSecret.type })
      .setIssuedAt()
      .setExpirationTime(jwtExpiration)
      .sign(jwtSecret.key)

    return jwt
  } catch (error) {
    console.error("Error creating token:", getErrorMessage(error))
    throw error
  }
}

export async function refreshToken({
  token,
  jwtSecret,
  jwtExpiration = '2h',
}: TokenLibRefreshTokenParams) {
  try {
    const { payload } = await jwtVerify(token, jwtSecret.key)
    const newToken = await getToken({ user: payload, jwtSecret, jwtExpiration })
    return newToken
  } catch (error) {
    console.error("Error refreshing token:", getErrorMessage(error))
    throw error
  }
}

export function isTokenExpired(token: string, jwtSecret: JwtSecret) {
  try {
    const { payload } = jwtVerify(token, jwtSecret.key)
    const currentUnixTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentUnixTime
  } catch (error) {
    console.error("Error checking token expiration:", getErrorMessage(error))
    return true
  }
}
```

### src/jwt/jwt.type.ts

```typescript
export interface TokenLibGetTokenParams {
  user: { role: string; account: string }
  jwtSecret: JwtSecret
  jwtExpiration?: number
}

export interface TokenLibRefreshTokenParams {
  token: string
  jwtSecret: JwtSecret
  jwtExpiration?: number
}

export interface JwtSecret {
  type: 'HS256' | 'HS238' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'Ed25519'
  key: string
  jwk_url?: string
  claims_namespace: string
  claims_namespace_path?: string
  claims_format?: string
  audience?: string
  issuer?: string
  claims_map?: string
  allowed_skew?: string
  header?: string
}
```

### src/platform/index.ts

```typescript
export * from './platform'
```

### src/platform/platform.ts

```typescript
export const platform = (() => {
  const isBrowser = typeof window !== 'undefined'
  const userAgent = isBrowser ? window.navigator.userAgent : ''
  const isAndroid = /(Android)/i.test(userAgent)
  const isPhone = /(iPhone|iPod)/i.test(userAgent)
  const isIpad = /(iPad)/i.test(userAgent)
  const isMobile = isPhone || isAndroid

  return {
    userAgent,
    isBrowser,
    isNode: !isBrowser,
    isPhone,
    isIpad,
    isMobile,
  }
})()
```

### src/text/index.ts

```typescript
export * from './text.lib'
```

### src/text/text.lib.ts

```typescript
/**
 * Return a slugified copy of a string.
 *
 * @param {string} str The string to be slugified
 * @return {string} The slugified string.
 */
export function toSlug(str: string): string {
  let s = str
  if (!s) {
    return ""
  }
  s = s.toLowerCase().trim()
  s = s.replace(/ & /g, " and ")
  s = s.replace(/[ ]+/g, "-")
  s = s.replace(/[-]+/g, "-")
  s = s.replace(/[^a-z0-9-]+/g, "")
  return s
}
```
