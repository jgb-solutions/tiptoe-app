import React, { useState } from "react"
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  View,
} from "native-base"
import { FontAwesome, Feather } from "@expo/vector-icons"
import { formatToUnits } from "../utils/formatNumber"
import { screenNames } from "../utils/screens"

import { ViewStyle, StyleSheet, Settings } from "react-native"
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Button from "../components/Button"

export default function SettingsScreen() {
  const navigation = useNavigation()

  let menu: any = null

  const setMenuRef = (ref: any) => {
    menu = ref
  }

  const hideMenu = () => {
    menu.hide()
  }

  const showMenu = () => {
    menu.show()
  }

  const goToProfile = () => {
    navigation.navigate(screenNames.Profile)
    hideMenu()
  }
  return (
    <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.black}
        style={{ backgroundColor: colors.pink }}
      >
        <Left style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            transparent
            onPress={() => navigation.navigate(screenNames.Profile)}
          >
            <Feather name="arrow-left" color={colors.white} size={24} />
          </Button>

          <Text
            style={{
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            Settings
          </Text>
        </Left>
      </Header>
      <Content>
        <View>
          <View
            style={{
              flexDirection: "row",
              borderTopColor: "#EFEFEF",
              borderTopWidth: 1,
              padding: 12,
            }}
          >
            <FontAwesome
              name="user"
              style={{
                fontSize: 17,
                color: colors.pink,
                marginRight: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.UpdateInfo)}
            >
              <Text>Update account information</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              borderTopColor: "#EFEFEF",
              borderTopWidth: 1,
              padding: 12,
            }}
          >
            <FontAwesome
              name="money"
              style={{
                fontSize: 17,
                color: colors.pink,
                marginRight: 10,
              }}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.Billing)}
            >
              <Text>Billing information</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              borderTopColor: "#EFEFEF",
              borderTopWidth: 1,
              padding: 12,
            }}
          >
            <FontAwesome
              name="lock"
              style={{
                fontSize: 17,
                color: colors.pink,
                marginRight: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.ChangePassword)}
            >
              <Text>Change password</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              borderTopColor: "#EFEFEF",
              borderTopWidth: 1,
              padding: 12,
            }}
          >
            <FontAwesome
              name="trash"
              style={{
                fontSize: 17,
                color: colors.pink,
                marginRight: 10,
              }}
            />
            <TouchableOpacity>
              <Text>Delete my account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  displayNone: {
    opacity: 0,
    height: 0,
    flex: 0,
  },
})
