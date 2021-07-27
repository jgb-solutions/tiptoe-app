import React, { useEffect, useState } from "react"
import { Root } from "native-base"
import AppLoading from "expo-app-loading"
import { StripeProvider } from "@stripe/stripe-react-native"
import useStore, { AppStateInterface } from "./src/store"

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

export default function App() {
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

  const { publishableKey: key } = useStore((state: AppStateInterface) => ({
    publishableKey: state.publishableKey,
  }))

  if (!fontsLoaded) return <AppLoading />

  return (
    <Root>
      <StripeProvider
        publishableKey={`pk_test_51IljqbEERboeLMjcnCmNOaFBA7buzIpWXz8ifCdpdzCrtgMkggYfXYWMz6tBXnRMsFIAy8k4bMU8R8qYkxFjkCGF00lYjHyvLT`}
      >
        <MainNavigation />
      </StripeProvider>
    </Root>
  )
}
