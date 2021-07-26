import { GETPUBLISHABLEKEY } from "../graphql/queries"
import { useQuery } from "@apollo/react-hooks"

export default function useGetPublishableKey() {
  const { data } = useQuery(GETPUBLISHABLEKEY)

  return {
    publichableKey: data,
  }
}
