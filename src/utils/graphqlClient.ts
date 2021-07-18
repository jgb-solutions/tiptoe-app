import { GraphQLClient } from "graphql-request"

import { GRAPHQL_API_URL } from "./constants"

const graphqlClient = new GraphQLClient(GRAPHQL_API_URL, { headers: {} })

export { graphqlClient }
