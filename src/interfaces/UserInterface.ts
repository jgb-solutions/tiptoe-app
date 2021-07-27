import ModelInterface from "./ModelInterface"

export default interface UserInterface {
	active: boolean
	admin: boolean
	avatar: string
	email: string
	first_login: boolean
	id: string
	created_at: Date
	modele?: ModelInterface
	modeles?: ModelInterface
	name: string
	telephone: string
	user_type: string 
	gender: string
	updated_at: Date
	pm_last_four: string
}
