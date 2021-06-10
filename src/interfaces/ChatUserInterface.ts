export default interface ChatUserInterface {
	id: string
	name: string
	avatar: string
	type: "user" | "model"
	modelHash?: string
}
