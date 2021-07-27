import { useQuery } from "@apollo/react-hooks"

import { CREATEPAYMENTINTENT } from "../graphql/queries"

export default function usePaymentIntent() {
	const {
		data
	} = useQuery(CREATEPAYMENTINTENT)

	return { 
		client_secret: data?.createPaymentIntent?.client_secret,
	}
}
