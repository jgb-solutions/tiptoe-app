import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_FAVORITE_PHOTOS } from "../graphql/queries"
import { FETCH_FAVORITE_PHOTOS_NUMBER } from "../utils/constants"

export default function useFavoritePhotos() {
	const [hasMore, setHasMore] = useState(true)
	const { loading, error, data, fetchMore, refetch, subscribeToMore } =
		useQuery(FETCH_FAVORITE_PHOTOS, {
			fetchPolicy: "network-only",
			// notifyOnNetworkStatusChange: true,
			variables: {
				first: FETCH_FAVORITE_PHOTOS_NUMBER,
				orderBy: [{ column: "created_at", order: "DESC" }],
			},
		})
 
	const loadMorePhotos = () => {
		const { currentPage } = data.favoritePhoto.paginatorInfo

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

				const oldPhotos = get(previousResult, "favoritePhoto.data")
				const { data: newPhotos, ...newInfo } = get(
					fetchMoreResult,
					"favoritePhoto" 
				)

				setHasMore(newInfo.paginatorInfo.hasMorePages)

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
		subscribeToMore,
	}
}
