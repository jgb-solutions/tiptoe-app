import React from "react"
import { TouchableOpacity, Image, Dimensions } from "react-native"
import {
	Card,
	CardItem,
	Thumbnail,
	Text,
	Button,
	Icon,
	Left,
	Body,
	Right,
} from "native-base"

import DoubleTap from "./DoubleTap"
import { colors } from "../utils/colors"
import PhotoInterface from "../interfaces/PhotoInterface"
import { useNavigation } from "@react-navigation/native"
import { screenNames } from "../utils/screens"
import { dayjs } from "../utils/dayjs"
import useToggleLike from "../hooks/useToggleLike"
import { Video, AVPlaybackStatus } from "expo-av"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

type Props = {
	photo: PhotoInterface
	hideHeader?: boolean
}

export default function PhotoCard({ photo, hideHeader }: Props) {
	const navigation = useNavigation()
	const { toggleLike } = useToggleLike()

	console.log(photo)

	const video = React.useRef(null)
	const [status, setStatus] = React.useState({})

	const handleToggleLike = (photo: PhotoInterface) => {
		const { liked_by_me } = photo

		toggleLike({ photoId: photo.id })

		photo.liked_by_me = !liked_by_me

		photo.likes_count += liked_by_me ? -1 : 1
	}

	return (
		<Card>
			{!hideHeader && (
				<CardItem>
					<Left>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate(screenNames.PublicModelProfileScreen, {
									hash: `${photo?.modele?.hash}`,
								})
							}}
						>
							<Thumbnail small source={{ uri: photo?.modele?.poster }} />
						</TouchableOpacity>

						<Body>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate(screenNames.PublicModelProfileScreen, {
										hash: `${photo?.modele?.hash}`,
									})
								}}
							>
								<Text>{photo?.modele?.stage_name}</Text>
							</TouchableOpacity>
						</Body>
					</Left>
				</CardItem>
			)}
			<DoubleTap onDoubleTap={() => handleToggleLike(photo)}>
				<CardItem cardBody>
					{photo?.type === "photo" ? (
						<Image
							source={{ uri: photo?.uri }}
							style={{
								flex: 1,
								height: SCREEN_WIDTH,
								backgroundColor: colors.pink,
							}}
							resizeMode="cover"
						/>
					) : (
						<Video
							ref={video}
							style={{
								flex: 1,
								height: SCREEN_WIDTH,
								backgroundColor: colors.pink,
							}}
							source={{
								uri: photo?.uri,
							}}
							useNativeControls
							resizeMode="contain"
							isLooping
							onPlaybackStatusUpdate={(status) => setStatus(() => status)}
						/>
					)}
				</CardItem>
			</DoubleTap>
			<CardItem>
				<Left>
					<Button transparent onPress={() => handleToggleLike(photo)}>
						<Icon
							name={photo?.liked_by_me ? "heart" : "heart-empty"}
							style={{
								color: colors.pink,
								fontSize: 36,
							}}
						/>

						<Text
							style={{
								color: colors.darkGrey,
							}}
						>
							{photo?.likes_count} like
							{photo?.likes_count !== 1 ? "s" : ""}
						</Text>
					</Button>
				</Left>
				<Right>
					<Text>{dayjs(photo?.created_at).fromNow()}</Text>
				</Right>
			</CardItem>

			<CardItem>
				<Text>{photo?.caption}</Text>
			</CardItem>
		</Card>
	)
}
