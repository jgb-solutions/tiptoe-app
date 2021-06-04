import { onError } from "apollo-link-error"
import { ApolloClient } from "apollo-client"
import { ApolloLink, split } from "apollo-link"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"
import * as AbsintheSocket from "@absinthe/socket"
import { InMemoryCache } from "apollo-cache-inmemory"
import { hasSubscription } from "@jumpn/utils-graphql"
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link"

import useStore, { INITIAL_USER_STATE } from "../store"
import { GRAPHQL_API_URL } from "../utils/constants"

const httpLink = createHttpLink({ uri: GRAPHQL_API_URL })

const getClient = () => {
	const phoenixSocket: any = useStore.getState().socket
	const absintheSocket = AbsintheSocket.create(phoenixSocket)
	const websocketLink: any = createAbsintheSocketLink(absintheSocket)

	const link = split(
		(operation) => hasSubscription(operation.query),
		websocketLink,
		httpLink
	)

	return new ApolloClient({
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }) => {
				if (graphQLErrors) {
					console.log(graphQLErrors)
					graphQLErrors.forEach(({ message, code }: any) => {
						if (code === 401) {
							useStore.setState({ authData: INITIAL_USER_STATE })
						}
					})
				}

				if (networkError) {
					console.log("network errors", networkError)
					// client.mutate({
					//   mutation: notificationAddMutation,
					//   variables: {
					//     text: 'There was a network problem. Please check your connection',
					//   },
					// })
				}
			}),
			// auth link
			setContext((_, { headers }) => {
				// get the authentication access_token from local storage if it exists
				const access_token = useStore.getState().authData.access_token
				// return the headers to the context so httpLink can read them
				return {
					headers: {
						...headers,
						authorization: `Bearer ${access_token}`,
					},
				}
			}),
			// http link
			link,
		]),
		cache: new InMemoryCache(),
	})
}

export { getClient }
