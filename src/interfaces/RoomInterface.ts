export default interface RoomInterface {
	id: string
	created_at: Date
	messages: {
		text: string
	}[]
	chatUser: {
		id: string
		name: string
		avatar: string
	}
}
