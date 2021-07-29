import React, { FC } from "react"
import {
  Text,
  View,
  Thumbnail,
  Card,
  CardItem,
  Body,
  Spinner,
} from "native-base"

import { StyleSheet } from "react-native"
import { colors } from "../utils/colors"
import UserInterface from "../interfaces/UserInterface"
import ThumbnailScrollList from "./ThumbnailScrollList"

const UserCard: FC<{
  userLoading: boolean
  userList: UserInterface[]
}> = ({ userLoading, userList }) => {
  return (
    <View style={{ margin: 12, paddingTop: 15 }}>
      <View
        style={{
          marginBottom: 15,
          padding: 5,
          borderRadius: 5,
          maxWidth: 130,
          shadowColor: colors.pink,
          overflow: "hidden",
          shadowRadius: 10,
          shadowOpacity: 0.5,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: colors.pink,
            textAlign: "left",
            textDecorationColor: colors.pink,
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
          }}
        >
          My Folowers
        </Text>
      </View>

      {userLoading ? (
        <Spinner color={colors.pink} />
      ) : (
        <ThumbnailScrollList
          thumbnails={userList?.map((user: UserInterface) => ({
            title: user.name,
            hash: user.id,
            imageUrl: user.avatar,
          }))}
        />
      )}
    </View>
  )
}

export default UserCard
