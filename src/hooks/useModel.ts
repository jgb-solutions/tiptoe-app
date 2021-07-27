import { useQuery } from "@apollo/react-hooks"
import { FETCH_MODEL } from "../graphql/queries"

export default function useModel(hash: string) {
  const { loading, error, data, refetch } = useQuery(FETCH_MODEL, {
    variables: { hash },
  })

  return {
    modelData: data,
    modelLoading: loading,
    modelError: error,
    refetchModel: refetch,
  }
}
