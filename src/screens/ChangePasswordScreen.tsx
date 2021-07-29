import React, { useState } from "react"
import { Container, Header, Content, Text, Icon, Left, View } from "native-base"
import Constants from "expo-constants"

import { screenNames } from "../utils/screens"
import FormInput from "../components/FormInput"

import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
} from "react-native"

import { colors } from "../utils/colors"
import useChangePassword from "../hooks/useChangePassword"
import { useNavigation } from "@react-navigation/native"
import FormButton from "../components/FormButton"

import { useForm, Controller } from "react-hook-form"
import Button from "../components/Button"
const TipToeLogo = require("../../assets/images/TipToeLogo.png")

export interface Credentials {
  password: string
  new_password: string
  password_confirmation: string
}

export default function ChangePasswordScreen() {
  const { control, handleSubmit, errors, watch } = useForm<Credentials>({
    mode: "onBlur",
  })

  const {
    changePassword,
    changePasswordLoading,
    changePasswordError,
    changePasswordData,
  } = useChangePassword()

  const navigation = useNavigation()

  const [passwordError, setPasswordError] = useState<any | null>("")

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
      setPasswordError(error.response.errors[0].message)
    }
  }

  return (
    <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor={colors.black}
        style={{ backgroundColor: colors.pink }}
      >
        <Left style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Button
            transparent
            onPress={() => navigation.navigate(screenNames.Setting)}
          >
            <Icon name="arrow-back" style={{ color: colors.white }} />
          </Button>

          <Text
            style={{
              fontWeight: "bold",
              color: colors.white,
              width: 200,
            }}
          >
            Change Password
          </Text>
        </Left>
      </Header>

      <Content>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Image style={styles.image} source={TipToeLogo} />

            <Text style={styles.password}>Reset password</Text>
            <Text style={styles.passwordError}>{passwordError}</Text>

            <View style={styles.inputsContainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <FormInput
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Enter Your Current Password"
                    error={errors.password}
                  />
                )}
                name="password"
                rules={{ required: "The current password is required" }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <FormInput
                    onBlur={onBlur}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Enter The New Password"
                    error={errors.new_password}
                  />
                )}
                name="new_password"
                rules={{ required: "The new password is required" }}
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <FormInput
                    secureTextEntry
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Confirm Your new Password"
                    error={errors.password_confirmation}
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

            <FormButton
              btnStyle={{ marginBottom: 12 }}
              label={changePasswordLoading ? "please wait..." : "Change"}
              onPress={handleSubmit(onSubmit)}
              disabled={changePasswordLoading}
            />
          </ScrollView>
        </SafeAreaView>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50,
  },
  contentContainer: {
    alignItems: "center",
  },
  password: {
    textTransform: "uppercase",
    fontSize: 24,
    marginVertical: 20,
  },
  passwordError: {
    textTransform: "uppercase",
    color: colors.red,
    fontSize: 18,
    marginVertical: 20,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  inputsContainer: {
    marginHorizontal: 30,
    alignSelf: "stretch",
  },
  smallText: {
    textTransform: "uppercase",
    // color: colors.white,
    fontSize: 12,
  },
  image: {
    width: 200,
    height: 78,
    resizeMode: "contain",
    ...Platform.select({
      ios: {
        marginTop: 54,
      },
      android: {
        marginTop: Constants.statusBarHeight + 54,
      },
    }),
  },
})
