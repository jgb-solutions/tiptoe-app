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
			access_token
		}
	}
`

export const LOG_USER_IN = gql`
	mutation logUserIn($input: LoginInput!) {
		login(input: $input) {
			access_token
			user {
				id
				active
				admin
				name
				email
				first_login
				avatar
				telephone
				created_at
				user_type
				gender
				modele {
					stage_name
					bio
					facebook
					instagram
					twitter
					youtube
					created_at
				}
			}
		}
	}
`

export const VERIFY_USER_EMAIL = gql`
	mutation VerifyUserEmail($input: VerifyUserEmailInput!) {
		verifyUserEmail(input: $input) {
			exists
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

export const CHANGE_PASSWORD = gql`
	mutation ChangePassword($input: ChangePasswordInput!) {
		changePassword(input: $input) {
			id
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
				created_at
			}
			access_token
		}
	}
`
