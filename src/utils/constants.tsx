import { Dimensions, Platform } from "react-native"
// import {API_URL_ENV} from '@env'
const API_URL_ENV = "https://staging-api.tiptoe.app"
export const APP_NAME = `TipToe`

// const API_HOST = '192.168.2.205'
const API_HOST = Platform.OS == 'android' ? '10.0.2.2' : undefined

let API_URL_ = `${API_URL_ENV}`

export const API_URL = API_URL_


// GraphQL URL
export const GRAPHQL_API_URL = `${API_URL}/graphql`

export const SOCKET_EVENTS = {
  SHOW_TOAST: "show_toast",
  NEW_MESSAGE: "new_message"
}

export const CHANNELS = {
  ROOM: "room"
}

export const SUBSCRIPTION_TOPICS = {
  PHOTO_UNLIKED: "photo_unliked",
  NEW_PHOTO: "new_photo"
}

export const HOMEPAGE_PER_PAGE_NUMBER = 12
export const FETCH_PHOTOS_NUMBER = 24
export const FETCH_MODELS_NUMBER = 24
export const FETCH_FAVORITE_PHOTOS_NUMBER = 24

export const SCREEN_WIDTH = Dimensions.get('window').width