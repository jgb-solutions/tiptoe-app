export default interface RoomInterface {
	id: string
	insertedAt: Date
	messages: {
		text: string
	}[]
	chatUser: {
		id: string
		name: string
		avatarUrl: string
	}
}
