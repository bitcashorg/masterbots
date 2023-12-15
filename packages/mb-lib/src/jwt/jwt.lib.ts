
import { JwtData } from 'mb-types';
import { generateHasuraClaims } from '../hasura';
import { TokenLibGetTokenParams, TokenLibRefreshTokenParams } from './jwt.type';
import { SignJWT, jwtVerify} from 'jose';

export async function sign(payload: JwtData, secret: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour

    return new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<JwtData> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    // run some checks on the returned payload, perhaps you expect some specific values

    // if its all good, return it, or perhaps just return a boolean
    return payload as unknown as JwtData;
}

export const decodeToken = async ({ token, secret }: { token: string; secret: string }) => {
  if (!token) throw new Error('Invalid token')

  try {
    const decodedToken = await verify(token.replace('Bearer ', ''), secret)
    console.log('decodedToken - verify Token', decodedToken)
    return decodedToken
  } catch (error) {
    console.error(error)
    throw new Error('Invalid token')
  }
}

// export const refreshToken = async ({ token, jwtSecret, jwtExpiration = 86400 }: TokenLibRefreshTokenParams) => {
//   if (!token) return new Error('Invalid token')

//   try {
//     // throws error if token is invalid
//     const decodedToken = await decodeToken({ token: token.replace('Bearer ', ''), secret: jwtSecret })
//     return getToken({ user: decodedToken.user, jwtSecret, jwtExpiration })
//   } catch (error) {
//     console.error(error)
//     throw new Error('Invalid token')
//   }
// }

export const getToken = async ({ user, jwtSecret, jwtExpiration = 86400 }: TokenLibGetTokenParams) => {
  try {
    const claims = await generateHasuraClaims(user)

    return sign(
      {
        user: {
          role: user.role,
          account: user.account,
          sessionId: 'unset',
        },
        'https://hasura.io/jwt/claims': claims,
      },
      jwtSecret.key
    )
  } catch (error) {
    console.log('getTokenSession Error', error)
    throw new Error('Cannot generate token')
  }
}