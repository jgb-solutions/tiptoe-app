import { useQuery } from "@apollo/react-hooks"

import { CREATE_PAYMENT_INTENT } from "../graphql/queries"

export default function usePayment() {
  const { data } = useQuery(CREATE_PAYMENT_INTENT)

  return {
    intent: data.createPaymentIntent.client_secret,
  }
}
