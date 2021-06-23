import React, { useEffect, useState } from "react"
import { Image, FlatList, TouchableOpacity } from "react-native"
import {
	Icon,
	Text,
	View,
	Header,
	Spinner,
	Container,
	Button,
	Item,
	Input,
	Segment,
} from "native-base"
import { useNavigation } from "@react-navigation/native"
import Modal from "react-native-modal"

import { colors } from "../utils/colors"
import usePhotos from "../hooks/usePhotos"
import PhotoCard from "../components/PhotoCard"
import PhotoInterface from "../interfaces/PhotoInterface"
import NegativeResponse from "../components/NegativeResponse"
import { PHOTO_UPDATES_SUBSCRIPTION } from "../graphql/subscriptions"
import { SCREEN_WIDTH, SUBSCRIPTION_TOPICS } from "../utils/constants"
import useModels from "../hooks/useModels"
import { screenNames } from "../utils/screens"
import ModelInterface from "../interfaces/ModelInterface"

const segmentOptions = ["Photos", "Models"]

export default function PublicModelProfileScreen() {
	const navigation = useNavigation()
	const [thumbWidth, setThumbWidth] = useState(SCREEN_WIDTH - 24)
	const [segmentNameChosen, setSegmentNameChosen] = useState("Photos")
	const {
		photosLoading,
		photosError,
		photosData,
		loadMorePhotos,
		refetchPhotos,
		subscribeToMorePhotos,
	} = usePhotos({ random: true })
	const {
		modelsLoading,
		modelsError,
		modelsData,
		loadMoreModels,
		refetchModels,
	} = useModels({ random: true })
	const [currentPhoto, setCurrentPhoto] = useState<PhotoInterface | null>()

	useEffect(() => {
		const unsubscribe = subscribeToMorePhotos({
			document: PHOTO_UPDATES_SUBSCRIPTION,
			variables: { topic: SUBSCRIPTION_TOPICS.PHOTO_UNLIKED },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev

				const {
					photos: { data, ...otherInfo },
				} = prev

				const unlikedPhoto: PhotoInterface = subscriptionData.data.photoUpdates

				const filteredData = data.filter(
					(photo: PhotoInterface) => photo.id !== unlikedPhoto.id
				)

				setCurrentPhoto(null)

				return {
					photos: {
						...otherInfo,
						data: filteredData,
					},
				}
			},
		})

		return () => unsubscribe()
	}, [])

	React.useEffect(() => {
		const unsubscribeFocus = navigation.addListener("focus", () => {
			refetchPhotos()
		})

		const unsubscribeBlur = navigation.addListener("blur", () => {
			setCurrentPhoto(null)
		})

		return () => {
			unsubscribeFocus()
			unsubscribeBlur()
		}
	}, [navigation])

	const goToPhoto = (photo: PhotoInterface) => {
		setCurrentPhoto(photo)
	}

	const goToModel = (hash: String) => {
		navigation.navigate(screenNames.PublicModelProfileScreen, {
			hash: `${hash}`,
		})
	}

	useEffect(() => {
		// fetch new types of data depending on
		// the segment that was clicked 'on
		switch (segmentNameChosen) {
			case "Photos":
				refetchPhotos()
				break
			case "Models":
				refetchModels()
				break
		}
	}, [segmentNameChosen])

	const handleSearch = (text: string) => {
		console.log(`Searching for ${text}`)
	}

	return (
		<Container>
			<Header
				iosBarStyle="light-content"
				androidStatusBarColor={colors.black}
				searchBar
				rounded
				style={{ backgroundColor: colors.pink }}
			>
				<Item style={{ backgroundColor: colors.white, height: 40 }}>
					<Icon name="ios-search" />
					<Input placeholder="Search" onChangeText={handleSearch} />
				</Item>
			</Header>

			<Segment style={{ backgroundColor: colors.white }}>
				{segmentOptions.map((segmentName, index) => (
					<Button
						first={index === 0}
						last={index === segmentOptions.length - 1}
						key={index}
						active={segmentName === segmentNameChosen}
						style={{
							backgroundColor:
								segmentName === segmentNameChosen ? colors.pink : undefined,
							borderColor: colors.pink,
						}}
						onPress={() => setSegmentNameChosen(segmentName)}
					>
						<Text
							style={{
								color:
									segmentName === segmentNameChosen
										? colors.white
										: colors.black,
							}}
						>
							{segmentName}
						</Text>
					</Button>
				))}
			</Segment>

			{segmentNameChosen === "Models" && (
				<>
					{modelsLoading ? (
						<Spinner color={colors.pink} />
					) : modelsError ? (
						<NegativeResponse>
							<Text>An error occurred</Text>
						</NegativeResponse>
					) : (
						<FlatList
							showsVerticalScrollIndicator={false}
							numColumns={3}
							onLayout={(event) =>
								setThumbWidth(event.nativeEvent.layout.width)
							}
							ListEmptyComponent={() => (
								<NegativeResponse>
									<Text>You have no favorite photos yet.</Text>
								</NegativeResponse>
							)}
							data={modelsData.modeles.data}
							keyExtractor={(modele) => modele.hash}
							renderItem={({ item: modele }: { item: ModelInterface }) => (
								<TouchableOpacity
									style={{
										borderWidth: 1,
										borderColor: colors.pink,
									}}
									onPress={() => goToModel(modele.hash)} 
								>
									<Image
										source={{ uri: modele.poster }}
										style={{
											width: thumbWidth / 3,
											height: thumbWidth / 3,
										}}
										resizeMode="cover"
									/>
								</TouchableOpacity>
							)}
							onRefresh={refetchModels}
							refreshing={modelsLoading}
							onEndReached={loadMoreModels}
							onEndReachedThreshold={0.9}
						/>
					)}
				</>
			) } 

			{segmentNameChosen === "Photos" && (
				<>
					{photosLoading ? (
						<Spinner color={colors.pink} />
					) : photosError ? (
						<NegativeResponse>
							<Text>An error occurred</Text>
						</NegativeResponse>
					) : ( 
						<FlatList
							showsVerticalScrollIndicator={false}
							ListHeaderComponent={() => (
								<>
									{currentPhoto && (
										<Modal
											isVisible
											useNativeDriver
											onBackButtonPress={() => setCurrentPhoto(null)}
											onBackdropPress={() => setCurrentPhoto(null)}
										>
											<View style={{ borderRadius: 15, overflow: "hidden" }}>
												<PhotoCard photo={currentPhoto} />
											</View>
										</Modal>
									)}
								</>
							)}
							numColumns={3}
							onLayout={(event) =>
								setThumbWidth(event.nativeEvent.layout.width)
							}
							ListEmptyComponent={() => (
								<View
									style={{
										flex: 1,
										alignItems: "center",
										paddingTop: 12,
									}}
								>
									<Text>You have no favorite photos yet.</Text>
								</View>
							)}
							data={photosData.photos.data}
							keyExtractor={(item, index) => item.id}
							renderItem={({ item: photo }: { item: PhotoInterface }) => (
								<TouchableOpacity
									style={{
										borderWidth: 1,
										borderColor: colors.pink,
									}}
									onPress={() => goToPhoto(photo)}
									key={photo.uri}
								>
									<Image
										source={{ uri: photo.uri }}
										style={{
											width: thumbWidth / 3,
											height: thumbWidth / 3,
										}}
										resizeMode="cover"
									/>
								</TouchableOpacity>
							)}
							onRefresh={() => refetchPhotos()}
							refreshing={photosLoading}
							onEndReached={() => loadMorePhotos()}
							onEndReachedThreshold={0.9}
						/>
					)}
				</>
			)}
		</Container>
	)
}
