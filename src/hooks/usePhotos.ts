import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_PHOTOS } from "../graphql/queries"
import { FETCH_PHOTOS_NUMBER } from "../utils/constants"

export default function usePhotos(modelHash?: string) {
	console.log(`model hash ` + modelHash)
	const [hasMore, setHasMore] = useState(true)
	const {
		loading,
		error,
		data,
		fetchMore,
		refetch,
		subscribeToMore,
	} = useQuery(FETCH_PHOTOS, {
		variables: {
			take: FETCH_PHOTOS_NUMBER,
			orderBy: [{ field: "insertAt", order: "DESC" }],
			modelHash,
		},
	})

	const loadMorePhotos = () => {
		const { currentPage } = data.photos.paginationInfo

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

				const oldPhotos = get(previousResult, "photos.data")
				const { data: newPhotos, ...newInfo } = get(fetchMoreResult, "photos")

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
		subscribeToMore,
	}
}
