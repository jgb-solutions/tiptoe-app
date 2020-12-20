import React from "react"
import {
  Body,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail
} from "native-base"
import { useNavigation } from "@react-navigation/native"
import { useQuery } from "@apollo/react-hooks"

import Page from "../components/layouts/Page"
import { screenNames } from "../utils/screens"
import { colors } from "../utils/colors"
import { FETCH_ROOMS } from "../graphql/queries"
import RoomInterface from "../interfaces/RoomInterface"
import NegativeResponse from "../components/NegativeResponse"

export default function ChatListScreen() {
  const navigation = useNavigation()
  const { loading, error, data, refetch } = useQuery(FETCH_ROOMS)

  const handleGoToChatScreen = (room: RoomInterface) => {
    navigation.navigate(screenNames.Chat, { room })
  }

  return (
    <Page
      noRight
      leftStyle={{ flex: 0 }}
    >
      {loading ? (
        <Spinner color={colors.pink} />
      ) : error ? (
        <NegativeResponse>
          <Text>An error occurred</Text>
        </NegativeResponse>
      ) : data.me.rooms.length ? (
        <List>
          {data.me.rooms.map((room: RoomInterface) => (
            <ListItem avatar key={room.id} onPress={() => handleGoToChatScreen(room)}>
              <Left>
                <Thumbnail source={{ uri: room.chatUser.avatarUrl }} />
              </Left>
              <Body>
                <Text>{room.chatUser.name}</Text>
                <Text note>{room.messages.length > 0 ? room.messages[0].text.substr(0, 39) : null}...</Text>
              </Body>
              <Right style={{ borderColor: 'transparent' }}>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      ) : (
              <NegativeResponse>
                <Text>You have no chats yet.</Text>
              </NegativeResponse>
            )}
    </Page>
  )
}