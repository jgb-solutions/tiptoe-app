export const APP_NAME = `TipToe`

// Air Fiber
// export const API_URL = `http://192.168.0.102:4000/api`
// export const SOCKET_URL = `ws://192.168.0.102:4000/socket`
// Localhost
export const API_URL = `http://localhost:4000/api`
export const SOCKET_URL = `ws://localhost:4000/socket`
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