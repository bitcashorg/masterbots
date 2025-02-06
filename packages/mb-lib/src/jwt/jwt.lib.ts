import { JwtData } from "mb-types";
import { generateHasuraClaims } from "../hasura";
import { JwtSecret, TokenLibGetTokenParams } from "./jwt.type";
import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { getErrorMessage } from "../error";

export async function sign(
  payload: JwtData,
  secret: string,
  jwtExpiration: number
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + jwtExpiration;

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat - 1)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<JwtData> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload as unknown as JwtData;
  } catch (error) {
    console.error("JWT verification failed:", getErrorMessage(error));
    throw new Error("Invalid token");
  }
}

export const decodeToken = async ({
  token,
  secret,
}: {
  token: string;
  secret: string;
}) => {
  if (!token) throw new Error("Invalid token");

  try {
    const decodedToken = await verify(token.replace("Bearer ", ""), secret);
    console.log("Token decoded and verified successfully");
    return decodedToken;
  } catch (error) {
    console.error("Token decoding failed:", getErrorMessage(error));
    throw new Error("Invalid token");
  }
};

export const getToken = async ({
  user,
  jwtSecret,
  jwtExpiration = 86400,
}: TokenLibGetTokenParams) => {
  try {
    const claims = await generateHasuraClaims(user);

    const token = await sign(
      {
        "https://hasura.io/jwt/claims": claims,
        user: {
          role: user.role,
          account: user.account,
          sessionId: "unset",
        },
      },
      jwtSecret.key,
      jwtExpiration
    );

    console.log("JWT token generated successfully");
    return token;
  } catch (error) {
    console.error("getToken Error:", getErrorMessage(error));
    throw new Error("Cannot generate token");
  }
};

export const refreshToken = async ({
  token,
  jwtSecret,
  jwtExpiration = 86400,
}: {
  token: string;
  jwtSecret: JwtSecret;
  jwtExpiration?: number;
}): Promise<string> => {
  if (!token) {
    console.error("Refresh token attempt with empty token");
    throw new Error("Invalid token");
  }

  try {
    console.log("Attempting to refresh token");

    const cleanToken = token.replace("Bearer ", "");

    const decodedToken = await decodeToken({
      token: cleanToken,
      secret: jwtSecret.key,
    });

    if (!decodedToken || !decodedToken.user) {
      console.error("Decoded token is invalid or missing user information");
      throw new Error("Invalid token structure");
    }

    const newToken = await getToken({
      user: {
        account: decodedToken.user.account,
        role: decodedToken.user.role,
      },
      jwtSecret,
      jwtExpiration,
    });

    if (!newToken) {
      console.error("Failed to generate new token");
      throw new Error("Token generation failed");
    }

    console.log("Token refreshed successfully");
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", getErrorMessage(error));
    throw new Error("Token refresh failed");
  }
};

export function validateJwtSecret(envVariable: string | undefined): JwtSecret {
  if (!envVariable) {
    throw new Error("AUTH_SECRET is not defined");
  }

  let secret: JwtSecret;
  try {
    secret = JSON.parse(envVariable);
  } catch (error) {
    throw new Error("AUTH_SECRET is not a valid JSON");
  }

  if (
    typeof secret.type !== "string" ||
    !["HS256", "HS238", "HS512", "RS256", "RS384", "RS512", "Ed25519"].includes(
      secret.type
    )
  ) {
    throw new Error("Invalid type in AUTH_SECRET");
  }
  if (typeof secret.key !== "string" || secret.key.length === 0) {
    throw new Error("Invalid or missing key in AUTH_SECRET");
  }
  if (
    secret.claims_namespace &&
    (typeof secret.claims_namespace !== "string" ||
      secret.claims_namespace.length === 0)
  ) {
    throw new Error("Invalid or missing claims_namespace in AUTH_SECRET");
  }

  return secret;
}

export function isTokenExpired(token: string) {
  try {
    const decodedToken = decodeJwt(token);

    if (!decodedToken.exp) {
      console.warn("Token does not have an expiration time.");
      return true;
    }

    const currentUnixTime = Math.floor(Date.now() / 1000);
    const isExpired = decodedToken.exp < currentUnixTime;
    console.log("Token expiration status:", isExpired ? "Expired" : "Valid");
    return isExpired;
  } catch (error) {
    console.error("Error checking token expiration:", getErrorMessage(error));
    return true;
  }
}
