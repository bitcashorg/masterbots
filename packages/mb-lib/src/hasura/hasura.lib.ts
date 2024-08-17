import { HasuraClaims } from "mb-types";
import { createMbClient } from "mb-genql";
import { validateMbEnv } from "mb-env";

export function generateHasuraClaims({
  account,
  role,
}: {
  account: string;
  role: string;
}) {
  return {
    "x-hasura-allowed-roles": [...role.split(","), "anonymous"],
    "x-hasura-default-role": "user",
    "x-hasura-user-id": account,
  } as HasuraClaims;
}

export function getHasuraClient() {
  if (!process.env.NEXT_PUBLIC_APP_ENV) {
    throw new Error("NEXT_PUBLIC_APP_ENV is not set");
  }

  if (
    !process.env.HASURA_GRAPHQL_LOCAL_ADMIN_SECRET &&
    !process.env.HASURA_GRAPHQL_ADMIN_SECRET
  ) {
    throw new Error(
      "Neither HASURA_GRAPHQL_LOCAL_ADMIN_SECRET nor HASURA_GRAPHQL_ADMIN_SECRET is set"
    );
  }

  const env = validateMbEnv(process.env.NEXT_PUBLIC_APP_ENV);
  //* Determine which secret to use based on the environment
  let adminSecret: string;
  if (env === "local") {
    if (!process.env.HASURA_GRAPHQL_LOCAL_ADMIN_SECRET) {
      throw new Error(
        "HASURA_GRAPHQL_LOCAL_ADMIN_SECRET is not set for local environment"
      );
    }
    adminSecret = process.env.HASURA_GRAPHQL_LOCAL_ADMIN_SECRET;
  } else {
    if (!process.env.HASURA_GRAPHQL_ADMIN_SECRET) {
      throw new Error(
        "HASURA_GRAPHQL_ADMIN_SECRET is not set for non-local environment"
      );
    }
    adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;
  }

  //* Initialize and return the Hasura client
  return createMbClient({ env, adminSecret });
}
