import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_FAVORITE_PHOTOS } from "../graphql/queries"
import { FETCH_FAVORITE_PHOTOS_NUMBER } from "../utils/constants"


export default function usePhotos(user_id: any) {
	const [hasMore, setHasMore] = useState(true)
	const { loading, error, data, fetchMore, refetch, subscribeToMore } =
		useQuery(FETCH_FAVORITE_PHOTOS, {
			variables: {
				first: FETCH_FAVORITE_PHOTOS_NUMBER,
				orderBy: [{ column: "created_at", order: "DESC" }],
				user_id, 
			},
		})

	const loadMorePhotos = () => {
		// const { currentPage } = data.favoritePhoto.paginatorInfo
		const  currentPage  = 0

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

				const oldPhotos = get(previousResult, "photos.data")
				const { data: newPhotos, ...newInfo } = get(fetchMoreResult, "favoritePhotos")

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


// export default function useFavoritePhotos(user_id: any) {
// 	const [hasMore, setHasMore] = useState(true)
// 	const { loading, error, data, fetchMore, refetch, subscribeToMore } =
// 		useQuery(FETCH_FAVORITE_PHOTOS, {
// 			fetchPolicy: "network-only",
// 			// notifyOnNetworkStatusChange: true,
// 			variables: { 
// 				user_id,
// 				first: FETCH_FAVORITE_PHOTOS_NUMBER,
// 				orderBy: [{ column: "created_at", order: "DESC" }],
// 			},
// 		})

// 	const loadMorePhotos = () => {
// 		const { currentPage } = data.favoritePhotos.paginatorInfo

// 		fetchMore({
// 			variables: {
// 				page: currentPage + 1,
// 			},
// 			updateQuery: (previousResult, { fetchMoreResult }) => {
// 				if (
// 					get(previousResult, "paginatorInfo.currentPage") ==
// 					get(fetchMoreResult, "paginatorInfo.currentPage")
// 				)
// 					return

// 				const oldPhotos = get(previousResult, "favoritePhotos.data")
// 				const { data: newPhotos, ...newInfo } = get(
// 					fetchMoreResult,
// 					"favoritePhotos"
// 				)

// 				setHasMore(newInfo.paginatorInfo.hasMorePages)

// 				return {
// 					photos: {
// 						...newInfo,
// 						data: [...oldPhotos, ...newPhotos],
// 					},
// 				}
// 			},
// 		})
// 	}

// 	return {
// 		loading,
// 		error,
// 		data,
// 		loadMorePhotos,
// 		hasMorePhotos: hasMore,
// 		refetch,
// 		subscribeToMore,
// 	}
// }
