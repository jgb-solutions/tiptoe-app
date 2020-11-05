import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink } from "apollo-link"
import { setContext } from "apollo-link-context"

import useStore, { INITIAL_USER_STATE } from "../store"
import { API_URL } from "../utils/constants"

// Apollo Client
const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.forEach(
					({ message, extensions: { statusCode } }: any) => {
						if (statusCode === 401) {
							useStore.setState({ user: INITIAL_USER_STATE })
						}
					}
				)
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
			// get the authentication token from local storage if it exists
			const token = useStore.getState().user.token
			// return the headers to the context so httpLink can read them
			return {
				headers: {
					...headers,
					authorization: `Bearer ${token}`,
				},
			}
		}),
		// http link
		createHttpLink({
			uri: API_URL,
		}),
	]),
	cache: new InMemoryCache(),
})

export { client }
