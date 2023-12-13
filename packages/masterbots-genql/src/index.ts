import { createClient } from '../generated'
import { GraphqlOperation } from '@genql/runtime'
import { endpoints, BitcashEnv } from 'masterbots-env'
import { createClient as createWsClient } from 'graphql-ws'

export * from '../generated'

// Server side client
export function createBitcashClient({ config, jwt, env }: GraphQLSdkProps = {}) {
  const { subscribe } = createWsClient({
    url: endpoints[env || 'prod'].replace('http', 'ws'),
  })

  const client = createClient({
    fetcher: async (operation: any) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      }

      console.log(
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

export type BitcashClient = ReturnType<typeof createBitcashClient>

type GraphQLSdkProps = {
  config?: RequestInit
  jwt?: string
  env?: BitcashEnv
}
