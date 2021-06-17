import React, { useState, useEffect, createContext } from "react"
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
	Dimensions,
} from "react-native"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"

import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

const isCloseToBottom = ({
	layoutMeasurement,
	contentOffset,
	contentSize,
}: any) => {
	const paddingToBottom = 5
	return (
		layoutMeasurement.height + contentOffset.y >=
		contentSize.height - paddingToBottom
	)
}

export default function AddPhotoScreen() {
	const navigation = useNavigation()
	createContext(null)

	const [galleryImageSelected, setGalleryImageSelected] = useState<string>()
	const [galleryImages, setGalleryImages] = useState<any>([])
	const [loarded, setLoarded] = useState<boolean>(false)

	useEffect(() => {
		const askPermission = async () => {
			const isCameraRolleEnable = await Permissions.getAsync(
				Permissions.CAMERA_ROLL
			)
			if (isCameraRolleEnable.granted) {
				setLoarded(true)
				return
			}

			const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
			if (granted) {
				const CamerarollRes = await Permissions.getAsync(
					Permissions.CAMERA_ROLL
				)
				console.error(2, CamerarollRes)
				setLoarded(true)
			}
		}
		askPermission()
	}, [loarded])

	useEffect(() => {
		fetchAllPhotosFromLibrary()
	}, [])

	const fetchAllPhotosFromLibrary = async (amount = 20) => {
		const getAllPhotos = await MediaLibrary.getAssetsAsync({
			first: amount,
			sortBy: ["creationTime"],
			mediaType: ["photo", "video"],
		})
		setGalleryImageSelected(getAllPhotos.assets[0].uri)
		setGalleryImages(getAllPhotos.assets)
	}

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
							fontSize: 18,
						}}
					>
						Add a Photo
					</Text>
				</Left>
				<Right style={{ flex: 1 }}>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(screenNames.AddPhotoStep2, {
								photo: galleryImageSelected,
							})
						}
					>
						<Icon name="arrow-forward" style={{ color: colors.white }} />
					</TouchableOpacity>
				</Right>
			</Header>
			<Content>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						width: SCREEN_WIDTH,
					}}
				>
					<View style={styles.imageSelectedBox}>
						<Image
							style={styles.imageSelected}
							source={{ uri: galleryImageSelected }}
						/>
					</View>
				</View>
				<View>
					<ScrollView
						style={styles.imageBox}
						onScroll={({ nativeEvent }) => {
							if (isCloseToBottom(nativeEvent)) {
								fetchAllPhotosFromLibrary(galleryImages.length + 10)
							}
						}}
						scrollEventThrottle={400}
					>
						<View style={styles.imageWrapper}>
							{galleryImages?.map((image: any) => (
								<TouchableOpacity
									key={image.id}
									onPress={() => setGalleryImageSelected(image.uri)}
								>
									<Image
										style={styles.image}
										source={{
											uri: image.uri,
										}}
									/>
								</TouchableOpacity>
							))}
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
		width: "70%",
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
