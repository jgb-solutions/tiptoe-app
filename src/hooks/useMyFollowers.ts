import { useQuery } from "@apollo/react-hooks"
import { FETCH_MY_FOLLOWERS } from "../graphql/queries"

export default function useMyFollowers() {
  const { loading, error, data, refetch } = useQuery(FETCH_MY_FOLLOWERS, {
    variables: {},
  })

  return {
    followersData: data,
    followerLoading: loading,
    followerError: error,
    refetchFollower: refetch,
  }
}
