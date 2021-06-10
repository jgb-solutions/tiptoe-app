export default interface PhotoInterface {
	id: string
	caption: string
	hash: string
	url: string
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
	model: {
		stage_name: string
		hash: string
		poster: string
	}
}
