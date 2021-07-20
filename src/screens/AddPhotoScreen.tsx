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
} from "native-base"
import { screenNames } from "../utils/screens"

import {
	Image,
	StyleSheet,
	ScrollView,
	Dimensions,
} from "react-native"

import { colors } from "../utils/colors"
import { TouchableOpacity } from "react-native-gesture-handler"

// import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"
import { Camera } from 'expo-camera';


import { Video, AVPlaybackStatus } from "expo-av"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

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

export type UserFormRouteParamsProps = RouteProp<
	{
		params: {
			uri: string
			type: string
			caption: string
			category_id: string
			details: string
		}
	},
	"params"
>

export default function AddPhotoScreen() {
	const navigation = useNavigation()
	createContext(null)

	const route = useRoute<UserFormRouteParamsProps>()

	const [imageSelected, setImageSelected] = useState<any>()
	const [galleryImages, setGalleryImages] = useState<any>([])
	const [loarded, setLoarded] = useState<boolean>(false)
	const [assetInfo, setAssetInfo] = useState<object>({})

	const video = React.useRef(null)
	const [status, setStatus] = React.useState({})

	useEffect(() => {
		// const askPermission = async () => {
		// 	const isCameraRolleEnable = await Permissions.getAsync(
		// 		Permissions.CAMERA_ROLL
		// 	)
		// 	if (isCameraRolleEnable.granted) {
		// 		setLoarded(true)
		// 		return
		// 	}

		// 	const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
		// 	if (granted) {
		// 		const CamerarollRes = await Permissions.getAsync(
		// 			Permissions.CAMERA_ROLL
		// 		)
		// 		console.error(2, CamerarollRes)
		// 		setLoarded(true)
		// 	}
		// }
		// askPermission()

		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setLoarded(status === 'granted');
		  })();

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
		setImageSelected({asset: getAllPhotos.assets[0]})
		setGalleryImages(getAllPhotos.assets)
	}

	useEffect(() => {
		if (route.params?.caption !== '' || route.params?.details !== "" || route.params?.category_id !== "") {
			setImageSelected(route.params)
		}

	}, [route.params])

	const nextStep = () => {
		if (imageSelected.asset?.mediaType === 'video' && imageSelected.asset?.duration > 300) {
			alert('The video duration must less than or equal to 5 minutes')
		} else {
			navigation.navigate(screenNames.AddPhotoStep2, {
				photo: imageSelected
			})
		}
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
					<TouchableOpacity onPress={nextStep}>
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
						{imageSelected?.asset?.mediaType === "photo" ? (
							<Image
								style={styles.imageSelected}
								source={{ uri: imageSelected.asset?.uri }}
							/>
						) : (
							<Video
								ref={video}
								style={styles.imageSelected}
								source={{
									uri: imageSelected?.asset?.uri,
								}}
								useNativeControls
								resizeMode="contain"
								isLooping
								onPlaybackStatusUpdate={(status) => setStatus(() => status)}
							/>
						)}
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
									onPress={() =>
										setImageSelected({
											...imageSelected,
											asset: image
										})
									}
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
