import { useMutation } from "@apollo/react-hooks"

import { UPDATE_USER } from "../graphql/mutations"
import ModelInterface from "../interfaces/ModelInterface"

export type updatedUserProps = {
	id: string
	name: string
	email: string
	gender: string
	telephone: string
	modele?: ModelInterface
}

export default function useUpdateUser() {
	const [updateUserMutation, { data, loading, error }] = useMutation(
		UPDATE_USER
	)

	const updateUser = (input: updatedUserProps) => {
		updateUserMutation({
			variables: { input },
		})
	}

	return { updateUser, loading, error, data }
}
