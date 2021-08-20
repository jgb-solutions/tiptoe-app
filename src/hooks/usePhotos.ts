import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import get from "lodash/get"

import { FETCH_PHOTOS } from "../graphql/queries"
import { FETCH_PHOTOS_NUMBER } from "../utils/constants"

export default function usePhotos() {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore, refetch, subscribeToMore } =
    useQuery(FETCH_PHOTOS, {
      variables: {
        first: FETCH_PHOTOS_NUMBER,
        orderBy: [{ column: "created_at", order: "DESC" }],
      },
      fetchPolicy: "cache-first",
      errorPolicy: "ignore",
    })

  const loadMorePhotos = () => {
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

  return {
    photosLoading: loading,
    photosError: error,
    photoData: data,
    loadMorePhotos,
    hasMorePhotos: hasMore,
    refetchPhotos: refetch,
    subscribeToMorePhotos: subscribeToMore,
  }
}
