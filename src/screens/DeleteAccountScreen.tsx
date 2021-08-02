import React, { useEffect, useState } from "react"
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  View,
  Thumbnail,
} from "native-base"
import { Feather, FontAwesome } from "@expo/vector-icons"

import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import useStore, { AppStateInterface } from "../store"

import Button from "../components/Button"
import { DEFAULT_AVATAR, SCREEN_WIDTH } from "../utils/constants"
import useDeleteUser from "../hooks/useDeleteUser"
import useDeleteModel from "../hooks/useDeleteModel"

export interface Credentials {
  password: string
  new_password: string
  password_confirmation: string
}

export default function DeleteAccountScreen() {
  const navigation = useNavigation()

  const {
    currentUser: userData,
    doLogout,
    updateUserState,
  } = useStore((state: AppStateInterface) => ({
    currentUser: state.authData.user,
    doLogout: state.doLogout,
    updateUserState: state.updateUserState,
  }))

  const [currentUser, setCurrentUser] = useState(userData)

  const { deleteUser, deleteUserData, deleteUserError, deleteUserLoading } =
    useDeleteUser()

  const { deleteModel, deleteModelData, deleteModelError, deleteModelLoading } =
    useDeleteModel()

  const handleDeleteUser = () => {
    const payload = {
      id: currentUser?.id,
    }
    deleteUser(payload)
  }

  const handleDeleteModel = () => {
    const payload = {
      id: currentUser?.modele?.id,
    }
    deleteModel(payload)
  }

  useEffect(() => {
    if (deleteUserData?.deleteUser?.id) {
      doLogout()
    }
  }, [deleteUserData])

  useEffect(() => {
    userData && setCurrentUser(userData)
  }, [userData])

  useEffect(() => {
    if (deleteModelData?.deleteModel?.success) {
      const payload: any = {
        ...currentUser,
        ...deleteModelData?.deleteModel?.user,
        model: {},
      }
      updateUserState(payload)

      alert("Your model account has been deleted")
    }
  }, [deleteModelData])

  // console.log(currentUser)
  useEffect(() => {
    currentUser && console.log(currentUser)
  }, [currentUser])

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
            onPress={() => navigation.navigate(screenNames.Setting)}
          >
            <Feather name="arrow-left" color={colors.white} size={24} />
          </Button>

          <Text
            style={{
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            Delete Account
          </Text>
        </Left>
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
                uri: currentUser?.avatar ? currentUser?.avatar : DEFAULT_AVATAR,
              }}
            />

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
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: colors.pink,
                  }}
                >
                  {currentUser?.name}
                </Text>
              </View>
            </View>
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
              <Text> {currentUser?.telephone}</Text>
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
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 24,
            paddingHorizontal: 12,
          }}
        >
          {currentUser?.is_model && (
            <Button
              style={{
                flex: 1,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.pink,
                justifyContent: "center",
                paddingVertical: 10,
                width: 195,
                borderRadius: 0,
              }}
              disable={deleteModelLoading}
              onPress={handleDeleteModel}
            >
              <Text
                style={{
                  color: colors.black,
                }}
              >
                {deleteModelLoading ? "Please wait..." : "Delete Model Account"}
              </Text>
            </Button>
          )}
          <Button
            style={{
              flex: 1,
              backgroundColor: colors.pink,
              borderColor: colors.pink,
              borderWidth: 1,
              height: 40,
              borderRadius: 0,
              width: currentUser?.is_model ? 195 : SCREEN_WIDTH - 30,
            }}
            disable={deleteUserLoading}
            onPress={handleDeleteUser}
          >
            <Text style={{ color: colors.white }}>
              {deleteUserLoading ? "Please wait..." : "Delete My account"}
            </Text>
          </Button>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>
            <FontAwesome name="warning" size={15} color={colors.error} />{" "}
            Warning
          </Text>

          <Text style={{ color: colors.blackOpact, marginBottom: 15 }}>
            Delete your account will cause a loss of everything on the platform.
          </Text>

          {currentUser?.is_model && (
            <Text style={{ color: colors.blackOpact }}>
              But if you delete only your model account, you will lose all your
              followers, even if you subscribe as a model again on this user
              account.
            </Text>
          )}
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  infos: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#EFEFEF",
    borderTopWidth: 0.5,
    minHeight: 45,
  },
  title: {
    color: colors.pink,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    width: 150,
  },
  textareaContainer: {
    height: 100,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    borderColor: colors.pinkOpact,
    borderWidth: 1,
    shadowColor: colors.pink,
    overflow: "hidden",
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 90,
    fontSize: 18,
    color: "#333",
  },
})
