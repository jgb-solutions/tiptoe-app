import React from "react"
import { Body, Left, List, ListItem, Right, Text, Thumbnail } from "native-base"
import { useNavigation } from "@react-navigation/native"

import Page from "../components/layouts/Page"
import { screenNames } from "../utils/screens"

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
    <Page noRight leftStyle={{ flex: 0 }}>
      <List>
        {new Array(20).fill(0).map((number, index) => (
          <ListItem avatar key={index} onPress={() => handleGoToChatScreen(index)}>
            <Left>
              <Thumbnail source={{ uri: "https://placeimg.com/140/140/any" }} />
            </Left>
            <Body>
              <Text>Kumar Pratik</Text>
              <Text note>Doing what you like will always keep you happy . .</Text>
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