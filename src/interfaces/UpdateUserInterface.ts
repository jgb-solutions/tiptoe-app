import UpdateModelInterface from "./UpdateModelInterface"

export default interface UpdateUserInterface {
  id?: string
  active?: boolean
  first_login?: boolean
  admin?: boolean
  avatar?: string
  email?: string
  modele?: {
    update?: UpdateModelInterface
  }
  name?: string
  telephone?: string
  user_type?: string
  gender?: string
}
