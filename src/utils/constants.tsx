import Constants from 'expo-constants'
import { Dimensions, Platform } from "react-native"

export const APP_NAME = `TipToe`

// const API_HOST = '192.168.2.205'
const API_HOST = Platform.OS == 'android' ? '10.0.2.2' : undefined


let API_URL_ = ''
let SOCKET_URL_ = ''

const expoEnv = Constants.manifest.env

// if (expoEnv && expoEnv.EXPO_APP_ENV) {
//   switch (Constants.manifest.env.EXPO_APP_ENV) {
//     case 'lan':
//       // Air Fiber
//       // export const API_URL_ = `http://192.168.0.102:4000`
//       // export const SOCKET_URL_ = `ws://192.168.0.102:4000/socket`

//       // NouKod Media
//       API_URL_ = `http://10.228.149.147:4000`
//       SOCKET_URL_ = `ws://10.228.149.147:4000/socket`
//       break
//     default:
//       API_URL_ = `http://${API_HOST || 'localhost'}:4000`
//       SOCKET_URL_ = `ws://${API_HOST || 'localhost'}:4000/socket`
//       break
//   }
// } else {
//   API_URL_ = `https://api.tiptoe.app`
//   SOCKET_URL_ = `wss://ws.tiptoe.app/socket`
// }


API_URL_ = `http://${API_HOST || 'localhost'}:4000`
SOCKET_URL_ = `ws://${API_HOST || 'localhost'}:4000/socket`

export const API_URL = API_URL_
export const SOCKET_URL = SOCKET_URL_


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