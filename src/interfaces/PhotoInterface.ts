export default interface PhotoInterface {
	type: string;
	id: string
	caption: string
	hash: string
	uri: string
	featured: boolean
	detail: string
	likes_count: number
	liked_by_me: boolean
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
	users: {
		id: String
		name: String
		length: any
	}
}
