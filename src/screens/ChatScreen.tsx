import React, { useCallback, useEffect, useState } from 'react'
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch
} from 'native-base'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

import Page from '../components/layouts/Page'
import { useChannel } from '../hooks/useChannel'
import { CHANNELS, SOCKET_EVENTS } from '../utils/constants'
import IMessageInterface from '../interfaces/IMessageInterface'

const userId = Math.floor(Math.random() * 3) + 1

type ReponseMessage = {
  id: number
  text: string
  createdAt: Date
  user: {
    id: number
    name: string
    avatar?: string
  }
}

export const mapMessageCollectionFromResponse = (messages: ReponseMessage[]) => messages.map(message => mapMessageFromResponse(message))

export const mapMessageFromResponse = (message: ReponseMessage) => ({
  _id: message.id,
  text: message.text,
  createdAt: new Date(message.createdAt),
  user: {
    _id: message.user.id,
    name: message.user.name,
    avatar: message.user.avatar || "https://placeimg.com/140/140/any"
  }
})

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [RoomGeneralChannel, okReponse] = useChannel(`${CHANNELS.ROOM}:general`)

  useEffect(() => {
    // alert(`last twenty message ${JSON.stringify(okReponse)}`)
    if (okReponse.messages) {
      setMessages(previousMessages => GiftedChat.prepend(
        previousMessages,
        mapMessageCollectionFromResponse(
          JSON.parse(okReponse.messages)
        )))
    }
  }, [okReponse])

  useEffect(() => {
    if (!RoomGeneralChannel) return

    const channelEvent = RoomGeneralChannel.on(SOCKET_EVENTS.NEW_MESSAGE, newMessage => {
      const iMessage = mapMessageFromResponse(newMessage)

      setMessages(previousMessages => GiftedChat.append(previousMessages, [iMessage]))
    })

    return () => {
      RoomGeneralChannel.off(SOCKET_EVENTS.NEW_MESSAGE, channelEvent)
    }
  }, [RoomGeneralChannel])

  const onSend = useCallback((newMessages = []) => {
    newMessages.forEach((message: IMessageInterface) => {
      RoomGeneralChannel?.push(SOCKET_EVENTS.NEW_MESSAGE, {
        text: message.text,
        userId: message.user._id,
        // roomID:
      })
      // .receive("ok", (msg) => console.log("created message", msg))
      // .receive("error", (reasons) => console.log("create failed", reasons))
      // .receive("timeout", () => console.log("Networking issue..."))
    })
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }, [RoomGeneralChannel])

  return (
    <Page noLeft noRight contentStyle={{ flex: 1 }}>
      <GiftedChat
        // messagesContainerStyle={{ flex: 1 }}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
          name: "Jean Gérard"
        }}
      />
    </Page>
  )
}