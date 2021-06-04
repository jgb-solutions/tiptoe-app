import { useEffect } from "react"
import { Socket } from "phoenix"

import { showToast } from "../utils"
import { SOCKET_URL } from "../utils/constants"
import { useChannel } from "../hooks/useChannel"
import { SOCKET_EVENTS } from "../utils/constants"
import useStore, { AppStateInterface } from "../store"

export default function GlobalStuff() {
	const { isLoggedIn, socket, access_token, logout } = useStore(
		(state: AppStateInterface) => ({
			isLoggedIn: state.authData.isLoggedIn,
			socket: state.socket,
			access_token: state.authData.access_token,
			logout: state.doLogout,
		})
	)

	const [notificationsChannel] = useChannel("notifications")

	useEffect(() => {
		if (isLoggedIn) {
			const socket = new Socket(SOCKET_URL, {
				params: {
					access_token,
				},
			})
			socket.onError((error) => {
				if (error) {
					if (!error.isTrusted) {
						showToast("Your connection is unstable..", {
							duration: 4000,
						})
					}

					if (error.message.includes("403")) {
						showToast("Your session has expired. Please log in again.", {
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

		const channelEvent = notificationsChannel.on(
			SOCKET_EVENTS.SHOW_TOAST,
			(response) => {
				showToast(response.message)
			}
		)

		return () => {
			notificationsChannel.off(SOCKET_EVENTS.SHOW_TOAST, channelEvent)
		}
	}, [notificationsChannel])

	return null
}
