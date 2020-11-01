import React, { useContext, useEffect } from "react"
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	FlatList
} from "react-native"
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Thumbnail,
	Text,
	Button,
	Icon,
	Left,
	Body,
	Right,
	Title,
	ListItem,
	Spinner
} from 'native-base'
import { useApolloClient, useQuery } from "@apollo/client"

import { AppContext } from "../providers"
import { Auth } from "../services/firebase"
import { colors } from "../utils/colors"
import { APP_NAME } from "../utils/constants"
const toeImg = require('../../assets/images/authBg.png')
const tiptoeLogo = require('../../assets/images/TipToeLogo.png')
import { FETCH_PHOTOS } from '../graphql/queries'

export default function HomeScreen() {
	// Example of using the glogal state
	const { userData } = useContext(AppContext)
	const { loading, error, data } = useQuery(FETCH_PHOTOS)

	useEffect(() => {
		console.log(`data has arrived`, data)
	}, [data])

	return (
		// <View style={styles.container}>
		// 	<Text style={styles.title}>{APP_NAME}</Text>

		// 	<Text style={styles.text}>We have hot babes around here.</Text>
		// 	{/* <Text style={styles.text}>Hello, {`${userData.firstName}`}</Text> */}

		// 	<TouchableOpacity onPress={() => Auth.signOut()}>
		// 		<Text style={styles.title}>Log Out</Text>
		// 	</TouchableOpacity>
		// </View>

		<Container style={styles.container}>
			<Header style={{ backgroundColor: colors.pink }}>
				<Left style={{ flex: 1 }}>
					<Button transparent>
						<Icon name='chatbubbles' style={{ color: colors.white }} />
					</Button>
				</Left>
				<Body style={{ flex: 1 }}>
					<Image
						source={tiptoeLogo} style={{ maxWidth: 100, flex: 1 }}
						resizeMode='contain'
					/>
				</Body>
				<Right style={{ flex: 1 }}>
					<Button transparent>
						<Icon name='chatbubbles' style={{ color: colors.white }} />
					</Button>
				</Right>
			</Header>
			<Content>
				{loading ? (
					<Spinner color='red' />
				) : error ? (
					<Text>An error occurred</Text>
				) : (
							<>
								<ScrollView
									horizontal
									contentContainerStyle={{
										padding: 6
									}}
								>
									{data.photos.data.map((photo) => (
										<Body key={photo.hash} style={{ marginRight: 12 }}>
											<Thumbnail
												large
												source={{ uri: `http://lorempixel.com/300/300/people/` }}
												style={{ marginBottom: 5 }}
											/>
											<Text style={{ textAlign: 'center' }}>{photo.model.name.split(' ')[0]}</Text>
										</Body>
									))}
								</ScrollView>

								<FlatList
									ListEmptyComponent={() => (
										<Text>There are no photos</Text>
									)}
									data={data.photos.data}
									keyExtractor={(card, index) => `${index}`}
									renderItem={({ item: photo, index, separators }) => (
										<Card>
											<CardItem>
												<Left>
													<TouchableOpacity>
														<Thumbnail source={{ uri: `http://lorempixel.com/250/250/people/` }} />
													</TouchableOpacity>

													<Body>
														<Text>{photo.model.name}</Text>
														<Text note>Location</Text>
													</Body>
												</Left>
											</CardItem>
											<CardItem cardBody>
												<Image source={toeImg} style={{ height: 200, flex: 1 }} />
											</CardItem>
											<CardItem cardBody>
												<Text>{photo.caption}</Text>
											</CardItem>
											<CardItem>
												<Left>
													<Button transparent>
														<Icon active name="thumbs-up" />
														<Text>12 Likes</Text>
													</Button>
												</Left>
												<Right>
													<Text>11h ago</Text>
												</Right>
											</CardItem>
										</Card>
									)} />
							</>
						)}
			</Content>
		</Container>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		// backgroundColor: colors.black,
	},
	title: {
		color: colors.pink,
		fontWeight: "bold",
		fontSize: 38,
		marginBottom: 24,
	},
	text: {
		color: colors.lightGrey,
	},
})
