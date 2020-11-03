import React from "react"
import { AppLoading } from "expo"
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import { ApolloProvider } from "@apollo/client"


import { MainNavigation } from "./src/navigation"
// @ts-ignore
// import getTheme from './native-base-theme/components'
import { client } from "./src/graphql/client"
import GlobalStuff from "./src/components/GlobalStuff"
import { Root } from "native-base"

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <ApolloProvider client={client}>
      {/* <StyleProvider style={getTheme()}> */}
      <Root>
        <MainNavigation />
      </Root>
      <GlobalStuff />
      {/* </StyleProvider> */}
    </ApolloProvider>
  )
}
