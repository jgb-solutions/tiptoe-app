import ModelInterface from "./ModelInterface"

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
	telephone: string
	updatedAt: Date
}
