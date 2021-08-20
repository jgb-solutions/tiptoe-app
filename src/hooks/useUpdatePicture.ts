import { useMutation } from "@apollo/react-hooks"

import {
  UPDATE_AVATAR_MUTATION,
  UPDATE_POSTER_MUTATION,
} from "../graphql/mutations"

export default function useUpdatePicture() {
  const [
    updateAvatarMutation,
    { data: avatarData, loading: avatarLoading, error: avatarRrror },
  ] = useMutation(UPDATE_AVATAR_MUTATION, {
    fetchPolicy: "no-cache",
  })

  const updateAvatar = (input: { avatar: string }) => {
    updateAvatarMutation({
      variables: { input },
    })
  }

  const [
    updatePosterMutation,
    { data: posterData, loading: posterLoading, error: posterRrror },
  ] = useMutation(UPDATE_POSTER_MUTATION, {
    fetchPolicy: "no-cache",
  })

  const updatePoster = (input: { poster: string }) => {
    updatePosterMutation({
      variables: { input },
    })
  }

  return {
    updateAvatar,
    avatarData,
    avatarLoading,
    avatarRrror,
    updatePoster,
    posterData,
    posterLoading,
    posterRrror,
  }
}
