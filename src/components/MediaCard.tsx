import React, { FC } from "react"
import { Video } from "expo-av"
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from "native-base"

import DoubleTap from "./DoubleTap"
import { dayjs } from "../utils/dayjs"
import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import useToggleLike from "../hooks/useToggleLike"
import PhotoInterface from "../interfaces/PhotoInterface"
import { SCREEN_WIDTH } from "../utils/constants"

type Props = {
	asset: PhotoInterface
	hideHeader?: boolean
}

const MediaCard: FC<Props> = ({ asset, hideHeader }) => {
	const navigation = useNavigation()
	const { toggleLike } = useToggleLike()

	const video = React.useRef(null)
	const [status, setStatus] = React.useState({})

	const handleToggleLike = () => {
		const { liked_by_me } = asset

		toggleLike({ photo_id: asset?.id })

		asset.liked_by_me = !liked_by_me

		asset.likes_count += liked_by_me ? -1 : 1
	}

	return (
		<Card>
			{!hideHeader && (
				<CardItem>
					<Left>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate(screenNames.PublicModelProfileScreen, {
									hash: `${asset?.modele?.hash}`,
								})
							}}
						>
							<Thumbnail small source={{ uri: asset?.modele?.poster }} />
						</TouchableOpacity>

						<Body>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate(screenNames.PublicModelProfileScreen, {
										hash: `${asset?.modele?.hash}`,
									})
								}}
							>
								<Text>{asset?.is_for_me ? "Me" : asset?.modele?.stage_name}</Text>
							</TouchableOpacity>
						</Body>
					</Left>
				</CardItem>
			)}
			<DoubleTap onDoubleTap={handleToggleLike}>
				<CardItem cardBody>
					{asset?.type === "photo" ? (
						<Image
							source={{ uri: asset?.uri }}
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
								uri: asset?.uri,
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
					<Button transparent onPress={handleToggleLike}>
						<FontAwesome
							name={asset?.liked_by_me ? "heart" : "heart-o"}
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
							{asset?.likes_count} like
							{asset?.likes_count !== 1 ? "s" : ""}
						</Text>
					</Button>
				</Left>
				<Right>
					<Text>{dayjs(asset?.created_at).fromNow()}</Text>
				</Right>
			</CardItem>

			<CardItem>
				<Text>{asset?.caption}</Text>
			</CardItem>
		</Card>
	)
}

export default MediaCard