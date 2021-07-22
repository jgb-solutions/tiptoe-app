import { useMutation } from "@apollo/react-hooks"

import { TOGGLE_FOLLOW } from "../graphql/mutations"

type ToggleFollowProps = { 
	payment_method?: any
	modele_id: string 
	stripe_price?: string
    subscription_id?: string
}

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
