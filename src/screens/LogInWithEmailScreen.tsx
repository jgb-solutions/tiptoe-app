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
import { useNavigation } from "@react-navigation/native"
import { screenNames } from "../utils/screens"

import { colors } from "../utils/colors"
import FormInput from "../components/FormInput"
import { LOG_USER_IN } from "../graphql/mutations"
import FormButton from "../components/FormButton"
import useStore, { AppStateInterface } from "../store"
import { graphqlClient } from "../utils/graphqlClient"
import { emailRequired, validateEmailAddress } from "./SignUpWithEmailScreen"
import { Spinner } from "native-base"
const TipToeLogo = require("../../assets/images/TipToeLogo.png")

export interface Credentials {
  username: string
  password: string
}

export default function LogInWithEmailScreen() {
  const { control, handleSubmit, errors, formState } = useForm<Credentials>({
    mode: "onBlur",
  })
  const navigation = useNavigation()
  const [loginError, setLoginError] = useState("")
  const [fetching, setFetching] = useState(false)
  const { doLogin } = useStore((state: AppStateInterface) => ({
    doLogin: state.doLogin,
  }))

  const handleLogin = async (credentials: Credentials) => {
    try {
      setFetching(true)

      const { login: userData } = await graphqlClient.request(LOG_USER_IN, {
        input: credentials,
      })

      setFetching(false)

      if (userData) {
        doLogin(userData)
      }
    } catch (error) {
      console.log(error)
      // console.log(JSON.stringify(error.response.errors[0].message))
      // setLoginError(error.response.errors[0].message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image style={styles.image} source={TipToeLogo} />

        <Text style={styles.login}>LOG IN</Text>
        <Text style={styles.loginError}>{loginError}</Text>

        <View style={styles.inputsContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <FormInput
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Enter Your Email"
                error={errors.username}
                success={formState.touched.username && !errors.username}
              />
            )}
            name="username"
            rules={{
              required: emailRequired,
              validate: {
                validateEmailAddress,
              },
            }}
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
                placeholder="Enter Your Password"
                error={errors.password}
              />
            )}
            name="password"
            rules={{ required: "The password is required" }}
            defaultValue=""
          />
        </View>

        <View style={{ flexDirection: "row", marginBottom: 24 }}>
          <Text style={styles.smallText}>FORGOT YOUR PASSWORD? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screenNames.ResetPassword)}
          >
            <Text style={[styles.smallText, { fontWeight: "bold" }]}>
              Reset it
            </Text>
          </TouchableOpacity>
        </View>

        <FormButton
          btnStyle={{ marginBottom: 12 }}
          label={<Text>{fetching ? "logging you in" : "Log in"}</Text>}
          disabled={fetching}
          onPress={handleSubmit(handleLogin)}
        />

        <Text style={styles.smallText}>DON'T HAVE AN ACCOUNT?</Text>
        <TouchableOpacity
          style={{ marginBottom: 80 }}
          onPress={() => navigation.navigate(screenNames.SignUpWithEmail)}
        >
          <Text style={[styles.smallText, { fontWeight: "bold" }]}>
            SIGN UP
          </Text>
        </TouchableOpacity>
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
