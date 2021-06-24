import React from "react"
import { AppLoading } from "expo"
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"
// import { StripeProvider } from "@stripe/stripe-react-native"

import { MainNavigation } from "./src/navigation"
// @ts-ignore
import { Root } from "native-base"
import GlobalStuff from "./src/components/GlobalStuff"

export default function App() {
	const [fontsLoaded] = Font.useFonts({
		Roboto: require("native-base/Fonts/Roboto.ttf"),
		Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
		...Ionicons.font,
	})

	if (!fontsLoaded) return <AppLoading />

	return (
		<Root>
      {/* <StripeProvider publishableKey="pk_test_51HnTzqAEoJWPUiKcW6O3xeaLujtzRtqg2sZO0VcAX11sQVYrIFlZSxFMHWKKJhYBoNaZesz7vPRTYlD4GszN0REB00HZ5uloE6"> */}
				<MainNavigation />
				<GlobalStuff />
			{/* </StripeProvider> */}
		</Root>
	)
}
