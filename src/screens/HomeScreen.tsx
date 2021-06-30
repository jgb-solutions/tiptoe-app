import React, { useEffect, useState } from "react"
import { Text, Spinner, Item } from "native-base"
import { View, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Local imports
import { colors } from "../utils/colors"
import usePhotos from "../hooks/usePhotos"
import Page from "../components/layouts/Page"
import useHomeData from "../hooks/useHomeData"
import { screenNames } from "../utils/screens"
import PhotoCard from "../components/PhotoCard"
import PhotoInterface from "../interfaces/PhotoInterface"
import ModelInterface from "../interfaces/ModelInterface"
import ThumbnailScrollList from "../components/ThumbnailScrollList"
import { PHOTO_UPDATES_SUBSCRIPTION } from "../graphql/subscriptions"
import { SUBSCRIPTION_TOPICS } from "../utils/constants"
import NegativeResponse from "../components/NegativeResponse"

export default function HomeScreen() {
	const navigation = useNavigation()
	const { homeData, homeError, homeLoading } = useHomeData()
	const {
		photosLoading,
		photosError,
		photosData,
		loadMorePhotos,
		refetchPhotos,
		subscribeToMorePhotos,
	} = usePhotos()

	useEffect(() => {
		photosData && refetchPhotos
	}, [photosData])

	useEffect(() => {
		refetchPhotos
	}, [])

	// useEffect(() => {
	// 	const unsubscribe = subscribeToMorePhotos({
	// 		document: PHOTO_UPDATES_SUBSCRIPTION,
	// 		variables: { topic: SUBSCRIPTION_TOPICS.PHOTO_UNLIKED },
	// 		updateQuery: (prev, { subscriptionData }) => {
	// 			if (!subscriptionData.data) return prev

	// 			const {
	// 				photos: { data, ...otherInfo },
	// 			}: {
	// 				photos: {
	// 					data: PhotoInterface[]
	// 				}
	// 			} = prev

	// 			const unlikedPhoto: PhotoInterface = subscriptionData.data.photoUpdates

	// 			const newData = data.map((photo: PhotoInterface) => {
	// 				return photo.id === unlikedPhoto.id
	// 					? {
	// 							...photo,
	// 							liked_by_me: false,
	// 							likes_count: photo.likes_count - 1,
	// 					  }
	// 					: photo
	// 			})

	// 			return {
	// 				photos: {
	// 					...otherInfo,
	// 					data: newData,
	// 				},
	// 			}
	// 		},
	// 	})

	// 	return () => unsubscribe()
	// }, [])

	return (
		<Page noLeft rightStyle={{ flex: 0 }} noContent>
			{homeLoading || photosLoading ? (
				<Spinner color={colors.pink} />
			) : homeError || photosError ? (
				<NegativeResponse>
					<Text>An error occurred</Text>
				</NegativeResponse>
			) : (
				<FlatList
					ListHeaderComponent={
						<>
							<ThumbnailScrollList
								thumbnails={homeData?.modeles?.data?.map(
									(model: ModelInterface) => ({
										title: model.stage_name,
										hash: model.hash,
										imageUrl: model.poster,
									})
								)}
								onPress={(hash) => {
									navigation.navigate(screenNames.PublicModelProfileScreen, {
										hash: `${hash}`,
									})
								}}
							/>
							{photosData.photos.data.filter(
								(photo: any) => photo.for_my_modele && photo
							).length === 0 && (
								<View style={{ 
									margin: 10, 
									borderTopColor: colors.blackOpact, 
									borderTopWidth: .17, paddingTop: 10  }}>
									<Text style={{ textAlign: 'center' }}>
										Your timeline is empty! You should start following some
										models.
									</Text>
								</View>
							)}
						</>
					}
					ListEmptyComponent={() => (
						<View
							style={{
								flex: 1,
								alignItems: "center",
								paddingTop: 12,
							}}
						>
							<Text>
								Your timeline is empty! You should start following some models.
							</Text>
						</View>
					)}
					data={photosData?.photos?.data}
					keyExtractor={(card) => card.hash}
					renderItem={({ item: photo }: { item: PhotoInterface }) => (
						<View>{photo.for_my_modele && <PhotoCard photo={photo} />}</View>
					)}
					onRefresh={() => refetchPhotos}
					refreshing={photosLoading}
					onEndReached={() => loadMorePhotos()}
					onEndReachedThreshold={0.9}
				/>
			)}
		</Page>
	)
}
