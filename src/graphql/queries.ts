import gql from "graphql-tag"

export const FETCH_HOME_SCREEN = gql`
	query homescreenData($page: Int, $take: Int, $orderBy: [OrderByClause!]) {
		modeles(page: $page, first: $take, orderBy: $orderBy) {
			data {
				id
				hash
				poster
				stage_name
			}
		}

		photos(page: $page, first: $take, orderBy: $orderBy) {
			data {
				id
				hash
				caption
				uri
				bucket
				type
				likes_count
				liked_by_me
				for_my_modele
				created_at
				modele {
					stage_name
					hash
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
				bucket
				type
				modele {
					stage_name
					poster
					hash
				}

				likes_count
				liked_by_me
				is_for_me
				for_my_modele
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
		$page: Int
		$first: Int
		$orderBy: [OrderByClause!]
	) {
		favoritePhoto(page: $page, first: $first, orderBy: $orderBy) {
			data {
				id
				uri
				bucket
				type
				hash
				caption
				created_at
				modele {
					id
					stage_name
					poster
				}
				likes_count
				liked_by_me
				# is_for_me
			}
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
				hash
				followed_by_me
				followers {
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
	query modelDetail($hash: String) {
		modele(hash: $hash) {
			id
			stage_name 
			poster
			facebook
			hash
			instagram
			followed_by_me
			photos {
				id
				uri
				bucket
				type
				likes_count
				liked_by_me
				# is_for_me
			}
			followers {
				id
				name
			}
		}

		getModelPrice(hash: $hash){
			price
		}
	}
`

export const FETCH_CATEGORIES = gql`
	query categories {
		categories {
			id
			name
			slug
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

export const GETPUBLISHABLEKEY = gql`
	query getPublishableKey{
		getPublishableKey{
			key
		}
  }
`

export const CREATEPAYMENTINTENT = gql`
	query createPaymentIntent{
		createPaymentIntent{
			client_secret
		}
  }
`

export const BILLING = gql`
	query billingInformation {
		createPaymentIntent{
			client_secret
		}

		myCards{
			id
			last4
			exp_month
			exp_year
		}

	}
`