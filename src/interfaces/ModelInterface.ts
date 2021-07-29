import RoomInterface from "./RoomInterface"
import PhotoInterface from "./PhotoInterface"
import ModelAccountInterface from "./ModelAccountInterface"

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
  modele_account_data: ModelAccountInterface
  facebook: string
  twitter: string
  youtube: string
  instagram: string
  photos: PhotoInterface
  followers: FollowerInterface
  followed_by_me: boolean
  roomWithMe?: RoomInterface
  new_follower_count?: number
  followers_count?: number
  photos_count?: number
}
