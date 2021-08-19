import { useQuery } from "@apollo/react-hooks"

import { FETCH_HOME_SCREEN } from "../graphql/queries"
import { HOMEPAGE_PER_PAGE_NUMBER } from "../utils/constants"

export default function useHomeData() {
  const {
    loading: homeLoading,
    error: homeError,
    data: homeData,
    refetch: homeRefetch,
  } = useQuery(FETCH_HOME_SCREEN, {
    notifyOnNetworkStatusChange: true,
    variables: {
      first: HOMEPAGE_PER_PAGE_NUMBER,
      orderBy: [{ column: "created_at", order: "DESC" }],
    },
  })

  return { homeLoading, homeError, homeData, homeRefetch }
}
