import type { GraphqlOperation } from '@genql/runtime'
import {
	type Client as WsClient,
	createClient as createWsClient,
} from 'graphql-ws'
import { type MbEnv, endpoints } from 'mb-env'
import { type Client, createClient } from '../generated'

export * from '../generated'

// Server side client
export function createMbClient({
	config,
	jwt,
	env,
	adminSecret,
	debug,
}: GraphQLSdkProps = {}): MbClient {
	const { subscribe } = createWsClient({
		url: endpoints[env || 'prod'].replace('http', 'ws'),
	})
	const client = createClient({
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		fetcher: async (operation: any) => {
			const headers = {
				'Cache-Control': 'no-cache',
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
				...(adminSecret ? { 'x-hasura-admin-secret': adminSecret } : {}),
			}

			debug &&
				console.log(
					'\n ==> GraphQL Query : \n',
					JSON.stringify(
						(operation as GraphqlOperation).query.replaceAll('"', ''),
					),
				)
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			let fetchResponse: Promise<any> = Promise.resolve()

			try {
				fetchResponse = fetch(endpoints[env || 'prod'], {
					method: 'POST',
					headers,
					body: JSON.stringify(operation),
					signal: operation.context?.signal,
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

export interface MbClient extends Client {
	subscribe: WsClient['subscribe']
}

type GraphQLSdkProps = {
	config?: RequestInit
	jwt?: string
	env?: MbEnv
	adminSecret?: string
	debug?: boolean
}
