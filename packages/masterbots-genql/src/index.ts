import { createClient as createWsClient } from 'graphql-ws'
import { endpoints, masterBotsEnv } from 'masterbots-env'
import { createClient } from '../generated'

export * from '../generated'

// Server side client
export function createMasterBotsClient({ config, jwt, env, options = {}, url }: GraphQLSdkProps = {}) {
  const apiUrl = url || endpoints[env || 'prod']
  const { subscribe } = createWsClient({
    url: apiUrl.replace('http', 'ws'),
    ...options,
  })

  const client = createClient({
    fetcher: async (operation: any) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      }

      // console.log(
      //   '\n ==> GraphQL Query : \n',
      //   JSON.stringify((operation as GraphqlOperation).query.replaceAll('"', ''))
      // )

      let fetchResponse
      try {
        fetchResponse = fetch(apiUrl || endpoints[env || 'prod'], {
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

export type masterBotsClient = ReturnType<typeof createMasterBotsClient>

type GraphQLSdkProps = {
  config?: RequestInit
  jwt?: string
  env?: masterBotsEnv
  options?: any // TODO: improve type
  url?: string
}
