import { DELETE_USER_ACCOUNT } from "../graphql/mutations"
import { useMutation } from "@apollo/react-hooks"

export default function useDeleteUser() {
  const [
    deleteUserMutation,
    {
      data: deleteUserData,
      loading: deleteUserLoading,
      error: deleteUserError,
    },
  ] = useMutation(DELETE_USER_ACCOUNT, {
    fetchPolicy: "no-cache",
    refetchQueries: [],
  })

  const deleteUser = (input: { id?: string }) => {
    deleteUserMutation({
      variables: { input },
    })
  }

  return { deleteUser, deleteUserLoading, deleteUserError, deleteUserData }
}
