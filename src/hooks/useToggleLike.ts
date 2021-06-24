import { useMutation } from "@apollo/react-hooks"

import { TOGGLE_LIKE } from "../graphql/mutations"

type ToggleLikeProps = { photo_id: string }

export default function useToggleLike() {
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
		fetchPolicy: "no-cache",
		refetchQueries: [
			// { query: FETCH_FAVORITE_PHOTOS },
			// { query: FETCH_PHOTOS }
		],
	})

	const toggleLike = (input: ToggleLikeProps) => {
		toggleLikeMutation({
			variables: { input },
		})
	}

	return { toggleLike }
}
