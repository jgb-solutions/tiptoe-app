import { useMutation } from "@apollo/react-hooks"

import { UPDATE_USER, UPDATE_USER_WITH_MODEL } from "../graphql/mutations"
import {
  FETCH_MY_FOLLOWERS,
  FETCH_MY_MODELS,
  GET_MODEL_PRICE,
} from "../graphql/queries"
import UpdateUserInterface from "../interfaces/UpdateUserInterface"

export default function useUpdateUser() {
  const [updateUserMutation, { data, loading, error }] = useMutation(
    UPDATE_USER,
    {
      fetchPolicy: "no-cache",
      refetchQueries: [
        { query: FETCH_MY_FOLLOWERS },
        { query: GET_MODEL_PRICE },
        { query: FETCH_MY_MODELS },
      ],
    }
  )

  const updateUser = (input: UpdateUserInterface, id?: string) => {
    updateUserMutation({
      variables: { id, input },
    })
  }

  const [
    updateUserWithModelMutation,
    {
      data: dataUpdateWithModel,
      loading: loadingUpdateWithModel,
      error: errorUpdateWithModel,
    },
  ] = useMutation(UPDATE_USER_WITH_MODEL, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      { query: FETCH_MY_FOLLOWERS },
      { query: GET_MODEL_PRICE },
      { query: FETCH_MY_MODELS },
    ],
  })

  const updateUserWithModel = (input: UpdateUserInterface, id?: string) => {
    updateUserWithModelMutation({
      variables: { id, input },
    })
  }

  return {
    updateUser,
    loading,
    error,
    data,
    updateUserWithModel,
    dataUpdateWithModel,
    loadingUpdateWithModel,
    errorUpdateWithModel,
  }
}
