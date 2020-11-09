import { useEffect } from "react"
import { Socket } from "phoenix"
import { Toast } from "native-base"

import useStore, { AppStateInterface } from "../store"
import { useChannel } from "../hooks/useChannel"
import { SOCKET_EVENTS } from '../utils/constants'
import { SOCKET_URL } from "../utils/constants"

export default function GlobalStuff() {
  const { isLoggedIn, socket, token } = useStore((state: AppStateInterface) =>
    ({
      isLoggedIn: state.authData.isLoggedIn,
      socket: state.socket,
      token: state.authData.token
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