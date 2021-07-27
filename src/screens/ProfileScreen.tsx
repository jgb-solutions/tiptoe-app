import React, { useState } from "react"
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  View,
  Thumbnail,
} from "native-base"

import { Feather } from "@expo/vector-icons"

import { useNavigation } from "@react-navigation/native"
import { ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import { formatToUnits } from "../utils/formatNumber"
import useStore, { AppStateInterface } from "../store"
import useMyModels from "../hooks/useMyModels"
import useMyFollowers from "../hooks/useMyFollowers"
import moment from "moment"

import useGetModelPrice from "../hooks/useGetModelPrice"
import ModelCard from "../components/ModelCard"
import UserCard from "../components/UserCard"
import Button from "../components/Button"
import Stats from "../components/Starts"

export default function ProfileScreen() {
  const navigation = useNavigation()
  const { logout, currentUser } = useStore((state: AppStateInterface) => ({
    logout: state.doLogout,
    currentUser: state.authData.user,
  }))
  const [isAmodel, setIsAmodel] = useState(currentUser?.modele ? true : false)
  const [showModelInfo, setShowModelInfo] = useState(false)

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

  const settings = () => {
    navigation.navigate(screenNames.Setting)
    hideMenu()
  }

  const { price } = useGetModelPrice(currentUser?.modele?.hash)

  const { modelsData, modelLoading, modelError, refetchModel } = useMyModels()
  const { followersData, followerLoading, followerError } = useMyFollowers()

  const modelList = modelsData?.fetchMyModels
  const userList = followersData?.fetchMyFollowers

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
            onPress={() => navigation.navigate(screenNames.Home)}
          >
            <Feather name="arrow-left" color={colors.white} size={24} />
          </Button>

          <Text
            style={{
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            Profile
          </Text>
        </Left>
        <Right>
          <TouchableOpacity onPress={showMenu}>
            <Menu
              ref={setMenuRef}
              button={
                <Feather
                  onPress={showMenu}
                  name="more-vertical"
                  color={colors.white}
                  size={24}
                />
              }
            >
              <MenuItem onPress={() => settings()}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onPress={logout}>Logout</MenuItem>
            </Menu>
          </TouchableOpacity>
        </Right>
      </Header>
      <Content>
        <View style={{ padding: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Thumbnail
              large
              source={{
                uri: !showModelInfo
                  ? currentUser?.avatar
                  : currentUser?.modele?.poster,
              }}
            />

            {showModelInfo ? (
              <View
                style={{
                  flex: 1,
                  marginRight: 10,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Stats
                  title={`Post${
                    currentUser?.modele?.photos?.length !== 1 ? "s" : ""
                  }`}
                  number={currentUser?.modele?.photos?.length}
                />
                <Stats
                  style={{ marginLeft: 12 }}
                  title={`Follower${
                    currentUser?.modele?.followers.length !== 1 ? "s" : ""
                  }`}
                  number={currentUser?.modele?.followers.length}
                />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  marginLeft: 20,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    {currentUser?.name}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View
            style={{ flexDirection: "column", marginBottom: 24, marginTop: 20 }}
          >
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Feather
                name="phone"
                size={20}
                color={colors.pink}
                style={{
                  marginRight: 15,
                }}
              />
              <Text>{currentUser?.telephone}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="mail"
                size={20}
                color={colors.pink}
                style={{
                  marginRight: 15,
                }}
              />
              <Text>{currentUser?.email}</Text>
            </View>
          </View>
          {isAmodel && (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                justifyContent: "space-around",
              }}
            >
              <Button
                style={{
                  flex: 1,
                  backgroundColor: !showModelInfo ? colors.pink : colors.white,
                  justifyContent: "center",
                  borderColor: colors.pink,
                  borderWidth: 1,
                  paddingVertical: 10,
                  width: 180,
                  borderRadius: 0,
                }}
                onPress={() => setShowModelInfo(false)}
                disable={!showModelInfo}
              >
                <Text
                  style={{ color: showModelInfo ? colors.black : colors.white }}
                >
                  Personal Information
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  backgroundColor: showModelInfo ? colors.pink : colors.white,
                  borderWidth: 1,
                  borderColor: colors.pink,
                  justifyContent: "center",
                  paddingVertical: 10,
                  width: 180,
                  borderRadius: 0,
                }}
                onPress={() => setShowModelInfo(true)}
                disable={showModelInfo}
              >
                <Text
                  style={{
                    color: !showModelInfo ? colors.black : colors.white,
                  }}
                >
                  Model Information
                </Text>
              </Button>
            </View>
          )}
        </View>
        {!showModelInfo ? (
          <View>
            <View style={styles.infos}>
              <Text style={styles.mediaText}>Name</Text>
              <Text>{currentUser?.name}</Text>
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>Gender</Text>
              <Text>{currentUser?.gender}</Text>
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>Joined on</Text>
              <Text>
                {moment(currentUser?.created_at).format("MMMM Do, YYYY")}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.infos}>
              <Text style={styles.mediaText}>Stage Name</Text>
              <Text>{currentUser?.modele?.stage_name}</Text>
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>Facebook</Text>

              <Text>{currentUser?.modele?.facebook}</Text>
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>instagram</Text>

              <Text>{currentUser?.modele?.instagram}</Text>
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>twitter</Text>

              <Text>{currentUser?.modele?.twitter}</Text>
            </View>

            <View style={styles.infos}>
              <Text style={styles.mediaText}>youtube</Text>

              <Text>{currentUser?.modele?.youtube}</Text>
            </View>
            {price.cost ? (
              <View style={styles.infos}>
                <Text style={styles.mediaText}>Price</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(screenNames.ModelPrice)
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    ${price.cost}{" "}
                    <Feather
                      name="edit"
                      size={17}
                      color={colors.blackOpact}
                      style={{ marginLeft: 20 }}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.infos}>
                <Button
                  style={{
                    backgroundColor: colors.pink,
                    justifyContent: "center",
                    borderColor: colors.pink,
                    borderWidth: 1,
                    paddingVertical: 10,
                    width: 180,
                    borderRadius: 0,
                  }}
                  onPress={() => {
                    navigation.navigate(screenNames.ModelPrice)
                  }}
                >
                  <Text style={{ color: colors.white }}>Setup your price</Text>
                </Button>
              </View>
            )}
          </View>
        )}

        {currentUser?.user_type === "consumer" ? (
          <ModelCard modelLoading={modelLoading} modelList={modelList} />
        ) : (
          <UserCard userLoading={followerLoading} userList={userList} />
        )}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  infos: {
    flexDirection: "row",
    borderTopColor: "#EFEFEF",
    borderTopWidth: 0.5,
    padding: 12,
  },
  modelTouch: {
    width: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 10,
  },
  modelName: {
    fontWeight: "bold",
    marginTop: 10,
    color: colors.pink,
  },
  mediaText: {
    fontWeight: "bold",
    color: colors.pink,
    marginRight: 20,
    width: 100,
  },
})
