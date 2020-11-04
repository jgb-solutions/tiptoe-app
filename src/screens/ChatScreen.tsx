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

const userId = Math.floor(Math.random() * 2) + 1

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [RoomGeneralChannel] = useChannel(`${CHANNELS.ROOM}:general`)

  // useEffect(() => {
  //   alert(messages.length)
  // }, [messages])

  useEffect(() => {
    if (!RoomGeneralChannel) return

    const channelEvent = RoomGeneralChannel.on(SOCKET_EVENTS.NEW_MESSAGE, newMessage => {
      const iMessage = {
        _id: newMessage.id,
        text: newMessage.text,
        createdAt: new Date(),
        user: {
          _id: newMessage.user.id,
          name: newMessage.user.name,
          avatar: "https://placeimg.com/140/140/any"
        }
      }

      setMessages(previousMessages => GiftedChat.append(previousMessages, [iMessage]))
    })

    return () => {
      RoomGeneralChannel.off(SOCKET_EVENTS.NEW_MESSAGE, channelEvent)
    }
  }, [RoomGeneralChannel])

  const onSend = useCallback((newMessages = []) => {
    // alert(JSON.stringify(newMessages))
    newMessages.forEach((message: IMessageInterface) => {
      // alert('run')
      RoomGeneralChannel?.push(SOCKET_EVENTS.NEW_MESSAGE, {
        text: message.text,
        userId: message.user._id,
        createdAt: message.createdAt
      })
        .receive("ok", (msg) => console.log("created message", msg))
        .receive("error", (reasons) => console.log("create failed", reasons))
        .receive("timeout", () => console.log("Networking issue..."))
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
          _id: userId
        }}
      />
    </Page>
  )
}