import React, { useState, useEffect } from "react"
import { Container, Header, Content, Text, Icon, Left, Right, Body, } from "native-base"
import { screenNames } from "../utils/screens"

import PhotoCard from "../components/PhotoCard"

import { colors } from "../utils/colors"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
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

import * as FileSystem from 'expo-file-system';


import path from "react-native-path"

var AWS = require('aws-sdk');

var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
var s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: WASABI_ACCESS_KEY_ID,
    secretAccessKey: WASABI_SECRET_ACCESS_KEY
});

type RouteParamsProps = RouteProp<
	{
		params: {
			photo: any
		}
	},
	"params"
>

export default function AddPhotoStep2Screen() {
	const { currentUser } = useStore((state: AppStateInterface) => ({
		currentUser: state.authData.user,
	}))

	const navigation = useNavigation()


	const route = useRoute<RouteParamsProps>()
	const [data, setData] = useState<any>()
	const [photoSelected, setPhotoSelected] = useState<any>()

	useEffect(() => {
		photoSelected && setPhotoSelected(photoSelected)
	}, [photoSelected])

	useEffect(() => {
		setData(route.params?.photo)
		setPhotoSelected({
			id: 1,
			type: route.params?.photo.asset.mediaType,
			uri: route.params?.photo.asset.uri,
			modele: currentUser?.modele,
			likes_count: 0,
			liked_by_me: false,
			caption: route.params?.photo.caption,
			details: route.params?.photo.details
		})
	}, [route])

	const publish = () => {
		let payload = {
			caption: route.params?.photo.caption,
			detail: route.params?.photo.details,
			type: route.params?.photo.asset.mediaType, 
			category_id: parseInt(`${route.params?.photo.category_id}`),
			modele_id: parseInt(`${currentUser?.modele?.id}`),
			publish: true,
			bucket: null,
			uri: null
		}


		var params = {
			Bucket: "file.tiptoe.app", 
			Key: path.basename(route.params?.photo.asset.filename),
			Body: route.params?.photo.asset.uri,
			Metadata: { 'type': route.params?.photo.asset.mediaType},
			ACL: 'public-read',
		};

		var options = {
			partSize: 10 * 1024 * 1024, // 10 MB
			queueSize: 10,
		};


		s3.upload(params, options, async function (err: any, data:any) {
			if (!err) {
				// successful response
				console.log(data.Location)
				payload = {
					...payload,
					bucket: data.Bucket,
					uri: data.Location
				} 

				try {
					const { addPhoto } = await  graphqlClient.request(
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
				console.log(err); // an error occurred
			}
		});
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
									photo: data,
								})
							}
						>
							<Icon name="arrow-back" style={{ color: colors.white }} />
						</TouchableOpacity>
					</Text>
				</Left>
				<Body>
					<Text
						style={{ fontSize: 18, fontWeight: "bold", color: colors.white }}
					>
						Add a Photo
					</Text>
				</Body>
				<Right style={{ flex: 1 }}>
					<TouchableOpacity onPress={publish}>
						<Text
							style={{ fontSize: 18, fontWeight: "bold", color: colors.white }}
						>
							Publish
						</Text>
					</TouchableOpacity>
				</Right>
			</Header>
			<Content>
				<PhotoCard photo={photoSelected} />
			</Content>
		</Container>
	)
}


