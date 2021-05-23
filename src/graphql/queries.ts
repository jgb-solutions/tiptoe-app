import gql from "graphql-tag"

export const FETCH_HOME_SCREEN = gql`
	query homescreenData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
		models(take: $take, page: $page, orderBy: $orderBy) {
			data {
				hash
				posterUrl
				stageName
				name
			}
		}

		photos(take: $take, page: $page, orderBy: $orderBy) {
			data {
				hash
				caption
				url
				likesCount
				insertedAt
				model {
					stageName
					hash
					posterUrl
				}
			}
		}
	}
`

export const FETCH_MANAGE_SCREEN = gql`
	query managePageData($page: Int, $take: Int) {
		me {
			latestTracks: tracks(take: $take, page: $page) {
				data {
					hash
					title
					posterUrl
					artist {
						stage_name
						hash
					}
				}
			}

			latestPlaylists: playlists(take: $take, page: $page) {
				data {
					hash
					title
					cover_url
				}
			}

			latestArtists: artists(take: $take, page: $page) {
				data {
					stage_name
					hash
					posterUrl
				}
			}

			latestAlbums: albums(take: 10, page: $page) {
				data {
					title
					hash
					cover_url
					artist {
						stage_name
						hash
						posterUrl
					}
				}
			}
		}
	}
`

export const FETCH_PHOTOS = gql`
	query photosData(
		$page: Int
		$take: Int
		$orderBy: [OrderByClause!]
		$modelHash: String
		$random: Boolean
	) {
		# Latest 10 photos
		photos(
			take: $take
			page: $page
			orderBy: $orderBy
			modelHash: $modelHash
			random: $random
		) {
			data {
				id
				hash
				caption
				url
				likesCount
				likedByMe
				insertedAt
				model {
					stageName
					posterUrl
					hash
				}
			}
			paginationInfo {
				hasMorePages
				currentPage
			}
		}
	}
`

export const FETCH_FAVORITE_PHOTOS = gql`
	query favoritePhotosData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
		favoritePhotos(take: $take, page: $page, orderBy: $orderBy) {
			data {
				id
				hash
				caption
				url
				likesCount
				likedByMe
				insertedAt
				model {
					stageName
					posterUrl
					hash
				}
			}
			paginationInfo {
				hasMorePages
				currentPage
			}
		}
	}
`

export const FETCH_ROOMS = gql`
	query roomsData {
		me {
			rooms {
				id
				insertedAt
				messages {
					text
				}
				chatUser {
					id
					name
					avatarUrl
					type
					modelHash
				}
			}
		}
	}
`

export const FETCH_MODEL = gql`
	query modelDetail($hash: String!) {
		model(hash: $hash) {
			id
			name
			stageName
			posterUrl
			facebook
			hash
			instagram
			photosCount
			followersCount
			followedByMe
			roomWithMe {
				id
			}
		}
	}
`

export const FETCH_MODELS = gql`
	query modelsData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
		# Latest 10 Models
		models(take: $take, page: $page, orderBy: $orderBy) {
			data {
				hash
				posterUrl
				stageName
				name
			}

			paginationInfo {
				hasMorePages
				currentPage
			}
		}
	}
`

export const FETCH_CATEGORIES = gql`
	query categories {
		id
		name
		slug
	}
`

export const FETCH_DOWNLOAD_URL = gql`
	query download($input: DownloadInput!) {
		download(input: $input) {
			url
		}
	}
`

export const SEARCH_QUERY = gql`
	query search($query: String!) {
		search(query: $query) {
			tracks {
				hash
				title
				posterUrl
				artist {
					hash
					stage_name
				}
			}
			artists {
				hash
				stage_name
				posterUrl
			}
			albums {
				hash
				title
				cover_url
				artist {
					hash
					stage_name
				}
			}
		}
	}
`

export const LOG_USER_IN = gql`
	query logUserIn($input: LoginInput!) {
		login(input: $input) {
			token
			data {
				id
				active
				admin
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
		}
	}
`

export const FACEBOOK_LOGIN_URL = gql`
	query facebookLoginUrl {
		facebookLoginUrl {
			url
		}
	}
`
