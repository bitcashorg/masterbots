import { createClient as createWsClient } from 'graphql-ws'

import { GraphqlOperation } from '@genql/runtime'
import { createClient } from './generated'
export { everything } from './generated'

type GraphQLSdkProps = {
  config?: RequestInit
  jwt?: string
}

const api = 'https://masterbots-hasura-dev-kmj2zdhi4q-uc.a.run.app' // 'https://dev-api.masterbots.ai'

// ? Use this function to get the sdk for the masterbots service at the server side
export function getDboardSdk({ config, jwt }: GraphQLSdkProps) {
  return createClient({
    fetcher: async (operation: any) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
      }
      const fetchResponse = await fetch(api, {
        method: 'POST',
        headers,
        body: JSON.stringify(operation),
        ...config
      })
        .then(response => response.json())
        .catch(error => {
          console.error(
            '[🔥 index]::[ERROR] Graphql fetcher',
            error,
            JSON.stringify(
              (operation as GraphqlOperation).query.replaceAll('"', '')
            )
          )
          throw new Error(error)
        })

      return fetchResponse
    }
  })
}

// ? Use this function to get the sdk for the masterbots service at the client side
export function getClientDBoardSdk({
  config
}: Omit<GraphQLSdkProps, 'jwt'> = {}) {
  console.log('document.cookie', document.cookie)
  let jwt = localStorage.getItem('jwt-masterbots') || undefined

  return getDboardSdk({ jwt, config })
}

// ? Use this function to get the sdk for subscriptions to the masterbots service
export function getWsDBoardClient() {
  return createWsClient({
    url: api.replace('http', 'ws').replace('https', 'ws')
  })
}
