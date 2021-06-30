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
	const [photo, setPhoto] = useState<any>()

	useEffect(() => {
		setData(route.params?.photo)
		setPhoto({
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

	console.log(data)

	const publish = async () => {
		const payload = {
			bucket: route.params?.photo.asset.uri,
			caption: route.params?.photo.caption,
			detail: route.params?.photo.details,
			type: route.params?.photo.asset.mediaType, 
			category_id: parseInt(`${route.params?.photo.category_id}`),
			modele_id: parseInt(`${currentUser?.modele?.id}`),
			publish: true

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

		// alert(JSON.stringify(payload))
	}

	console.log(photo)

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
				<PhotoCard photo={photo} />
			</Content>
		</Container>
	)
}


