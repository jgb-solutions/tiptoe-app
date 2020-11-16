import React, { useCallback, useEffect, useState } from 'react'
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat'
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'


import { useChannel } from '../hooks/useChannel'
import { CHANNELS, SOCKET_EVENTS } from '../utils/constants'
import IMessageInterface from '../interfaces/IMessageInterface'
import useStore, { AppStateInterface } from '../store'
import { colors } from '../utils/colors'

export type ReponseMessage = {
  id: string
  text: string
  createdAt: Date
  user: {
    id: string
    name: string
    avatar_url?: string
  }
}

export const mapMessageCollectionFromResponse = (messages: ReponseMessage[]) => messages.map(message => mapMessageFromResponse(message))

export const mapMessageFromResponse = (message: ReponseMessage) => ({
  _id: message.id,
  text: message.text,
  createdAt: new Date(message.createdAt),
  // image: "https://hexdocs.pm/phoenix/assets/logo.png",
  // system: true,
  user: {
    _id: `${message.user.id}`,
    name: message.user.name,
    avatar: message.user.avatar_url
  }
})

type RouteParamsProps = RouteProp<{
  params: {
    roomId: string
    user: {
      name: string
      avatar: string
      id: number
    }
  }
}, 'params'>

export default function ChatScreen() {
  const navigation = useNavigation()
  const route = useRoute<RouteParamsProps>()

  const chatUser = route.params.user
  const roomId = route.params.roomId

  const [messages, setMessages] = useState<IMessage[]>([])
  const [RoomGeneralChannel, okReponse] = useChannel(`${CHANNELS.ROOM}:general`)
  const userData = useStore((state: AppStateInterface) => state.authData.data)

  useEffect(() => {
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

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.black}
        style={{ backgroundColor: colors.pink }}>
        <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Button transparent>
            <Icon name='chatbubbles' style={{ color: colors.white }} />
          </Button> */}
          <Button transparent onPress={goBack}>
            <Icon name='arrow-back' style={{ color: colors.white }} />
          </Button>

          <Thumbnail
            small
            source={{ uri: chatUser.avatar }}
            style={{ marginRight: 5, }}
          />
          <Text style={{
            fontWeight: 'bold', color: colors.white
          }}>{chatUser.name}</Text>
        </Left>
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={() => alert('pressed more')}>
            <Icon name='more' style={{ color: colors.white }} />
          </Button>
        </Right>
      </Header>
      {userData && (
        <GiftedChat
          // messagesContainerStyle={{ flex: 1 }}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: userData.id,
            name: userData.name,
            avatar: userData.avatarUrl
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  left: {
                    color: colors.white,
                  },
                  right: {
                    color: colors.white,
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: colors.pink,
                  },
                  right: {
                    backgroundColor: colors.pink,
                  }
                }}
              />
            )
          }}

          onPressAvatar={user => {
            alert(JSON.stringify(user))
          }}

          renderLoadEarlier={() => (<Text>Load earlier messages</Text>)}
        />
      )}
    </Container >
  )
}