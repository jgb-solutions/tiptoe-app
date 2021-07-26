import { ApolloError } from 'apollo-client';
import { useQuery } from "@apollo/react-hooks"

import { BILLING } from "../graphql/queries"
import CardInterface from "../interfaces/CardInterface"
import InvoiceInterface from "../interfaces/InvoiceInterface"

export default function useBillingData(): {
	data?: {  myCards: CardInterface[], myInvoices: InvoiceInterface[] },
	loading: boolean,
	error?: ApolloError
}  {
	return useQuery(BILLING)
}
