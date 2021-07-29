import { useQuery } from "@apollo/react-hooks"

import { CREATE_PAYMENT_INTENT } from "../graphql/queries"

export default function usePaymentIntent() {
  const { data } = useQuery(CREATE_PAYMENT_INTENT)

  return {
    client_secret: data?.createPaymentIntent?.client_secret,
  }
}
