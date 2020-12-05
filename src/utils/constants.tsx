import { Platform } from "react-native"

export const APP_NAME = `TipToe`

const API_HOST = Platform.OS == 'android' ? '10.0.2.2' : undefined

// Air Fiber
// export const API_URL = `http://192.168.0.102:4000/api`
// export const SOCKET_URL = `ws://192.168.0.102:4000/socket`

// NouKod Media
export const API_URL = `http://10.228.149.147:4000/api`
export const SOCKET_URL = `ws://10.228.149.147:4000/socket`

// Localhost
// export const API_URL = `http://${API_HOST || 'localhost'}:4000/api`
// export const SOCKET_URL = `ws://${API_HOST || 'localhost'}:4000/socket`

// Production
// export const API_URL = `https://tiptoe.app/api`
// export const SOCKET_URL = `wss://ws.tiptoe.app/socket`

export const SOCKET_EVENTS = {
  SHOW_TOAST: "show_toast",
  NEW_MESSAGE: "new_message"
}

export const CHANNELS = {
  ROOM: "room"
}

export const HOMEPAGE_PER_PAGE_NUMBER = 12
export const FETCH_PHOTOS_NUMBER = 24