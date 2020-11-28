import { useQuery } from "@apollo/react-hooks"

import { FETCH_MODEL } from "../graphql/queries"
import { ApolloError } from "apollo-client"
import ModelInterface from "../interfaces/ModelInterface"

type Model = {
	data: {
		model: ModelInterface
	}
	loading: boolean
	error: ApolloError | undefined
	refetch: () => void
}

export default function useModel(hash: string): Model {
	const { loading, error, data, refetch } = useQuery(FETCH_MODEL, {
		variables: { hash },
		// fetchPolicy: "network-only",
	})

	return { loading, error, data, refetch }
}
