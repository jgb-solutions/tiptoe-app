import { Dimensions, Platform } from "react-native"

export const APP_NAME = `TipToe`

const API_HOST = Platform.OS == 'android' ? '10.0.2.2' : undefined

// Air Fiber
// export const API_URL = `http://192.168.0.102:4000`
// export const SOCKET_URL = `ws://192.168.0.102:4000/socket`

// NouKod Media
export const API_URL = `http://10.228.149.147:4000`
export const SOCKET_URL = `ws://10.228.149.147:4000/socket`

// Localhost
// export const API_URL = `http://${API_HOST || 'localhost'}:4000`
// export const SOCKET_URL = `ws://${API_HOST || 'localhost'}:4000/socket`

// Production
// export const API_URL = `https://api.tiptoe.app`
// export const SOCKET_URL = `wss://ws.tiptoe.app/socket`

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