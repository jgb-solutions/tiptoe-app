import React, { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { screenNames } from "../utils/screens"
import { Text, View, Button, Item, Input, Label } from "native-base"
import * as Permissions from "expo-permissions"

import { colors } from "../utils/colors"
import {
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	Platform,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import SelectPicker from "react-native-form-select-picker"
import * as ImagePicker from "expo-image-picker"
import Textarea from "react-native-textarea"

// Local imports
import Page from "../components/layouts/Page"
import useStore, { AppStateInterface } from "../store"
import UserInterface from "../interfaces/UserInterface"
import useUpdateUser from "../hooks/useUpdateUser"

const GENDERS = ["MALE", "FEMALE", "OTHER"]

export default function UpdateInfoScreen() {
	const navigation = useNavigation()
	const currentUser = useStore(
		(state: AppStateInterface) => state.authData.user
	)

	const { control, handleSubmit, errors } = useForm<UserInterface>({
		mode: "onBlur",
		defaultValues: currentUser,
	})
	const [avatar, setAvatar] = useState<any | null>()
	const { updateUser, data } = useUpdateUser()

	useEffect(() => {
		if (data) {
			alert("Your profile has been updated.")
		}
	}, [data])

	useEffect(() => {
		if (currentUser?.first_login) {
			const payload: any = {
				id: currentUser?.id,
				first_login: false,
			}
			updateUser(payload)
		}
	}, [])

	const onSubmit = async (credentials: any) => {
		credentials.id = currentUser?.id
		const payload = {
			...credentials,
			modele: {
				update: {
					id: currentUser?.modele?.id,
					...credentials.modele,
				},
			},
		}

		updateUser(payload)
	}

	const getPermissionForPhotos = async () => {
		const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

		if (status !== "granted") {
			alert("Sorry, we need camera roll permissions to make this work!")
		}
	}

	const pickImage = async () => {
		const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)

		if (status !== "granted") {
			await getPermissionForPhotos()
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.75,
		})

		if (!result.cancelled) {
			setAvatar(result.uri)
		}
	}

	return (
		<Page
			onPressLeft={() =>
				navigation.navigate("TabNavigation", { screen: screenNames.Home })
			}
			leftStyle={{ flex: 0 }}
			noContent
		>
			<ScrollView>
				<View style={styles.headerBox}>
					<View style={styles.pictureContainer}>
						<Image
							style={styles.headerPictureStyle}
							source={{
								uri: avatar ? avatar : currentUser?.avatar,
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
										value={value}
										onChangeText={(value) => onChange(value)}
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
										value={value}
										onChangeText={(value) => onChange(value)}
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
										onValueChange={onChange}
										selected={value}
										placeholder="Select your gender"
										placeholderStyle={{
											fontSize: 18,
											color: "#000",
										}}
									>
										{GENDERS.map((gender, index) => (
											<SelectPicker.Item
												key={index}
												label={gender.toLowerCase()}
												value={gender}
											/>
										))}
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
										value={value}
										onChangeText={(value) => onChange(value)}
									/>
								)}
								name="telephone"
								rules={{ required: "The full phone field is required" }}
							/>
						</View>
					</Item>
					{currentUser?.modele && (
						<View>
							<Text style={styles.modelTitle}>Model information</Text>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Model stage name</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={value}
												onChangeText={(value) => onChange(value)}
											/>
										)}
										name="modele.stage_name"
										rules={{ required: "The model name is required" }}
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Facebook Link</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={value}
												onChangeText={(value) => onChange(value)}
												placeholder="Put The Facebook Link Here"
											/>
										)}
										name="modele.facebook"
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Instagram Link</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={value}
												onChangeText={(value) => onChange(value)}
												placeholder="Put The Instagram Link Here"
											/>
										)}
										name="modele.instagram"
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Twitter Link</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={value}
												onChangeText={(value) => onChange(value)}
												placeholder="Put The Twitter Link Here"
											/>
										)}
										name="modele.twitter"
									/>
								</View>
							</Item>

							<Item style={styles.items}>
								<View style={styles.inputContainer}>
									<Label style={styles.label}>Youtube Link</Label>
									<Controller
										control={control}
										render={({ onChange, onBlur, value }) => (
											<Input
												style={{ paddingLeft: 9 }}
												value={value}
												onChangeText={(value) => onChange(value)}
												placeholder="Put The Youtube Link Here"
											/>
										)}
										name="modele.youtube"
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
												onChangeText={(value: string) => onChange(value)}
												defaultValue={value}
												maxLength={300}
												placeholder={"Tell about you"}
												placeholderTextColor={"#c7c7c7"}
												underlineColorAndroid={"transparent"}
											/>
										)}
										name="modele.bio"
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
