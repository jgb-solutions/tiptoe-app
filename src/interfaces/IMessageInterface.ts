export default interface IMessage {
  _id: string | number
  text: string
  createdAt: Date | number
  user: {
    _id: number
    name: string
    avatar: string
  }
  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
  // quickReplies?: QuickReplies
}