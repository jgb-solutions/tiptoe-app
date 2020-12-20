import { useMutation } from "@apollo/react-hooks"

import { TOGGLE_FOLLOW } from "../graphql/mutations"

type ToggleFollowProps = { modelId: string }

export default function useToggleFollow() {
	const [toggleFollowMutation, { data, error, loading }] = useMutation(
		TOGGLE_FOLLOW,
		{
			fetchPolicy: "no-cache",
		}
	)

	const toggleFollow = (input: ToggleFollowProps) => {
		toggleFollowMutation({
			variables: { input },
		})
	}

	return { toggleFollow, data, error, loading }
}
