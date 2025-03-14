// @ts-nocheck

import { type BatchOptions, createFetcher } from "./fetcher";
import {
  type GraphqlOperation,
  generateGraphqlOperation,
} from "./generateGraphqlOperation";
import type { ExecutionResult, LinkedType } from "./types";

export type Headers =
  | HeadersInit
  | (() => HeadersInit)
  | (() => Promise<HeadersInit>);

export type BaseFetcher = (
  operation: GraphqlOperation | GraphqlOperation[],
) => Promise<ExecutionResult | ExecutionResult[]>;

export type ClientOptions = Omit<RequestInit, "body" | "headers"> & {
  url?: string;
  batch?: BatchOptions | boolean;
  fetcher?: BaseFetcher;
  fetch?: typeof Function;
  headers?: Headers;
};

export const createClient = ({
  queryRoot,
  mutationRoot,
  subscriptionRoot,
  ...options
}: ClientOptions & {
  queryRoot?: LinkedType;
  mutationRoot?: LinkedType;
  subscriptionRoot?: LinkedType;
}) => {
  const fetcher = createFetcher(options);
  const client: {
    query?: typeof Function;
    mutation?: typeof Function;
  } = {};

  if (queryRoot) {
    client.query = (request: any) => {
      if (!queryRoot) throw new Error("queryRoot argument is missing");

      const resultPromise = fetcher(
        generateGraphqlOperation("query", queryRoot, request),
      );

      return resultPromise;
    };
  }
  if (mutationRoot) {
    client.mutation = (request: any) => {
      if (!mutationRoot) throw new Error("mutationRoot argument is missing");

      const resultPromise = fetcher(
        generateGraphqlOperation("mutation", mutationRoot, request),
      );

      return resultPromise;
    };
  }

  return client as any;
};
