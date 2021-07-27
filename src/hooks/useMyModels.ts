import { useQuery } from "@apollo/react-hooks"
import { FETCH_MY_MODELS } from "../graphql/queries"

export default function useMyModels() {
  const { loading, error, data, refetch } = useQuery(FETCH_MY_MODELS, {
    variables: {},
  })

  return {
    modelsData: data,
    modelLoading: loading,
    modelError: error,
    refetchModel: refetch,
  }
}
