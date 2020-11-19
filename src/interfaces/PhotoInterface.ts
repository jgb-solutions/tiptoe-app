export default interface PhotoInterface {
	caption: string
	hash: string
	url: string
	featured: boolean
	detail: string
	likeCount: number
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
