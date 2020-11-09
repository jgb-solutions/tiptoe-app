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
			// get the authentication token from local storage if it exists
			const token = useStore.getState().authData.token
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
			uri: `${API_URL}/graphql`,
		}),
	]),
	cache: new InMemoryCache(),
})

export { client }
