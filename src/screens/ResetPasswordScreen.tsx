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
import { graphqlClient } from "../utils/graphqlClient"

import { colors } from "../utils/colors"
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import { VERIFY_EMAIL } from "../graphql/queries"
const TipToeLogo = require("../../assets/images/TipToeLogo.png")

export default function ResetPasswordScreen() {
  const { control, handleSubmit, errors, watch, formState } = useForm({
    mode: "onBlur",
  })
  const navigation = useNavigation()
  const [fetching, setFetching] = useState(false)

  const verifyEmail = async (credentials: { email: string }) => {
    try {
      setFetching(true)
      const {
        verifyEmail: { message },
      } = await graphqlClient.request(VERIFY_EMAIL, {
        email: credentials.email,
      })
      setFetching(false)
      if (message) {
        navigation.navigate(screenNames.ResetPasswordStep2, {
          message: message,
          email: credentials.email,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // setFetching(false)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image style={styles.image} source={TipToeLogo} />

        <Text style={styles.login}>RESET PASSWORD</Text>

        <View>
          <Text style={{ marginBottom: 24 }}>
            Enter your email to start the process to reset your password
          </Text>
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
                  error={errors.email}
                  success={formState.touched.email && !errors.email}
                />
              )}
              name="email"
              rules={{
                required: true,
              }}
            />
          </View>
        </View>

        <FormButton
          btnStyle={{ marginBottom: 12 }}
          label={<Text>{fetching ? "Please wait..." : "SEND"}</Text>}
          disabled={fetching}
          onPress={handleSubmit(verifyEmail)}
        />

        <Text style={styles.smallText}>GO TO THE LOGIN PAGE</Text>
        <TouchableOpacity
          style={{ marginBottom: 80 }}
          onPress={() => navigation.navigate(screenNames.LogIn)}
        >
          <Text style={[styles.smallText, { fontWeight: "bold" }]}>LOGIN</Text>
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
