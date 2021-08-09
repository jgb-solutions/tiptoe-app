import React, { useState } from "react"
import Constants from "expo-constants"
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { screenNames } from "../utils/screens"
import { graphqlClient } from "../utils/graphqlClient"

import { colors } from "../utils/colors"
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import { RESET_PASSWORD } from "../graphql/mutations"
import { MessageImage } from "react-native-gifted-chat"
const TipToeLogo = require("../../assets/images/TipToeLogo.png")

export type RouteParamsProps = RouteProp<
  {
    params: {
      email: string
    }
  },
  "params"
>

export default function ResetPasswordStep3Screen() {
  const { control, handleSubmit, errors, watch, formState } = useForm({
    mode: "onBlur",
  })

  const route = useRoute<RouteParamsProps>()

  const navigation = useNavigation()
  const [fetching, setFetching] = useState(false)
  const [info, setInfo] = useState({
    message: "",
    success: false,
  })

  const verifyEmail = async (credentials: { password: string }) => {
    try {
      const payload = {
        password: credentials.password,
        email: route.params.email,
      }

      setFetching(true)
      const {
        resetPassword: { message, success },
      } = await graphqlClient.request(RESET_PASSWORD, {
        input: payload,
      })

      if (success) {
        setInfo({
          message: message,
          success: success,
        })
      }
      setFetching(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image style={styles.image} source={TipToeLogo} />

        <Text style={styles.login}>RESET PASSWORD</Text>

        <Text style={{ marginBottom: 24 }}>Setup your new password</Text>
        {info.success ? (
          <>
            <Text style={{ marginBottom: 10 }}>{info.message}</Text>
            <Text style={styles.smallText}>GO TO THE LOGIN SCREEN</Text>
            <TouchableOpacity
              style={{ marginBottom: 80 }}
              onPress={() => navigation.navigate(screenNames.LogIn)}
            >
              <Text style={[styles.smallText, { fontWeight: "bold" }]}>
                LOGIN
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.inputsContainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <FormInput
                    secureTextEntry
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Enter Your new Password"
                    error={errors.password}
                  />
                )}
                name="password"
                rules={{ required: "The password is required" }}
                defaultValue=""
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
                    placeholder="Confrim Your Password"
                    error={errors.password_confirmation}
                  />
                )}
                name="password_confirmation"
                rules={{
                  required: true,
                  validate: (value) =>
                    value === watch("password") || "Passwords don't match.",
                }}
                defaultValue=""
              />
            </View>

            <FormButton
              btnStyle={{ marginBottom: 12 }}
              label={<Text>{fetching ? "Please wait..." : "SEND"}</Text>}
              disabled={fetching}
              onPress={handleSubmit(verifyEmail)}
            />

            <Text style={styles.smallText}>GO TO THE STEP 2</Text>
            <TouchableOpacity
              style={{ marginBottom: 80 }}
              onPress={() =>
                navigation.navigate(screenNames.ResetPasswordStep2)
              }
            >
              <Text style={[styles.smallText, { fontWeight: "bold" }]}>
                GO BACK
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    alignItems: "center",
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
  login: {
    textTransform: "uppercase",
    // color: colors.lightGrey,
    fontSize: 24,
    marginVertical: 20,
  },
  loginError: {
    textTransform: "uppercase",
    color: colors.red,
    fontSize: 18,
    marginVertical: 20,
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
})
