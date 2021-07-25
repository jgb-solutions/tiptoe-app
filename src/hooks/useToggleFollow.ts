import { useMutation } from "@apollo/react-hooks"

import { TOGGLE_FOLLOW } from "../graphql/mutations"
import { FETCH_HOME_SCREEN, FETCH_MODELS} from "../graphql/queries"

type ToggleFollowProps = { 
	payment_method?: any
	modele_id: string 
}

export default function useToggleFollow() {
	const [toggleFollowMutation, { data, error, loading }] = useMutation(
		TOGGLE_FOLLOW,
		{
			fetchPolicy: "no-cache",
			refetchQueries: [
				{ query: FETCH_HOME_SCREEN },
				{ query: FETCH_MODELS }
			],
		}
	)

	const toggleFollow = (input: ToggleFollowProps) => {
		toggleFollowMutation({
			variables: { input },
		})
	}

	return { toggleFollow, data, error, loading }
}
