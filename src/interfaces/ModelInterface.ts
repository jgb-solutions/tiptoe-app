import RoomInterface from "./RoomInterface"

export default interface ModelInterface {
	id: string
	name: string
	stageName: string
	hash: string
	posterUrl: string
	bio: string
	facebookUrl: string
	twitterUrl: string
	instagramUrl: string
	photosCount: number
	followersCount: number
	followedByMe: boolean
	roomWithMe?: RoomInterface
}
