import ModelInterface from "./ModelInterface"
import PhotoInterface from "./PhotoInterface"

export default interface UserInterface {
  active: boolean
  admin: boolean
  avatarUrl: string
  email: string
  firstLogin: boolean
  id: string
  insertedAt: Date
  model?: ModelInterface
  name: string
  photos?: PhotoInterface[]
  telephone: string
  updatedAt: Date
}