import React from "react"
import { View } from "react-native"
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

export default function ChatListScreen() {
  const navigation = useNavigation()
  const { loading, error, data, refetch } = useQuery(FETCH_ROOMS)

  React.useEffect(() => {
    console.log(`data has arrived`, data)
  }, [data])

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
        <Text>An error occurred</Text>
      ) : data.me.rooms.length ? (
        <List>
          {data.me.rooms.map((room: RoomInterface) => (
            <ListItem avatar key={room.id} onPress={() => handleGoToChatScreen(room)}>
              <Left>
                <Thumbnail source={{ uri: room.chatUser.avatarUrl }} />
              </Left>
              <Body>
                <Text>{room.chatUser.name}</Text>
                <Text note>{room.messages.map(m => m.text).join(', ')}</Text>
              </Body>
              <Right style={{ borderColor: 'transparent' }}>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      ) : (
              <View style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 12
              }}>
                <Text>You have no chats yet.</Text>
              </View>
            )}
    </Page>
  )
}