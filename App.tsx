import React, { useEffect, useContext } from "react"
import { AppLoading } from "expo"
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import { StyleProvider } from 'native-base'
import AsyncStorage from "@react-native-community/async-storage"
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from "@apollo/client"


import AppProvider, { AppContext } from "./src/providers"
import { MainNavigation } from "./src/navigation"
// @ts-ignore
import getTheme from './native-base-theme/components'
import { client } from "./src/graphql/client"
// import { AppContext } from "providers"

// AsyncStorage.clear()

export default function App() {
  // const { resetState } = useContext(AppContext)

  // useEffect(() => {
  //   // To reset the state
  //   resetState()
  // }, [])

  const [fontsLoaded] = Font.useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <ApolloProvider client={client}>
      <AppProvider>
        {/* <StyleProvider style={getTheme()}> */}
        <MainNavigation />
        {/* </StyleProvider> */}
      </AppProvider>
    </ApolloProvider>
  )
}
