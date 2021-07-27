import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_PHOTOS } from "../graphql/queries"
import { FETCH_PHOTOS_NUMBER } from "../utils/constants"

export default function useSearch() {
	const [hasMore, setHasMore] = useState(true)
	const { loading, error, data, fetchMore, refetch, subscribeToMore } =
		useQuery(FETCH_PHOTOS, {
			fetchPolicy: "network-only",
			// notifyOnNetworkStatusChange: true,
			variables: {
				page: 1,
				first: FETCH_PHOTOS_NUMBER,
				orderBy: [{ column: "created_at", order: "DESC" }],
			},
		})
 
	const loadMore = () => {
		const { currentPage } = data.photos.paginatorInfo
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
		loadMore,
		hasMore,
		refetch,
		subscribeToMore,
	}

}
