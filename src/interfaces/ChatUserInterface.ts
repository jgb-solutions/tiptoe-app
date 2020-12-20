export default interface ChatUserInterface {
	id: string
	name: string
	avatarUrl: string
	type: "user" | "model"
	modelHash?: string
}
