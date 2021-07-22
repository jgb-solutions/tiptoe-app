import { GETPUBLISHABLEKEY } from "../graphql/queries"
import { useQuery } from "@apollo/react-hooks"


export default function publishableKey(){
    const {
		data,
	} = useQuery(GETPUBLISHABLEKEY) 

    return data?.publishableKey
}