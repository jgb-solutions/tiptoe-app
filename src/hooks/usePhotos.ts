import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_PHOTOS } from "../graphql/queries"
import { FETCH_PHOTOS_NUMBER } from "../utils/constants"

interface FilterProps {
	modelHash?: string
	random?: boolean
}

export default function usePhotos({ modelHash, random }: FilterProps = {}) {
	const [hasMore, setHasMore] = useState(true)
	const { loading, error, data, fetchMore, refetch, subscribeToMore } =
		useQuery(FETCH_PHOTOS, {
			variables: {
				take: FETCH_PHOTOS_NUMBER,
				orderBy: [{ field: "created_at", order: "DESC" }],
				modelHash,
				random,
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
		photosLoading: loading,
		photosError: error,
		photosData: data,
		loadMorePhotos,
		hasMorePhotos: hasMore,
		refetchPhotos: refetch,
		subscribeToMorePhotos: subscribeToMore,
	}
}
