import React, { useState, useEffect } from "react"
import {
	Container,
	Header,
	Content,
	Text,
	Icon,
	Left,
	Right,
	View,
	Thumbnail,
	Card,
	CardItem,
	Body,
} from "native-base"
import { screenNames } from "../utils/screens"

import {
	Image,
	StyleSheet,
	ScrollView,
	Platform,
	Dimensions
} from "react-native"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"


const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height


export default function AddPhotoScreen() {
	const navigation = useNavigation()

	const [galleryImageSelected, setGalleryImageSelected] = useState<any>('https://i.pinimg.com/originals/4b/0d/62/4b0d628fa9bb3db9dc0af32a7f55f825.jpg')
	const [galleryImages, setGalleryImages] = useState<any>([])

	

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
							fontSize: 18
						}}
					>
						Add a Photo
					</Text>
				</Left>
				<Right style={{ flex: 1 }}>
					<TouchableOpacity
						onPress={() => navigation.navigate(screenNames.AddPhotoStep2, {photo: galleryImageSelected})}
					>
						<Icon name="arrow-forward" style={{ color: colors.white }} />
					</TouchableOpacity>
				</Right>
			</Header>
			<Content>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH }}>
					<View style={styles.imageSelectedBox}>
						<Image
							style={styles.imageSelected}
							source={{ uri: galleryImageSelected }}
						/>
					</View>
				</View>
				<View>
					<ScrollView style={styles.imageBox}>
						<View style={styles.imageWrapper}>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://i.pinimg.com/originals/4b/0d/62/4b0d628fa9bb3db9dc0af32a7f55f825.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://i.pinimg.com/originals/4b/0d/62/4b0d628fa9bb3db9dc0af32a7f55f825.jpg",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://i.pinimg.com/736x/64/80/91/6480912923ddeaa3b17579f9b789c99b.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://i.pinimg.com/736x/64/80/91/6480912923ddeaa3b17579f9b789c99b.jpg",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://lh6.googleusercontent.com/proxy/Vo65sZN1hByjlbzoByY0LHcg5NI2EgexUNvZ9H8p_4nKKraJgJGmSQVYtACVTJt3CGWVKyU5aAlaKnc-adp5EgwUokdJ_x2ov8SxXSXi-lTFO8UAmiq9TERQTAt8Pd3x=w1200-h630-p-k-no-nu"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://lh6.googleusercontent.com/proxy/Vo65sZN1hByjlbzoByY0LHcg5NI2EgexUNvZ9H8p_4nKKraJgJGmSQVYtACVTJt3CGWVKyU5aAlaKnc-adp5EgwUokdJ_x2ov8SxXSXi-lTFO8UAmiq9TERQTAt8Pd3x=w1200-h630-p-k-no-nu",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://i.pinimg.com/originals/d2/ea/27/d2ea27d04ebc094fcab1c7b607e9dec0.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://i.pinimg.com/originals/d2/ea/27/d2ea27d04ebc094fcab1c7b607e9dec0.jpg",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://i2.wp.com/forcreativejuice.com/wp-content/uploads/2016/05/6-toe-nail-art-ideas.jpg?fit=600%2C600&ssl=1&resize=1280%2C720"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://i2.wp.com/forcreativejuice.com/wp-content/uploads/2016/05/6-toe-nail-art-ideas.jpg?fit=600%2C600&ssl=1&resize=1280%2C720",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"http://www.prettydesigns.com/wp-content/uploads/2015/08/15-adorable-toe-nail-designs-and-ideas1.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "http://www.prettydesigns.com/wp-content/uploads/2015/08/15-adorable-toe-nail-designs-and-ideas1.jpg",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://i.ytimg.com/vi/o24vn0UejVQ/maxresdefault.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://i.ytimg.com/vi/o24vn0UejVQ/maxresdefault.jpg",
									}}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://cdn.diys.com/wp-content/uploads/2016/08/mermaid-toe-nail-designs.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://cdn.diys.com/wp-content/uploads/2016/08/mermaid-toe-nail-designs.jpg" }}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://static1a.thecuddl.com/images/2017/05/49-beautiful-nail-art-idea-thecuddl.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://static1a.thecuddl.com/images/2017/05/49-beautiful-nail-art-idea-thecuddl.jpg",
									}}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://i.pinimg.com/originals/73/2a/f4/732af4a70c3433d207c01f430ee2a091.png"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://i.pinimg.com/originals/73/2a/f4/732af4a70c3433d207c01f430ee2a091.png" }}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://cutediyprojects.com/wp-content/uploads/2016/02/44-Easy-And-Cute-Toenail-Designs-for-Summer-cover.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://cutediyprojects.com/wp-content/uploads/2016/02/44-Easy-And-Cute-Toenail-Designs-for-Summer-cover.jpg",
									}}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://vvpretty.com/wp-content/uploads/2018/12/01-summer-toe-nails-thelateststyle.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://vvpretty.com/wp-content/uploads/2018/12/01-summer-toe-nails-thelateststyle.jpg" }}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://nail-art-designs.com/wp-content/gallery/new-toe-nail-designs-1/2.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://nail-art-designs.com/wp-content/gallery/new-toe-nail-designs-1/2.jpg" }}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://glaminati.com/wp-content/uploads/2021/05/toe-nail-designs-beach-white-red-orange-flowers.jpg"
									)
								}
							>
								<Image
									style={styles.image}
									source={{ uri: "https://glaminati.com/wp-content/uploads/2021/05/toe-nail-designs-beach-white-red-orange-flowers.jpg" }}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() =>
									setGalleryImageSelected(
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0u2V-VmL2x0TfAecvXzgRrJ1ZMjph1V6iRA&usqp=CAU"
									)
								}
							>
								<Image
									style={styles.image}
									source={{
										uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0u2V-VmL2x0TfAecvXzgRrJ1ZMjph1V6iRA&usqp=CAU",
									}}
								/>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</Content>
		</Container>
	)
}

AddPhotoScreen.propTypes = {}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	displayNone: {
		opacity: 0,
		height: 0,
		flex: 0,
	},
	imageSelectedBox: {
		height: SCREEN_HEIGHT / 2.3,
		width: '70%',
		padding: 2,
		backgroundColor: "#fff",
		borderWidth: 0.5,
		borderColor: "#000",
	},
	imageSelected: {
		height: "100%",
		width: "100%",
	},
	imageBox: {
		height: 315,
	},
	imageWrapper: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	image: {
		height: SCREEN_WIDTH / 3,
		width: SCREEN_WIDTH / 3,
		borderWidth: 0.5,
		borderColor: "#262626",
	},
})
