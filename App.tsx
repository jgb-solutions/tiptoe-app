import React, { useEffect, useContext } from "react"
import { AppLoading } from "expo"
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"

import AppProvider from "./src/providers"
import { MainNavigation } from "./src/navigation"

// import { AppContext } from "providers"

export default function App() {
  // const { resetState } = useContext(AppContext)

  // useEffect(() => {
  // 	// To reset the state
  // 	resetState()
  // }, [])

  // const [fontsLoaded] = Font.useFonts({
  //   // @ts-ignore
  //   Roboto: require("native-base/Fonts/Roboto.ttf"),
  //   // @ts-ignore
  //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //   ...Ionicons.font,
  // })

  // if (!fontsLoaded) return <AppLoading />

  return (
    <AppProvider>
      <MainNavigation />
    </AppProvider>
  )
}
