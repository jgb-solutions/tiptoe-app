import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text>Some default text for the settings screen.</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
