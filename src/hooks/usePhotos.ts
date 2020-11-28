import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_PHOTOS } from "../graphql/queries"
import { FETCH_PHOTOS_NUMBER } from "../utils/constants"

export default function usePhotos(modelHash?: string) {
	const [hasMore, setHasMore] = useState(true)
	const { loading, error, data, fetchMore } = useQuery(FETCH_PHOTOS, {
		variables: {
			take: FETCH_PHOTOS_NUMBER,
			orderBy: [{ field: "created_at", order: "DESC" }],
			modelHash,
		},
	})

	const loadMorePhotos = () => {
		const { currentPage } = data.photos.paginatorInfo

		fetchMore({
			variables: {
				page: currentPage + 1,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				const oldPhotos = get(previousResult, "photos.data")
				const { data: newPhotos, ...newInfo } = get(fetchMoreResult, "photos")

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

	return { loading, error, data, loadMorePhotos, hasMorePhotos: hasMore }
}
