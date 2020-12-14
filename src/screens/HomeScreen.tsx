import React, { useEffect } from "react"
import { Text, Spinner } from 'native-base'
import { View, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Local imports
import { colors } from "../utils/colors"
import usePhotos from "../hooks/usePhotos"
import Page from "../components/layouts/Page"
import useHomeData from '../hooks/useHomeData'
import { screenNames } from "../utils/screens"
import PhotoCard from "../components/PhotoCard"
import PhotoInterface from "../interfaces/PhotoInterface"
import ModelInterface from "../interfaces/ModelInterface"
import ThumbnailScrollList from "../components/ThumbnailScrollList"
import {
	PHOTO_UPDATES_SUBSCRIPTION
} from "../graphql/subscriptions"
import { SUBSCRIPTION_TOPICS } from "../utils/constants"

export default function HomeScreen() {
	const navigation = useNavigation()
	const { homeData, homeError, homeLoading } = useHomeData()
	const {
		loading: photosLoading,
		error: photosError,
		data: photosData,
		loadMorePhotos,
		hasMorePhotos,
		refetch: refetchPhotos,
		subscribeToMore
	} = usePhotos()

	// useEffect(() => {
	// 	console.log(`data has arrived`, homeData)
	// }, [homeData])

	useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: PHOTO_UPDATES_SUBSCRIPTION,
			variables: { topic: SUBSCRIPTION_TOPICS.PHOTO_UNLIKED },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev

				const { photos: { data, ...otherInfo } }: {
					photos: {
						data: PhotoInterface[]
					}
				} = prev

				const unlikedPhoto: PhotoInterface = subscriptionData.data.photoUpdates

				const newData = data.map((photo: PhotoInterface) => {
					return photo.id === unlikedPhoto.id ?
						{ ...photo, likedByMe: false } : photo
				})

				return {
					photos: {
						...otherInfo,
						data: newData
					}
				}
			}
		})

		return () => unsubscribe()
	}, [])

	return (
		<Page noLeft rightStyle={{ flex: 0 }} noContent>
			{homeLoading || photosLoading ? (
				<Spinner color={colors.pink} />
			) : homeError || photosError ? (
				<Text>An error occurred</Text>
			) : (
						<FlatList
							ListHeaderComponent={
								<>
									<ThumbnailScrollList
										thumbnails={homeData.models.data.map((model: ModelInterface) => ({
											title: model.stageName,
											hash: model.hash,
											imageUrl: model.posterUrl
										}))}

										onPress={(hash) => {
											navigation.navigate(
												screenNames.PublicModelProfileScreen, {
												hash: `${hash}`
											})
										}}
									/>
								</>
							}
							ListEmptyComponent={() => (
								<View style={{
									flex: 1,
									alignItems: 'center',
									paddingTop: 12
								}}>
									<Text>Your timeline is empty! You should start following some models.</Text>
								</View>
							)}
							data={photosData.photos.data}
							keyExtractor={(card) => `${card.hash}`}
							renderItem={({ item: photo }: { item: PhotoInterface }) => (
								<PhotoCard photo={photo} />
							)}
							onRefresh={() => refetchPhotos}
							refreshing={photosLoading}
							onEndReached={() => loadMorePhotos()}
							onEndReachedThreshold={.9}
						/>

					)}
		</Page>
	)
}
