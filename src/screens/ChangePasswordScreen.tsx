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
import { Feather, FontAwesome } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"

import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import useStore, { AppStateInterface } from "../store"

import Button from "../components/Button"
import { TouchableOpacity } from "react-native-gesture-handler"
import { DEFAULT_AVATAR } from "../utils/constants"
import useChangePassword from "../hooks/useChangePassword"

export interface Credentials {
  password: string
  new_password: string
  password_confirmation: string
}

export default function ChangePasswordScreen() {
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

  const { control, handleSubmit, errors, reset, watch } = useForm<Credentials>({
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
    } catch (error) {
      alert(error.response.errors[0].message)
    }
  }

  useEffect(() => {
    if (changePasswordData?.changePassword?.message) {
      alert(changePasswordData?.changePassword?.message)
    }
    if (changePasswordData?.changePassword?.success) {
      reset({ password: "", new_password: "", password_confirmation: "" })
    }
  }, [changePasswordData])

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
            Change password
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

          {errors.password && (
            <View>
              <Text
                style={{
                  color: colors.error,
                  marginBottom: 10,
                  fontSize: 15,
                }}
              >
                <FontAwesome name="warning" size={15} color={colors.error} />{" "}
                {errors.password.message}
              </Text>
            </View>
          )}

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

          {errors.new_password && (
            <View>
              <Text
                style={{
                  color: colors.error,
                  marginBottom: 10,
                  fontSize: 15,
                }}
              >
                <FontAwesome name="warning" size={15} color={colors.error} />{" "}
                {errors.new_password.message}
              </Text>
            </View>
          )}

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

          {errors.password_confirmation && (
            <View>
              <Text
                style={{
                  color: colors.error,
                  marginBottom: 10,
                  fontSize: 15,
                }}
              >
                <FontAwesome name="warning" size={15} color={colors.error} />{" "}
                {errors.password_confirmation.message}
              </Text>
            </View>
          )}
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
