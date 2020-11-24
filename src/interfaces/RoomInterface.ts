export default interface RoomInterface {
	id: string
	messages: {
		text: string
	}[]
	chatUser: {
		id: string
		name: string
		avatarUrl: string
	}
}
