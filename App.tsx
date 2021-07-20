import React from "react"
import { View, Text } from 'react-native'
import AppLoading from 'expo-app-loading'
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import { StripeProvider } from "@stripe/stripe-react-native"
import { Root } from "native-base"

import { MainNavigation } from "./src/navigation"
import GlobalStuff from "./src/components/GlobalStuff"

export default function App() {
	const [fontsLoaded] = Font.useFonts({
		Roboto: require("native-base/Fonts/Roboto.ttf"),
		Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
		...Ionicons.font,
	})

	if (fontsLoaded) {
		return (
			<AppLoading
				startAsync={() => new Promise(resolve => setTimeout(resolve, 2000))}
				onFinish={() => { }}
				onError={console.warn}
			/>
		)
	}

	return (
		<Root>
			{/* <StripeProvider publishableKey="pk_test_51HnTzqAEoJWPUiKcW6O3xeaLujtzRtqg2sZO0VcAX11sQVYrIFlZSxFMHWKKJhYBoNaZesz7vPRTYlD4GszN0REB00HZ5uloE6"> */}
			{/* <ConfirmProvider> */}
			<Text style={{ color: 'red', fontSize: 50 }}>Some text</Text>
			<>
				{/* <MainNavigation />
					<GlobalStuff /> */}
			</>
			{/* </ConfirmProvider> */}
			{/* </StripeProvider> */}
		</Root>
	)
}
