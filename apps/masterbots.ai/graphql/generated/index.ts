// @ts-nocheck
import type {
  query_rootGenqlSelection,
  query_root,
  subscription_rootGenqlSelection,
  subscription_root,
} from './schema'
import {
  linkTypeMap,
  createClient as createClientOriginal,
  generateGraphqlOperation,
  type FieldsSelection,
  type GraphqlOperation,
  type ClientOptions,
  GenqlError,
} from './runtime'
export type { FieldsSelection } from './runtime'
export { GenqlError }

import types from './types'
export * from './schema'
const typeMap = linkTypeMap(types as any)

export interface Client {
  query<R extends query_rootGenqlSelection>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<query_root, R>>
}

export const createClient = function (options?: ClientOptions): Client {
  return createClientOriginal({
    url: 'https://masterbots-hasura-dev-kmj2zdhi4q-uc.a.run.app/v1/graphql',

    ...options,
    queryRoot: typeMap.Query!,
    mutationRoot: typeMap.Mutation!,
    subscriptionRoot: typeMap.Subscription!,
  }) as any
}

export const everything = {
  __scalar: true,
}

export type QueryResult<fields extends query_rootGenqlSelection> =
  FieldsSelection<query_root, fields>
export const generateQueryOp: (
  fields: query_rootGenqlSelection & { __name?: string },
) => GraphqlOperation = function (fields) {
  return generateGraphqlOperation('query', typeMap.Query!, fields as any)
}

export type SubscriptionResult<fields extends subscription_rootGenqlSelection> =
  FieldsSelection<subscription_root, fields>
export const generateSubscriptionOp: (
  fields: subscription_rootGenqlSelection & { __name?: string },
) => GraphqlOperation = function (fields) {
  return generateGraphqlOperation(
    'subscription',
    typeMap.Subscription!,
    fields as any,
  )
}
