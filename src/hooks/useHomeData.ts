import { useQuery } from "@apollo/react-hooks"

import { FETCH_HOME_SCREEN } from "../graphql/queries"
import { HOMEPAGE_PER_PAGE_NUMBER } from "../utils/constants"

export default function useHomeData() {
	const { loading: homeLoading, error: homeError, data: homeData } = useQuery(
		FETCH_HOME_SCREEN,
		{
			notifyOnNetworkStatusChange: true,
			variables: {
				take: HOMEPAGE_PER_PAGE_NUMBER,
				orderBy: [{ field: "created_at", order: "DESC" }],
			},
		}
	)

	return { homeLoading, homeError, homeData }
}
