import { GET_MODEL_PRICE } from "../graphql/queries"
import { useQuery } from "@apollo/react-hooks"

export default function useGetModelPrice(hash: any) {
  const { loading, error, data, refetch } = useQuery(GET_MODEL_PRICE, {
    variables: { hash },
  })

  return {
    loading,
    error,
    refetch,
    price: data?.getModelPrice,
  }
}
