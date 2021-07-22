import { useQuery } from "@apollo/react-hooks"

import { GETPUBLISHABLEKEY, CREATEPAYMENTINTENT } from "../graphql/queries"

export default function usePayment() {
	const {
		data: key,
	} = useQuery(GETPUBLISHABLEKEY) 

	const {
		data
	} = useQuery(CREATEPAYMENTINTENT) 

	return {
		publishableKey: key,
		intent: data.createPaymentIntent.client_secret
	}
}
