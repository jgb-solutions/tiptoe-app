import React from "react"
import { Body, Left, List, ListItem, Right, Text, Thumbnail } from "native-base"
import { useNavigation } from "@react-navigation/native"

import Page from "../components/layouts/Page"
import { screenNames } from "../utils/screens"
import { colors } from "../utils/colors"

export default function ChatListScreen() {
  const navigation = useNavigation()

  const handleGoToChatScreen = (roomId: number) => {
    const userId = roomId

    navigation.navigate(screenNames.Chat, {
      roomId,
      user: {
        name: `User ${userId}`,
        avatar: "https://placeimg.com/140/140/any",
        id: userId
      }
    })
  }

  return (
    <Page
      noRight
      leftStyle={{ flex: 0 }}
    // title={<Text
    //   style={{
    //     color: colors.white,
    //     fontWeight: 'bold'
    //   }}>Messages</Text>}
    >
      <List>
        {new Array(5).fill(0).map((number, index) => (
          <ListItem avatar key={index} onPress={() => handleGoToChatScreen(index)}>
            <Left>
              <Thumbnail source={{ uri: "https://placeimg.com/140/140/any" }} />
            </Left>
            <Body>
              <Text>User {index + 1}</Text>
              <Text note>Latest chat message with that user</Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
        ))}
      </List>
    </Page>
  )
}