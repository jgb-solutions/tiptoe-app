import { useMutation } from "@apollo/react-hooks"

import { SETUP_PRICE } from "../graphql/mutations"
import { GETMODELPRICE} from "../graphql/queries"


type AddPriceProps = { 
	user_id?: string 
	cost: number
}

export default function useSetupPrice(hash: any) {
	const [addPriceMutation, { data, error, loading }] = useMutation(
		SETUP_PRICE,
		{
			fetchPolicy: "no-cache",
			refetchQueries: [
				{ 
					query: GETMODELPRICE,
					variables: { hash: hash },
				},
			],
		}
	)

	const addPrice = (input: AddPriceProps) => {
		addPriceMutation({
			variables: { input },
		})
	}

	return { addPrice, data, error, loading }
}
