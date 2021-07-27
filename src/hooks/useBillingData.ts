import { useQuery } from "@apollo/react-hooks"

import { BILLING } from "../graphql/queries"

export default function useBillingData() {
  const { data, loading, error, refetch } = useQuery(BILLING)

  return {
    data,
    loading,
    error,
    refetch,
  }
}
