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

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [RoomGeenralChannel] = useChannel(`${CHANNELS.ROOM}:general`)

  // useEffect(() => {
  //   alert(messages.length)
  // }, [messages])

  useEffect(() => {
    if (!RoomGeenralChannel) return

    const channelEvent = RoomGeenralChannel.on(SOCKET_EVENTS.NEW_MESSAGE, (newMessage) => {
      const iMessage = {
        _id: newMessage.id,
        text: newMessage.text,
        createdAt: new Date(),
        user: {
          _id: newMessage.user.id,
          name: newMessage.user.name,
          avatar: 'https://previews.123rf.com/images/webstocker/webstocker1711/webstocker171100043/89827827-gold-coin-with-letter-j-design-.jpg',
          // https://placeimg.com/140/140/any
        }
      }

      setMessages(previousMessages => GiftedChat.append(previousMessages, [iMessage]))
    })

    return () => {
      RoomGeenralChannel.off(SOCKET_EVENTS.NEW_MESSAGE, channelEvent)
    }
  }, [RoomGeenralChannel])

  const onSend = useCallback((newMessages = []) => {
    // alert(JSON.stringify(newMessages))
    newMessages.forEach((message: IMessageInterface) => {
      RoomGeenralChannel?.push(SOCKET_EVENTS.NEW_MESSAGE, {
        text: message.text,
        userId: message.user._id,
        createdAt: message.createdAt
      })
    })
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }, [])

  return (
    // <Page noLeft noRight contentStyle={{ flex: 1 }}>
    <GiftedChat
      // messagesContainerStyle={{ flex: 1 }}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    // </Page>
  )
}