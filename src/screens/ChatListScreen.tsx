import React from "react"
import { FlatList } from "react-native"
import {
  Body,
  Left,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail
} from "native-base"
import { useQuery } from "@apollo/react-hooks"
import { useNavigation } from "@react-navigation/native"

import { colors } from "../utils/colors"
import Page from "../components/layouts/Page"
import { screenNames } from "../utils/screens"
import { FETCH_ROOMS } from "../graphql/queries"
import RoomInterface from "../interfaces/RoomInterface"
import NegativeResponse from "../components/NegativeResponse"
import dayjs from "dayjs"

export default function ChatListScreen() {
  const navigation = useNavigation()
  const { loading, error, data, refetch } = useQuery(FETCH_ROOMS)

  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      refetch()
    })

    return () => {
      unsubscribeFocus()
    }
  }, [navigation])

  const handleGoToChatScreen = (room: RoomInterface) => {
    navigation.navigate(screenNames.Chat, { room })
  }

  return (
    <Page
      noRight
      leftStyle={{ flex: 0 }}
      noContent
    >
      {loading ? (
        <Spinner color={colors.pink} />
      ) : error ? (
        <NegativeResponse>
          <Text>An error occurred</Text>
        </NegativeResponse>
      ) : (
            <FlatList
              ListEmptyComponent={() => (
                <NegativeResponse>
                  <Text>You have no chats yet.</Text>
                </NegativeResponse>
              )}
              data={data.me.rooms}
              keyExtractor={(room) => `${room.id}`}
              renderItem={({ item: room }: { item: RoomInterface }) => (
                <ListItem avatar onPress={() => handleGoToChatScreen(room)}>
                  <Left>
                    <Thumbnail source={{ uri: room.chatUser.avatarUrl }} />
                  </Left>
                  <Body>
                    <Text>{room.chatUser.name}</Text>
                    <Text note>{room.messages.length > 0 ? room.messages[0].text.substr(0, 39) : null}...</Text>
                  </Body>
                  <Right style={{ borderColor: 'transparent' }}>
                    <Text note>{dayjs(room.insertedAt).fromNow()}</Text>
                  </Right>
                </ListItem>
              )}
              onRefresh={() => refetch()}
              refreshing={loading}
              onEndReachedThreshold={.9}
            />
          )}
    </Page>
  )
}