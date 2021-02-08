import React, { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { screenNames } from "../utils/screens"
import { Text, View, Button, Item, Input, Label } from "native-base"
import { colors } from "../utils/colors"
import {
	StyleSheet,
	TouchableOpacity,
	Image,
	TextStyle,
	ScrollView,
	Platform,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import SelectPicker from "react-native-form-select-picker"
import * as ImagePicker from "expo-image-picker"
import Textarea from "react-native-textarea"
import { request } from "graphql-request"

// Local imports
import Page from "../components/layouts/Page"
import useStore, { AppStateInterface } from "../store"
import { UPDATE_USER } from "../graphql/mutations"
import { GRAPHQL_API_URL } from "../utils/constants"

export interface Credentials {
	name: string
	email: string
	gender: string
	telephone: number
	avatarUrl: string
	modelName: string
	facebookUrl: string
	instagramUrl: string
	twitterUrl: string
	youtubeUrl: string
	bio: string
}

export default function UpdateInfoScreen() {
	const navigation = useNavigation()
	const currentUser = useStore((state: AppStateInterface) => (state.authData.data))

	const { control, handleSubmit, errors, formState } = useForm<Credentials>({
		mode: "onBlur",
	})


	const [avatarUrl, setAvatarUrl] = useState<any | null>()
	const [name, setName] = useState<any | null>()
	const [email, setEmail] = useState<any | null>()
	const [gender, setGender] = useState<any | null>()
	const [telephone, setTelephone] = useState<any | null>()

	const [modelName, setModelName] = useState<any | null>()
	const [facebookUrl, setFacebookUrl] = useState<any | null>()
	const [instagramUrl, setInstagramUrl] = useState<any | null>()
	const [twitterUrl, setTwitterUrl] = useState<any | null>()
	const [youtubeUrl, setYoutubeUrl] = useState<any | null>()
	const [bio, setBio] = useState<any | null>()

	const onSubmit = (credentials: Credentials)  => {
		console.error(credentials)
	}

	useEffect(() => {
		;(async () => {
			if (Platform.OS !== "web") {
				const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!")
				}
			}
		})()
	}, [])

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.cancelled) {
			avatarUrl(result.uri)
		}
	}

	return (
		<Page
			onPressLeft={() =>
				navigation.navigate("TabNavigation", { screen: screenNames.Home })
			}
			leftStyle={{ flex: 1.2 }}
			noContent
		>
			<ScrollView>
				<View style={styles.headerBox}>
					<View style={styles.pictureContainer}>
						<Image
							style={styles.headerPictureStyle}
							source={{
								uri: avatarUrl ? avatarUrl : currentUser?.avatarUrl
							}}
						/>
					</View>
					<TouchableOpacity onPress={pickImage}>
						<Text style={styles.headerBoxText}>Change Profile Photo</Text>
					</TouchableOpacity>
				</View>

				<View>
					<Item style={styles.items}>
						<View style={styles.inputContainer}>
							<Label style={styles.label}>Full name</Label>
							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<Input
										style={{ paddingLeft: 9 }}
										value={name ? name : currentUser?.name}
										onChangeText={(value) => setName(value)}
									/>
								)}
								name="name"
								rules={{ required: "The full name is required" }}
								
							/>
						</View>
					</Item>

					<Item style={styles.items}>
						<View style={styles.inputContainer}>
							<Label style={styles.label}>Email</Label>
							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<Input
										style={{ paddingLeft: 9 }}
										value={email ? email : currentUser?.email}
										onChangeText={(value) => setEmail(value)}
									/>
								)}
								name="email"
								rules={{ required: "The full name is required" }}
							/>
						</View>
					</Item>

					<Item style={[styles.items, { paddingBottom: 10 }]}>
						<View style={styles.inputContainer}>
							<Label style={styles.label}>Gender</Label>

							<Controller
								name="gender"
								control={control}
								render={({ onChange, onBlur, value }) => (
									<SelectPicker
										onValueChange={(value) => {
											setGender(value)
										}}
										selected="MALE"
										placeholder={gender ? gender : currentUser?.gender}
										placeholderStyle={{
											fontSize: 18,
											color: "#000",
										}}
									>
										<SelectPicker.Item label={"Male"} value={"MALE"} />
										<SelectPicker.Item label={"Female"} value={"FEMALE"} />
										<SelectPicker.Item label={"Other"} value={"OTHER"} />
									</SelectPicker>
								)}
							/>
						</View>
					</Item>

					<Item style={styles.items}>
						<View style={styles.inputContainer}>
							<Label style={styles.label}>Telephone</Label>
							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<Input
										style={{ paddingLeft: 9 }}
										value={telephone ? telephone : currentUser?.telephone}
										onChangeText={(value) => setTelephone(value)}
									/>
								)}
								name="telephone"
								rules={{ required: "The full phone field is required" }}
								defaultValue={telephone ? telephone : currentUser?.telephone}
							/>
						</View>
					</Item>
					{currentUser?.model && (
						<View>
							<Text style={styles.modelTitle}>Model information</Text>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Model name</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={modelName ? modelName : currentUser.model?.name}
												onChangeText={(value) => setModelName(value)}
											/>
										)}
										name="modelName"
										rules={{ required: "The model name is required" }}
										defaultValue={modelName ? modelName : currentUser.model?.name}
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Facebook Url</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={facebookUrl ? facebookUrl : currentUser.model?.facebookUrl}
												onChangeText={(value) => setFacebookUrl(value)}
												placeholder="Put The Facebook Url Here"
											/>
										)}
										name="facebookUrl"
										defaultValue={facebookUrl ? facebookUrl : currentUser.model?.facebookUrl}
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Instagram Url</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={ instagramUrl ? instagramUrl : currentUser.model?.instagramUrl }
												onChangeText={(value) => setInstagramUrl(value)}
												placeholder="Put The Instagram Url Here"
											/>
										)}
										name="instagramUrl"
										defaultValue={instagramUrl ? instagramUrl : currentUser.model?.instagramUrl }
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Twitter Url</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={ twitterUrl ? twitterUrl : currentUser.model?.twitterUrl}
												onChangeText={(value) => setTwitterUrl(value)}
												placeholder="Put The Twitter Url Here"
											/>
										)}
										name="twitterUrl"
										defaultValue={twitterUrl ? twitterUrl : currentUser.model?.twitterUrl}
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Youtube Url</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={youtubeUrl ? youtubeUrl : currentUser.model?.youtubeUrl}
												onChangeText={(value) => setYoutubeUrl(value)}
												placeholder="Put The Youtube Url Here"
											/>
										)}
										name="youtubeUrl"
										defaultValue={youtubeUrl ? youtubeUrl : currentUser.model?.youtubeUrl}
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={[styles.inputContainer, { marginBottom: 130 }]}>
									<Label style={styles.label}>Bio</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Textarea
												containerStyle={styles.textareaContainer}
												style={styles.textarea}
												onChangeText={(value: string) => setBio(value)}
												defaultValue={ bio ? bio : currentUser.model?.bio }
												maxLength={300}
												placeholder={"Tell about you"}
												placeholderTextColor={"#c7c7c7"}
												underlineColorAndroid={"transparent"}
											/>
										)}
										name="bio"
										defaultValue={bio ? bio : currentUser.model?.bio }
									/>
								</View>
							</Item>
						</View>
					)}
					<TouchableOpacity
						style={{ margin: 20 }}
						onPress={handleSubmit(onSubmit)}
					>
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</Page>
	)
}

const styles = StyleSheet.create({
	headerBox: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 50,
	},
	pictureContainer: {
		borderWidth: 1,
		borderColor: colors.pink,
		width: 120,
		height: 120,
		borderRadius: 100,
		marginBottom: 10,
		padding: 3,
	},
	headerPictureStyle: {
		width: "100%",
		height: "100%",
		borderRadius: 100,
	},
	headerBoxText: {
		color: colors.pink,
		fontSize: 20,
	},
	inputContainer: {
		flex: 1,
		flexDirection: "column",
		height: 50,
		paddingLeft: 10,
		paddingRight: 10,
	},
	items: {
		marginBottom: 15,
	},
	label: {
		color: colors.facebook,
		paddingLeft: 9,
	},
	cardContainer: {
		padding: 10,
	},
	modelTitle: {
		color: colors.pink,
		fontSize: 20,
		margin: 20,
	},
	buttonText: {
		color: colors.facebook,
		fontSize: 20,
	},
	textareaContainer: {
		height: 180,
		padding: 5,
		backgroundColor: "#F5FCFF",
	},
	textarea: {
		textAlignVertical: "top", // hack android
		height: 170,
		fontSize: 18,
		color: "#333",
	},
})
