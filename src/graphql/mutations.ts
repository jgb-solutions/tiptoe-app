import gql from "graphql-tag"

export const SIGN_USER_UP = gql`
	mutation RegisterUser($input: RegisterInput!) {
		register(input: $input) {
			data {
				id
				name
				email
				firstLogin
				avatarUrl
				telephone
				insertedAt
				userType
				gender
				model {
					bio
					facebook
					insertedAt
					instagram
					name
					twitter
					youtube
				}
			}
			token
		}
	}
`

export const UPDATE_USER = gql`
	mutation UpdateUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
			id
			name
			email
			firstLogin
			avatarUrl
			telephone
			insertedAt
			userType
			gender
			model {
				bio
				facebook
				instagram
				name
				twitter
				youtube
			}
		}
	}
`

export const ADD_GENRE_MUTATION = gql`
	mutation AddGenre($input: GenreInput!) {
		addGenre(input: $input) {
			id
			name
		}
	}
`

export const LOG_OUT_MUTATION = gql`
	mutation LogOut {
		logout {
			success
		}
	}
`

export const TOGGLE_LIKE = gql`
	mutation ToggleLike($input: ToggleLikeInput!) {
		toggleLike(input: $input) {
			success
		}
	}
`

export const CREATE_ROOM = gql`
	mutation CreateRoom($input: CreateRoomInput!) {
		createRoom(input: $input) {
			id
		}
	}
`

export const TOGGLE_FOLLOW = gql`
	mutation ToggleFollow($input: ToggleFollowInput!) {
		toggleFollow(input: $input) {
			success
		}
	}
`

export const FACEOOK_LOGIN = gql`
	mutation facebookLogin($code: String!) {
		handleFacebookConnect(code: $code) {
			data {
				id
				name
				email
				avatar_url
				telephone
				first_login
				insertAt
			}
			token
		}
	}
`
