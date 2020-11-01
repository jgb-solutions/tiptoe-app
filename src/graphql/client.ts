import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client"
import useStore from "../store"
import { API_URL } from "../utils/constants"

const client = new ApolloClient({
  // link: ApolloLink.from([
  //   onError(({ graphQLErrors, networkError }) => {
  //     if (graphQLErrors) {
  //       graphQLErrors.forEach(({ message, extensions: { statusCode } }: any) => {
  //         if (
  //           statusCode === 401 &&
  //           !window.location.pathname.startsWith('/login')
  //         ) {
  //           client.clearStore()
  //           useStore.setState({ user: { data: null, isLoggedIn: false } })
  //         }
  //       })
  //     }

  //     if (networkError) {
  //       console.log('network errors', networkError)
  //       // client.mutate({
  //       //   mutation: notificationAddMutation,
  //       //   variables: {
  //       //     text: 'There was a network problem. Please check your connection',
  //       //   },
  //       // })
  //     }
  //   }),
  //   // auth link
  //   setContext((_, { headers }) => {
  //     // get the authentication token from local storage if it exists
  //     const token = useStore.getState().user.token
  //     // return the headers to the context so httpLink can read them
  //     return {
  //       headers: {
  //         ...headers,
  //         authorization: token ? `Bearer ${token}` : ``,
  //       }
  //     }
  //   }),
  //   // http link
  //   createHttpLink({
  //     uri: `${API_URL}/graphql`,
  //   })
  // ]),
  link:   createHttpLink({
      uri: `${API_URL}/graphql`,
    }),
  cache: new InMemoryCache(),
})

export { client }