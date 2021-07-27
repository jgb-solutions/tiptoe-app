import { useMutation } from "@apollo/react-hooks"

import { ADD_CARD, DELETE_CARD } from "../graphql/mutations"
import { BILLING } from "../graphql/queries"

type CardProps = {
  card: string
}

export default function useCardManagement() {
  // add card
  const [
    addCardMutation,
    { data: addCardData, error: addCardError, loading: addCardLoading },
  ] = useMutation(ADD_CARD, {
    fetchPolicy: "no-cache",
    refetchQueries: [{ query: BILLING }],
  })

  const addCard = (input: CardProps) => {
    addCardMutation({
      variables: { input },
      refetchQueries: [{ query: BILLING }],
    })
  }

  // delete card
  const [
    deleteCardMutation,
    {
      data: deleteCardData,
      error: deleteCardError,
      loading: deleteCardLoading,
    },
  ] = useMutation(DELETE_CARD, {
    fetchPolicy: "no-cache",
    refetchQueries: [{ query: BILLING }],
  })

  const deleteThisCard = (input: CardProps) => {
    deleteCardMutation({
      variables: { input },
    })
  }

  return {
    deleteThisCard,
    deleteCardData,
    deleteCardError,
    deleteCardLoading,
    addCard,
    addCardData,
    addCardError,
    addCardLoading,
  }
}
