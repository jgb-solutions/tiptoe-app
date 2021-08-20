import { useMutation } from "@apollo/react-hooks"

import { ADD_PHOTO_MUTATION } from "../graphql/mutations"
import { FETCH_PHOTOS, FETCH_HOME_SCREEN } from "../graphql/queries"

interface AddMediaPros {
  caption?: string
  type?: string
  category_id: number | null
  modele_id?: number
  publish?: boolean
  bucket?: string
  uri?: string
}
export default function useAddMedia() {
  const [addMediaMutation, { data, loading, error }] = useMutation(
    ADD_PHOTO_MUTATION,
    {
      fetchPolicy: "no-cache",
      refetchQueries: [{ query: FETCH_HOME_SCREEN }, { query: FETCH_PHOTOS }],
    }
  )

  const addMedia = (input: AddMediaPros) => {
    addMediaMutation({
      variables: { input },
    })
  }

  return {
    addMedia,
    addMediaLoading: loading,
    addMediaError: error,
    addMediaData: data,
  }
}
