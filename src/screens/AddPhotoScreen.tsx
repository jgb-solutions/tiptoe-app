import React, { useState, useEffect } from "react"
import {
	Container,
	Header,
	Content,
	Text,
	Icon,
	Left,
	Right,
	View,
	Thumbnail,
	Card,
	CardItem,
	Body,
} from "native-base"
import { screenNames } from "../utils/screens"

import {
	Image,
	StyleSheet,
	ScrollView,
	Platform,
	Dimensions
} from "react-native"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"


const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height


export default function AddPhotoScreen() {
	const navigation = useNavigation()

	const [galleryImageSelected, setGalleryImageSelected] = useState<any>('https://source.unsplash.com/1600x900/?biology')
	const [galleryImages, setGalleryImages] = useState<any>([])

	

	return (
		<Container>
			<Header
				iosBarStyle="light-content"
				androidStatusBarColor={colors.black}
				style={{ backgroundColor: colors.pink }}
			>
				<Left style={{ flexDirection: "row", alignItems: "center" }}>
					<Text
						style={{
							fontWeight: "bold",
							color: colors.white,
							fontSize: 18
						}}
					>
						Add a Photo
					</Text>
				</Left>
				<Right style={{ flex: 1 }}>
					<TouchableOpacity
						onPress={() => navigation.navigate(screenNames.AddPhotoStep2, {photo: galleryImageSelected})}
					>
						<Icon name="arrow-forward" style={{ color: colors.white }} />
					</TouchableOpacity>
				</Right>
			</Header>
			<Content>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH }}>
					<View style={styles.imageSelectedBox}>
						<Image
							style={styles.imageSelected}
							source={{ uri: galleryImageSelected }}
						/>
					</View>
				</View>
				<View>
					<ScrollView style={styles.imageBox}>
						<View style={styles.imageWrapper}>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?biology"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?biology",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?physics"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?physics",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?science"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?science",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?technology"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?technology",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?animal"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?animal",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?nature"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?nature",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?beatifyl"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?beatifyl",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?sea"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://source.unsplash.com/1600x900/?sea" }}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?health"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?health",
									}}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?car"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://source.unsplash.com/1600x900/?car" }}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?motocycle"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?motocycle",
									}}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?cat"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://source.unsplash.com/1600x900/?cat" }}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?dog"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://source.unsplash.com/1600x900/?dog" }}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?bid"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://source.unsplash.com/1600x900/?bid" }}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://source.unsplash.com/1600x900/?monkey"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://source.unsplash.com/1600x900/?monkey",
									}}
								/>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</Content>
		</Container>
	)
}

AddPhotoScreen.propTypes = {}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	displayNone: {
		opacity: 0,
		height: 0,
		flex: 0,
	},
	imageSelectedBox: {
		height: SCREEN_HEIGHT / 2.3,
		width: '70%',
		padding: 2,
		backgroundColor: "#fff",
		borderWidth: 0.5,
		borderColor: "#000",
	},
	imageSelected: {
		height: "100%",
		width: "100%",
	},
	imageBox: {
		height: 315,
	},
	imageWrapper: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	image: {
		height: SCREEN_WIDTH / 3,
		width: SCREEN_WIDTH / 3,
		borderWidth: 0.5,
		borderColor: "#262626",
	},
})
