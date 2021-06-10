export default interface PhotoInterface {
	id: string
	caption: string
	has: string
	uri: string
	featured: boolean
	detail: string
	likesCount: number
	likedByMe: boolean
	created_at: Date
	length: any
	category: {
		name: string
		slug: string
	}
	modele: {
		stage_name: string
		hash: string
		poster: string
	}
}
