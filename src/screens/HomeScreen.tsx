import React, { useEffect } from "react"
import {
	View,
	FlatList
} from "react-native"
import {
	Text,
	Spinner
} from 'native-base'
import { useQuery } from '@apollo/react-hooks'
import { useNavigation } from "@react-navigation/native"

// Local imports
import { FETCH_MODELS, FETCH_PHOTOS } from "../graphql/queries"
import Page from "../components/layouts/Page"
import PhotoInterface from "../interfaces/PhotoInterface"
import PhotoCard from "../components/PhotoCard"
import ThumbnailScrollList from "../components/ThumbnailScrollList"
import ModelInterface from "../interfaces/ModelInterface"
import { colors } from "../utils/colors"
import useHomeData from '../hooks/useHomeData'
import { screenNames } from "../utils/screens"

export default function HomeScreen() {
	const navigation = useNavigation()
	const { homeData, homeError, homeLoading } = useHomeData()

	useEffect(() => {
		console.log(`data has arrived`, homeData)
	}, [homeData])



	return (
		<Page noLeft rightStyle={{ flex: 0 }} noContent>
			{homeLoading ? (
				<Spinner color={colors.pink} />
			) : homeError ? (
				<Text>An error occurred</Text>
			) : (
						<FlatList
							ListHeaderComponent={
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
							data={homeData.photos.data}
							keyExtractor={(card) => `${card.hash}`}
							renderItem={({ item: photo }: { item: PhotoInterface }) => (
								<PhotoCard photo={photo} />
							)} />

					)}
		</Page>
	)
}
