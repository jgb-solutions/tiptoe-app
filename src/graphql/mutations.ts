import gql from "graphql-tag"

export const SIGN_USER_UP = gql`
	mutation RegisterUser($input: RegisterInput!) {
		register(input: $input) {
			data {
				id
				name
				email
				first_login
				avatar
				telephone
				created_at
				user_type
				gender
				modele {
					id
					stage_name
					bio
					hash
					facebook
					instagram
					twitter
					youtube
					poster
					followers {
						id
						name
					}
					photos {
						id
						uri
						bucket
						caption
						detail
						featured
						publish
						category {
							id
							name
						}
						users {
							id
							name
						}
					}
					created_at
				}
				modeles {
					id
					stage_name
					bio
					facebook
					instagram
					hash
					twitter
					youtube
					poster
					followers {
						id
						name
					}
					photos {
						id
						uri
						bucket
						caption
						detail
						featured
						publish
						category {
							id
							name
						}
						users {
							id
							name
						}
					}
					created_at
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
					id
					stage_name
					bio
					facebook
					hash
					instagram
					twitter
					youtube
					poster
					followers {
						id
						name
					}
					photos {
						id
						uri
						bucket
						caption
						detail
						featured
						publish
						category {
							id
							name
						}
						users {
							id
							name
						}
					}
					created_at
				}
				modeles {
					id
					stage_name
					bio
					hash
					facebook
					instagram
					twitter
					youtube
					poster
					followers {
						id
						name
					}
					photos {
						id
						uri
						bucket
						caption
						detail
						featured
						publish
						category {
							id
							name
						}
						users {
							id
							name
						}
					}
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
			first_login
			avatar
			telephone
			created_at
			user_type
			gender
			modele {
				id
				bio
				facebook
				instagram
				stage_name
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

export const ADD_PHOTO_MUTATION = gql`
	mutation AddPhoto($input: PhotoInput!) {
		addPhoto(input: $input) {
			id
			uri
			modele {
				id
				stage_name
			}
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
