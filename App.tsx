import React, { useEffect, useState } from "react"
import { Root } from "native-base"
import AppLoading from "expo-app-loading"
import { StripeProvider } from "@stripe/stripe-react-native"
import useStore, { AppStateInterface } from "./src/store"
import { graphqlClient } from "./src/utils/graphqlClient"

import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto"

import { MainNavigation } from "./src/navigation"
import { GETPUBLISHABLEKEY } from "./src/graphql/queries"

export default function App() {
  const [pk, setPk] = useState<string | "">("")

  async function getKey() {
    const {
      getPublishableKey: { key },
    } = await graphqlClient.request(GETPUBLISHABLEKEY, {})

    key && setPk(key)
  }
  useEffect(() => {
    getKey()
  }, [])

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <Root>
      <StripeProvider publishableKey={`${pk}`}>
        <MainNavigation />
      </StripeProvider>
    </Root>
  )
}
