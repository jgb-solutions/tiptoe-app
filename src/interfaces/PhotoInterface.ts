export default interface PhotoInterface {
	id: string
	caption: string
	hash: string
	url: string
	featured: boolean
	detail: string
	likesCount: number
	likedByMe: boolean
	insertedAt: Date
	category: {
		name: string
		slug: string
	}
	model: {
		stageName: string
		hash: string
		posterUrl: string
	}
}
