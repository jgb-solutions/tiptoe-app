import { GETMODELPRICE } from "../graphql/queries"
import { useQuery } from "@apollo/react-hooks"



export default function useGetModelPrice(hash: any){
    const { loading, error, data, refetch } = useQuery(GETMODELPRICE, {
		variables: { hash },
	})

    return {
        loading,
        error,
        refetch,
        price: data?.getModelPrice
    }
}
