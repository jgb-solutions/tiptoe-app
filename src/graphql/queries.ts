import gql from "graphql-tag"

export const FETCH_HOME_SCREEN = gql`
	query homescreenData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
		modeles(
			page: $page
			first: $take
			orderBy: $orderBy
		) {
			data {
				id
				has
				poster
				stage_name
			}
		}

		photos(page: $page, first: $take, orderBy: $orderBy) {
			data {
				id
				has
				caption
				uri
				likes_count 
				liked_by_me
				created_at
				modele {
					stage_name
					has
					poster
				}
			}
		}
	}
`

export const FETCH_PHOTOS = gql`
	query {
		photos(page: 1, first: 10, orderBy: { column: "created_at", order: DESC }) {
			data {
				id
				uri
				modele {
					stage_name
					poster
					has
				}
				
				likes_count 
				liked_by_me
				category {
					name
				}
			}
			paginatorInfo {
				currentPage
				lastPage
			}
		}
	}
`

export const FETCH_FAVORITE_PHOTOS = gql`
	query favoritePhotosData(
		$user_id: Int
		$page: Int
		$first: Int
		$orderBy: [OrderByClause!]
	) {
		favoritePhoto(user_id: $user_id, page: $page, first: $first, orderBy: $orderBy) {
			id
			uri
			has 
			caption
			created_at
			modele {
				id 
				stage_name
				poster 
			}
			likes_count 
			liked_by_me
		}
	}
`

export const FETCH_MODELS = gql`
	query modeles($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
		modeles(page: $page, first: $take, orderBy: $orderBy) {
			data {
				id
				stage_name
				poster
				followers{
					id 
					name
				}
			}
			paginatorInfo {
				currentPage
				lastPage
			}
		}
	}
`

export const FETCH_MODEL = gql`
	query modelDetail($id: ID) {
		modele(id: $id) {
			id
			stage_name
			poster
			facebook
			has
			instagram
			photos {
				id
				uri
			}
			followers {
				id
				name
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
