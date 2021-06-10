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

const { width: SCREEN_WIDTH } = Dimensions.get("window")

type Props = {
	photo: PhotoInterface
	hideHeader?: boolean
}

export default function PhotoCard({ photo, hideHeader }: Props) {
	const navigation = useNavigation()
	const { toggleLike } = useToggleLike()

	const handleToggleLike = (photo: PhotoInterface) => {
		const { likedByMe } = photo

		toggleLike({ photoId: photo.id })

		photo.likedByMe = !likedByMe

		photo.likesCount += likedByMe ? -1 : 1
	}

	return (
		<Card>
			{!hideHeader && (
				<CardItem>
					<Left>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate(screenNames.PublicModelProfileScreen, {
									hash: `${photo.model.hash}`,
								})
							}}
						>
							<Thumbnail small source={{ uri: photo.model.poster }} />
						</TouchableOpacity>

						<Body>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate(screenNames.PublicModelProfileScreen, {
										hash: `${photo.model.hash}`,
									})
								}}
							>
								<Text>{photo.model.stage_name}</Text>
							</TouchableOpacity>
						</Body>
					</Left>
				</CardItem>
			)}
			<DoubleTap onDoubleTap={() => handleToggleLike(photo)}>
				<CardItem cardBody>
					<Image
						source={{ uri: photo.url }}
						style={{
							flex: 1,
							height: SCREEN_WIDTH,
							backgroundColor: colors.pink,
						}}
						resizeMode="cover"
					/>
				</CardItem>
			</DoubleTap>

			<CardItem>
				<Left>
					<Button transparent onPress={() => handleToggleLike(photo)}>
						<Icon
							name={photo.likedByMe ? "heart" : "heart-empty"}
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
							{photo.likesCount} like{photo.likesCount !== 1 ? "s" : ""}
						</Text>
					</Button>
				</Left>
				<Right>
					<Text>{dayjs(photo.created_at).fromNow()}</Text>
				</Right>
			</CardItem>

			<CardItem>
				<Text>{photo.caption}</Text>
			</CardItem>
		</Card>
	)
}
