import React, { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
import { Container, Header, Content, Text, Icon, Left, Right, Body, } from "native-base"
import * as MediaLibrary from "expo-media-library"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { colors } from "../utils/colors"
import { screenNames } from "../utils/screens"
import MediaCard from "../components/MediaCard"
import useStore, { AppStateInterface } from "../store"
import { graphqlClient } from "../utils/graphqlClient"
import { ADD_PHOTO_MUTATION } from "../graphql/mutations"

import {
	WASABI_ACCESS_KEY_ID,
	WASABI_SECRET_ACCESS_KEY,
	WASABI_DEFAULT_REGION,
	WASABI_BUCKET,
	WASABI_URL
} from '@env'

import ModelInterface from "../interfaces/ModelInterface"

const AWS = require('aws-sdk')

const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com')
const s3 = new AWS.S3({
	endpoint: wasabiEndpoint,
	accessKeyId: WASABI_ACCESS_KEY_ID,
	secretAccessKey: WASABI_SECRET_ACCESS_KEY
})

export interface AppMedia {
	caption: string
	category_id: string
	asset: MediaLibrary.Asset
}

type RouteParamsProps = RouteProp<{
	params: {
		media: AppMedia
	}
}, "params">

export default function AddPhotoStep2Screen() {
	const { currentUser } = useStore((state: AppStateInterface) => ({
		currentUser: state.authData.user,
	}))

	const navigation = useNavigation()

	const { params } = useRoute<RouteParamsProps>()
	const [media, setMedia] = useState<AppMedia>()
	const [assetSelected, setAssetSelected] = useState<{
		id: string,
		type: string,
		uri: string,
		modele?: ModelInterface,
		likes_count: number,
		liked_by_me: boolean,
		caption: string
	}>()

	useEffect(() => {
		assetSelected && setAssetSelected(assetSelected)
	}, [assetSelected])

	useEffect(() => {
		setMedia(params?.media)

		setAssetSelected({
			id: params.media.asset.id,
			type: params?.media?.asset.mediaType,
			uri: params?.media?.asset.uri,
			modele: currentUser?.modele,
			likes_count: 0,
			liked_by_me: false,
			caption: params?.media.caption,
		})
	}, [params])

	const publish = async () => {
		let payload = {
			caption: params?.media.caption,
			type: params?.media.asset.mediaType,
			category_id: parseInt(`${params?.media.category_id}`),
			modele_id: parseInt(`${currentUser?.modele?.id}`),
			publish: true,
			bucket: null,
			uri: null
		}

		const assetPath = params?.media.asset.uri
		const assetExt = params?.media.asset.filename.split('.').pop()
		const assetblob = await (await fetch(assetPath)).blob()

		// console.log(assetblob)

		const fileData = new File([assetblob], params?.media.asset.filename)

		console.log(fileData)
		return

		const s3Params = {
			Bucket: "file.tiptoe.app",
			Key: params?.media.asset.filename.split('.').pop(),
			Body: fileData,
			Metadata: { 'type': params?.media.asset.mediaType },
			ACL: 'public-read',
		}

		const options = {
			partSize: 10 * 1024 * 1024, // 10 MB
			queueSize: 10,
		}


		s3.upload(s3Params, options, async function (err: any, data: any) {
			if (!err) {
				// successful response
				console.log(data.Location)
				payload = {
					...payload,
					bucket: data.Bucket,
					uri: data.Location
				}

				try {
					const { addPhoto } = await graphqlClient.request(
						ADD_PHOTO_MUTATION,
						{ input: payload },
					)

					if (addPhoto) {
						navigation.navigate(screenNames.Home)
					}
				} catch (error) {
					alert(JSON.stringify(error.response.errors[0].message))
				}

			} else {
				console.log(err) // an error occurred
			}
		})
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
						}}
					>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate(screenNames.AddPhotoStep2, {
									media
								})
							}
						>
							<Icon name="arrow-back" style={{ color: colors.white }} />
						</TouchableOpacity>
					</Text>
				</Left>
				<Body>
					<Text style={{
						fontSize: 18,
						fontWeight: "bold",
						color: colors.white
					}}>
						New Post
					</Text>
				</Body>
				<Right style={{ flex: 1 }}>
					<TouchableOpacity onPress={publish}>
						<Text style={{
							fontSize: 18,
							fontWeight: "bold",
							color: colors.white
						}}>
							Publish
						</Text>
					</TouchableOpacity>
				</Right>
			</Header>
			<Content>
				{assetSelected && <MediaCard asset={assetSelected} />}
			</Content>
		</Container>
	)
}


