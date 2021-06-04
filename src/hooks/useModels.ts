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
				take: FETCH_MODELS_NUMBER,
				orderBy: [{ field: "created_at", order: "DESC" }],
				random,
			},
		})

	const loadMoreModels = () => {
		const { currentPage } = data.models.paginationInfo

		fetchMore({
			variables: {
				page: currentPage + 1,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (
					get(previousResult, "paginationInfo.currentPage") ==
					get(fetchMoreResult, "paginationInfo.currentPage")
				)
					return

				const oldModels = get(previousResult, "models.data")
				const { data: newModels, ...newInfo } = get(fetchMoreResult, "models")

				setHasMore(newInfo.paginationInfo.hasMorePages)

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
