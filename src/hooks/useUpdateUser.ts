import { useMutation } from "@apollo/react-hooks"

import { UPDATE_USER } from "../graphql/mutations"
import {
  FETCH_MY_FOLLOWERS,
  FETCH_MY_MODELS,
  GET_MODEL_PRICE,
} from "../graphql/queries"
import ModelInterface from "../interfaces/ModelInterface"
import UpdateModelInterface from "../interfaces/UpdateModelInterface"
import UpdateUserInterface from "../interfaces/UpdateUserInterface"

export type UpdatedUserProps = {
  id: string | undefined
  name: string | undefined
  email: string | undefined
  gender: string | undefined
  telephone: string | undefined
  modele?: UpdateModelInterface
}

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

  const updateUser = (input: UpdateUserInterface) => {
    updateUserMutation({
      variables: { input },
    })
  }

  return { updateUser, loading, error, data }
}
