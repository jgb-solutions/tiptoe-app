import RoomInterface from "./RoomInterface"

export default interface ModelInterface {
	id: string
	stageName: string
	hash: string
	posterUrl: string
	bio: string
	facebook: string
	twitter: string
	youtube: string
	instagram: string
	photosCount: number
	followersCount: number
	followedByMe: boolean
	roomWithMe?: RoomInterface
}
