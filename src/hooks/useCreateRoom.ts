import { useMutation } from "@apollo/react-hooks"

import { CREATE_ROOM } from "../graphql/mutations"

type CreateRoomProps = { modelId: string }

export default function useCreateRoom() {
	const [createRoomMutation, { data, loading, error }] = useMutation(
		CREATE_ROOM
	)

	const createRoom = (input: CreateRoomProps) => {
		createRoomMutation({
			variables: { input },
		})
	}

	return { createRoom, loading, error, data }
}
