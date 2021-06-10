import gql from "graphql-tag"

export const FETCH_HOME_SCREEN = gql`
	query homescreenData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
		models(take: $take, page: $page, orderBy: $orderBy) {
			data {
				hash
				poster
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
				created_at
				model {
					stageName
					hash
					poster
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
					poster
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
					poster
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
						poster
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
				created_at
				model {
					stageName
					poster
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
				created_at
				model {
					stageName
					poster
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
				created_at
				messages {
					text
				}
				chatUser {
					id
					name
					avatar
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
			poster
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
				poster
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
				poster
				artist {
					hash
					stage_name
				}
			}
			artists {
				hash
				stage_name
				poster
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

export const FACEBOOK_LOGIN_URL = gql`
	query facebookLoginUrl {
		facebookLoginUrl {
			url
		}
	}
`
