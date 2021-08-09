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
import { VERIFY_CODE } from "../graphql/queries"
const TipToeLogo = require("../../assets/images/TipToeLogo.png")

export type RouteParamsProps = RouteProp<
  {
    params: {
      message: string
      email: string
    }
  },
  "params"
>

export default function ResetPasswordStep2Screen() {
  const { control, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  })

  const route = useRoute<RouteParamsProps>()

  const navigation = useNavigation()
  const [fetching, setFetching] = useState(false)
  const [info, setInfo] = useState({
    message: "",
    email: "",
  })

  const codeVerification = async (credentials: { code: string }) => {
    try {
      setFetching(true)
      const payload = {
        ...credentials,
        email: info.email,
      }

      const {
        verifyCode: { success },
      } = await graphqlClient.request(VERIFY_CODE, {
        input: payload,
      })

      setFetching(false)

      if (success) {
        navigation.navigate(screenNames.ResetPasswordStep3, {
          email: info.email,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (route.params.message) {
      setInfo(route.params)
    }
  }, [route.params.message])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image style={styles.image} source={TipToeLogo} />

        <Text style={styles.login}>RESET PASSWORD</Text>

        <View style={styles.inputsContainer}>
          <Text style={{ marginBottom: 24 }}>{info.message}</Text>
          <View style={styles.inputsContainer}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <FormInput
                  onBlur={onBlur}
                  autoCapitalize="none"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Enter the code here"
                  error={errors.code}
                  success={formState.touched.code && !errors.code}
                />
              )}
              name="code"
              rules={{
                required: true,
              }}
            />
          </View>
        </View>

        <FormButton
          btnStyle={{ marginBottom: 12 }}
          label={<Text>{fetching ? "Please wait..." : "VERIFY"}</Text>}
          disabled={fetching}
          onPress={handleSubmit(codeVerification)}
        />

        <Text style={styles.smallText}>GO TO THE STEP 1</Text>
        <TouchableOpacity
          style={{ marginBottom: 80 }}
          onPress={() => navigation.navigate(screenNames.ResetPassword)}
        >
          <Text style={[styles.smallText, { fontWeight: "bold" }]}>
            GO BACK
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
