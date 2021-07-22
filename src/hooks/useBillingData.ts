import { useQuery } from "@apollo/react-hooks"

import { BILLING } from "../graphql/queries"

export default function useBillingData() {
	const {
		data
	} = useQuery(BILLING)

	return { 
		intent: data?.createPaymentIntent?.client_secret,
		cards: data?.myCards
	}
}
