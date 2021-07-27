import { useMutation } from "@apollo/react-hooks"

import { SET_DEFAULT_CARD } from "../graphql/mutations"


type CardProps = { 
	card: string 
}

export default function useSetDefaultCard() {
	const [setDefaultCardMutation, { data, error, loading }] = useMutation(
		SET_DEFAULT_CARD,
		{
			fetchPolicy: "no-cache",
		}
	)

	const setDefaultCard = (input: CardProps) => {
		setDefaultCardMutation({
			variables: { input },
		})
	}

	return { setDefaultCard, data, error, loading }
}
