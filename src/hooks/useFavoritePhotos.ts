import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_FAVORITE_PHOTOS } from "../graphql/queries"
import { FETCH_FAVORITE_PHOTOS_NUMBER } from "../utils/constants"

export default function useFavoritePhotos() {
	const [hasMore, setHasMore] = useState(true)
	const { loading, error, data, fetchMore, refetch } = useQuery(
		FETCH_FAVORITE_PHOTOS,
		{
			fetchPolicy: "network-only",
			// notifyOnNetworkStatusChange: true,
			variables: {
				take: FETCH_FAVORITE_PHOTOS_NUMBER,
				orderBy: [{ field: "insertAt", order: "DESC" }],
			},
		}
	)

	const loadMorePhotos = () => {
		const { currentPage } = data.favoritePhotos.paginationInfo

		// alert(currentPage + 1)
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

				const oldPhotos = get(previousResult, "favoritePhotos.data")
				const { data: newPhotos, ...newInfo } = get(
					fetchMoreResult,
					"favoritePhotos"
				)

				setHasMore(newInfo.paginationInfo.hasMorePages)

				return {
					photos: {
						...newInfo,
						data: [...oldPhotos, ...newPhotos],
					},
				}
			},
		})
	}

	return {
		loading,
		error,
		data,
		loadMorePhotos,
		hasMorePhotos: hasMore,
		refetch,
	}
}
