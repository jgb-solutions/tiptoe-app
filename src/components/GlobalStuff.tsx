import { useEffect } from "react"
import { Socket } from "phoenix"
import { Toast } from "native-base"

import useStore, { AppStateInterface } from "../store"
import { useChannel } from "../hooks/useChannel"
import { SOCKET_EVENTS } from '../utils/constants'
import { SOCKET_URL } from "../utils/constants"

export default function GlobalStuff() {
  const { isLoggedIn, socket, token, logout } = useStore((state: AppStateInterface) =>
    ({
      isLoggedIn: state.authData.isLoggedIn,
      socket: state.socket,
      token: state.authData.token,
      logout: state.doLogout
    }))

  const [notificationsChannel] = useChannel('notifications')

  const showToast = (message = 'default message') => {
    Toast.show({
      text: message,
      // buttonText: 'OK',
      duration: 4000,
      // position: "top"
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      const socket = new Socket(SOCKET_URL, {
        params: {
          token
        }
      })
      socket.onError(error => {
        if (error) {
          if (!error.isTrusted) {
            Toast.show({
              text: "Your connection is unstable..",
              duration: 4000,
            })
          }

          if (error.message.includes("403")) {
            Toast.show({
              text: "Your session has expired. Please log in again.",
              duration: 4000,
            })

            logout()
          }
        }
      })

      socket.connect()
      useStore.setState({ socket })
    } else {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (!notificationsChannel) return

    const channelEvent = notificationsChannel.on(SOCKET_EVENTS.SHOW_TOAST, (response) => {
      showToast(response.message)
    })

    return () => {
      notificationsChannel.off(SOCKET_EVENTS.SHOW_TOAST, channelEvent)
    }
  }, [notificationsChannel])

  return null
}