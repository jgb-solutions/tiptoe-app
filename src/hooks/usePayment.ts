import { useQuery } from "@apollo/react-hooks"

import { GETPUBLISHABLEKEY, CREATEPAYMENTINTENT } from "../graphql/queries"

export default function usePayment() {
  const { data } = useQuery(CREATEPAYMENTINTENT)

  return {
    intent: data.createPaymentIntent.client_secret,
  }
}
