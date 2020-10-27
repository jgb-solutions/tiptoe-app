import React, { useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import { AppContext } from "../providers"
import { Auth } from "../services/firebase"
import { colors } from "../utils/colors"
import { APP_NAME } from "../utils/constants"

export default function HomeScreen() {
	// Example of using the glogal state
	const { userData } = useContext(AppContext)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{APP_NAME}</Text>

			<Text style={styles.text}>We have hot babes around here.</Text>
			{/* <Text style={styles.text}>Hello, {`${userData.firstName}`}</Text> */}

			<TouchableOpacity onPress={() => Auth.signOut()}>
				<Text style={styles.title}>Log Out</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.black,
	},
	title: {
		color: colors.pink,
		fontWeight: "bold",
		fontSize: 38,
		marginBottom: 24,
	},
	text: {
		color: colors.lightGrey,
	},
})
