import { Channel } from "phoenix"
import { useState, useEffect } from "react"

import useStore, { AppStateInterface } from "../store"

type Props = [channel: Channel, reponse: any]

const useChannel = (channelName: string): Props => {
	const { socket } = useStore(({ socket }: AppStateInterface) => ({ socket }))
	const [channel, setChannel] = useState<Channel>()
	const [okResponse, setokResponse] = useState({})

	useEffect(() => {
		if (!socket) return

		const phoenixChannel = socket.channel(channelName)

		phoenixChannel
			.join()
			.receive("ok", (response) => {
				setChannel(phoenixChannel)
				setokResponse(response)
			})
			.receive("error", ({ reason }) => console.log("failed join", reason))
			.receive("timeout", () =>
				console.log("Networking issue. Still waiting...")
			)

		// leave the channel when the component unmounts
		return () => {
			phoenixChannel.leave()
		}
	}, [socket])
	// only connect to the channel once on component mount
	// by passing the empty array as a second arg to useEffect

	return [channel, okResponse]
}

export { useChannel }
