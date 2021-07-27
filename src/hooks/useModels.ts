import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_MODELS } from "../graphql/queries"
import { FETCH_MODELS_NUMBER } from "../utils/constants"

interface FilterProps {
  random?: boolean
}

export default function useModels({ random }: FilterProps = {}) {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore, refetch, subscribeToMore } =
    useQuery(FETCH_MODELS, {
      variables: {
        first: FETCH_MODELS_NUMBER,
        orderBy: [{ column: "created_at", order: "DESC" }],
      },
      fetchPolicy: "cache-first",
      errorPolicy: "ignore",
    })

  const loadMoreModels = () => {
    const { currentPage } = data.modeles.paginatorInfo

    fetchMore({
      variables: {
        page: currentPage + 1,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (
          get(previousResult, "paginatorInfo.currentPage") ==
          get(fetchMoreResult, "paginatorInfo.currentPage")
        )
          return

        const oldModels = get(previousResult, "modeles.data")
        const { data: newModels, ...newInfo } = get(fetchMoreResult, "modeles")

        setHasMore(newInfo.paginatorInfo.hasMorePages)

        return {
          models: {
            ...newInfo,
            data: [...oldModels, ...newModels],
          },
        }
      },
    })
  }

  return {
    modelsLoading: loading,
    modelsError: error,
    modelsData: data,
    loadMoreModels,
    hasMoreModels: hasMore,
    refetchModels: refetch,
    subscribeToMoreModels: subscribeToMore,
  }
}
