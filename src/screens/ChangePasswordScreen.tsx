import React, { useEffect, useState } from "react"
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  View,
  Thumbnail,
  Input,
} from "native-base"
import * as mime from "react-native-mime-types"
import Textarea from "react-native-textarea"
import { Feather, Entypo, FontAwesome } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from "expo-image-picker"

import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import useStore, { AppStateInterface } from "../store"
import ModelInterface from "../interfaces/ModelInterface"

import Button from "../components/Button"
import { TouchableOpacity } from "react-native-gesture-handler"
import useUpdateUser from "../hooks/useUpdateUser"
import UpdateUserInterface from "../interfaces/UpdateUserInterface"
import SelectPicker from "react-native-form-select-picker"
import UserInterface from "../interfaces/UserInterface"
import { DEFAULT_AVATAR } from "../utils/constants"
import useChangePassword from "../hooks/useChangePassword"

const GENDERS = ["MALE", "FEMALE", "OTHER"]

type Gender = "FEMALE" | "MALE" | "OTHER"

export interface Credentials {
  password: string
  new_password: string
  password_confirmation: string
}

export default function UpdateInfoScreen() {
  const navigation = useNavigation()

  const {
    changePassword,
    changePasswordLoading,
    changePasswordError,
    changePasswordData,
  } = useChangePassword()

  const { currentUser } = useStore((state: AppStateInterface) => ({
    currentUser: state.authData.user,
  }))

  const { control, handleSubmit, errors, watch } = useForm<Credentials>({
    mode: "onBlur",
  })

  const onSubmit = async (credentials: Credentials) => {
    try {
      const payload = {
        password: credentials.password,
        new_password: credentials.new_password,
      }
      changePassword(payload)

      if (changePasswordError) {
        console.log(changePasswordError)
      }

      if (changePasswordData.message) {
        alert(changePasswordData.message)
      }
    } catch (error) {
      alert(error.response.errors[0].message)
    }
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
            Edit Profile
          </Text>
        </Left>
        <Right>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={changePasswordLoading}
          >
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              {changePasswordLoading ? "Please wait..." : "Change"}
            </Text>
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
              <Text>
                {watch("telephone")
                  ? watch("telephone")
                  : currentUser?.telephone}
              </Text>
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
            backgroundColor: colors.pink,
            justifyContent: "center",
            borderColor: colors.pink,
            borderWidth: 1,
            padding: 12,
            borderRadius: 0,
          }}
        >
          <Text style={{ color: colors.white }}>
            Fillout this form to change your password
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.infos}>
            <Text style={styles.mediaText}>Current password</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder="Current Password"
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="password"
              rules={{ required: "The current password is required" }}
            />
          </View>

          <View style={styles.infos}>
            <Text style={styles.mediaText}>New password</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  value={value}
                  placeholder="New Password"
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="new_password"
              rules={{ required: "The new password is required" }}
            />
          </View>

          <View style={styles.infos}>
            <Text style={styles.mediaText}>Confirm password</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder="Confirm Your Password"
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="password_confirmation"
              rules={{
                required: true,
                validate: (value) =>
                  value === watch("new_password") || "Passwords don't match.",
              }}
            />
          </View>

          <View>
            {Object.keys(errors).map((error: string, idx) => (
              <Text
                key={error}
                style={{
                  color: colors.error,
                  marginTop: 4,
                  fontSize: 15,
                }}
              >
                {idx + 1}- {error}
              </Text>
            ))}
          </View>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
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
    textDecorationColor: colors.pink,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontSize: 18,
    fontWeight: "bold",
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
