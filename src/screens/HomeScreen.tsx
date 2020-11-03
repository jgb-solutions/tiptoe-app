import React, { useEffect } from "react"
import {
	FlatList
} from "react-native"
import {
	Text,
	Spinner
} from 'native-base'
import { useQuery } from "@apollo/client"

// Local imports
import { FETCH_MODELS, FETCH_PHOTOS } from "../graphql/queries"
import Page from "../components/layouts/Page"
import PhotoInterface from "../interfaces/PhotoInterface"
import PhotoCard from "../components/PhotoCard"
import ThumbnailScrollList from "../components/ThumbnailScrollList"
import ModelInterface from "../interfaces/ModelInterface"
import { colors } from "../utils/colors"

export default function HomeScreen() {
	const { loading: photoLoading, error: photoError, data: photoData } = useQuery(FETCH_PHOTOS)
	const { loading: modelLoading, error: modelError, data: modelData } = useQuery(FETCH_MODELS)

	useEffect(() => {
		console.log(`data has arrived`, photoData)
	}, [photoData])

	return (
		<Page>
			{photoLoading || modelLoading ? (
				<Spinner color={colors.pink} />
			) : photoError || modelError ? (
				<Text>An error occurred</Text>
			) : (
						<>
							<ThumbnailScrollList
								thumbnails={modelData.models.data.map((model: ModelInterface) => ({
									title: model.stageName,
									hash: model.hash,
									imageUrl: model.posterUrl
								}))} />

							<FlatList
								ListEmptyComponent={() => (
									<Text>There are no photos</Text>
								)}
								data={photoData.photos.data}
								keyExtractor={(card) => `${card.hash}`}
								renderItem={({ item: photo }: { item: PhotoInterface }) => (
									<PhotoCard photo={photo} />
								)} />
						</>
					)}
		</Page>
	)
}
