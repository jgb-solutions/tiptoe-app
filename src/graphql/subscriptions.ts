import gql from "graphql-tag"

export const PHOTO_UPDATES_SUBSCRIPTION = gql`
	subscription($topic: String) {
		photoUpdates(topic: $topic) {
			id
			hash
		}
	}
`
