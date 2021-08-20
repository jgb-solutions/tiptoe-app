import { DELETE_MODEL_ACCOUNT } from "./../graphql/mutations"
import { useMutation } from "@apollo/react-hooks"

export default function useDeleteModel() {
  const [
    deleteModelMutation,
    {
      data: deleteModelData,
      loading: deleteModelLoading,
      error: deleteModelError,
    },
  ] = useMutation(DELETE_MODEL_ACCOUNT, {
    fetchPolicy: "no-cache",
    refetchQueries: [],
  })

  const deleteModel = (input: { id?: string }) => {
    deleteModelMutation({
      variables: { input },
    })
  }

  return { deleteModel, deleteModelLoading, deleteModelError, deleteModelData }
}
