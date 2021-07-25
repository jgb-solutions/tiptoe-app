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
import useHomeData from "../hooks/useHomeData"
import PhotoCard from "../components/PhotoCard"
import PhotoInterface from "../interfaces/PhotoInterface"
import NegativeResponse from "../components/NegativeResponse"
import { SCREEN_WIDTH } from "../utils/constants"
import useModels from "../hooks/useModels"
import { screenNames } from "../utils/screens"
import ModelInterface from "../interfaces/ModelInterface"

const segmentOptions = ["Medias", "Models"]

export default function PublicModelProfileScreen() {
	const navigation = useNavigation()
	const [thumbWidth, setThumbWidth] = useState(SCREEN_WIDTH - 24)
	const [segmentNameChosen, setSegmentNameChosen] = useState("Medias")

	const {
		photosLoading: loading,
		photosError: error,
		photosData: data,
		loadMorePhotos,
		refetchPhotos: refetch,
		subscribeToMorePhotos: subscribeToMore
	} = usePhotos()

	const {
		modelsLoading,
		modelsError,
		modelsData,
		loadMoreModels,
		refetchModels,
	} = useModels({ random: true })
	const [currentPhoto, setCurrentPhoto] = useState<PhotoInterface | null>()

	const goToPhoto = (photo: PhotoInterface) => {
		setCurrentPhoto(photo)
	}

	const goToModel = (hash: String) => {
		navigation.navigate(screenNames.PublicModelProfileScreen, {
			hash: `${hash}`,
		})
	}

	useEffect(() => {
		refetch()
	}, [])

	useEffect(() => {
		// fetch new types of data depending on
		// the segment that was clicked 'on
		switch (segmentNameChosen) {
			case "Medias":
				refetch()
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

			{segmentNameChosen === "Medias" && ( 
				<>
					{loading ? (
						<Spinner color={colors.pink} />
					) : error ? (
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
							data={data.photos.data.filter((photo: any)=> photo.for_my_modele && photo)}
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
							onRefresh={() => refetch()}
							refreshing={loading}
							onEndReached={() => loadMorePhotos()}
							onEndReachedThreshold={0.9}
						/>
					)}
				</>
			)}
		</Container>
	)
}
