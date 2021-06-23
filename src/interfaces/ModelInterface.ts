import RoomInterface from "./RoomInterface"
import PhotoInterface from "./PhotoInterface"

interface FollowerInterface {
	id: string
	user_id: string
	modele_id: string
    created_at: string
    updated_at: string
	length: any
}

export default interface ModelInterface {
	id: string
	stage_name: string
	hash: string
	poster: string
	bio: string
	facebook: string
	twitter: string
	youtube: string
	instagram: string
	photos: PhotoInterface
	followers: FollowerInterface
	followedByMe: boolean
	roomWithMe?: RoomInterface
	map: any
}
