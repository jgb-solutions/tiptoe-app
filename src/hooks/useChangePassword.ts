import { useMutation } from "@apollo/react-hooks"

import { CHANGE_PASSWORD } from "../graphql/mutations"

export type ChangePasswordProps = {
  password: string
  new_password: string
}

export default function useChangePassword() {
  const [changePasswordMutation, { data, loading, error }] = useMutation(
    CHANGE_PASSWORD,
    {
      fetchPolicy: "no-cache",
    }
  )

  const changePassword = (input: ChangePasswordProps) => {
    changePasswordMutation({
      variables: { input },
    })
  }

  return {
    changePassword,
    changePasswordLoading: loading,
    changePasswordError: error,
    changePasswordData: data,
  }
}
