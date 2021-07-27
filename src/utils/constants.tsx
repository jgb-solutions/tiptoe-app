import { Dimensions } from "react-native"

import { API_URL } from "@env"

console.log(API_URL)
export const APP_NAME = `TipToe`

// const LOCAL_API_HOST = Platform.OS == 'android' ? '10.0.2.2' : undefined

console.log("api url", API_URL)
// GraphQL URL
export const GRAPHQL_API_URL = `${API_URL}/graphql`
console.log(GRAPHQL_API_URL)

export const SOCKET_EVENTS = {
  SHOW_TOAST: "show_toast",
  NEW_MESSAGE: "new_message",
}

export const CHANNELS = {
  ROOM: "room",
}

export const SUBSCRIPTION_TOPICS = {
  PHOTO_UNLIKED: "photo_unliked",
  NEW_PHOTO: "new_photo",
}

export const HOMEPAGE_PER_PAGE_NUMBER = 12
export const FETCH_PHOTOS_NUMBER = 24
export const FETCH_MODELS_NUMBER = 24
export const FETCH_FAVORITE_PHOTOS_NUMBER = 24

export const SCREEN_WIDTH = Dimensions.get("window").width
export const SCREEN_HEIGHT = Dimensions.get("window").height
