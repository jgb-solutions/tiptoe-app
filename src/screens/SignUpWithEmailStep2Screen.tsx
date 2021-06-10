import {
	Text,
	View,
	Platform,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
} from "react-native"
import { Icon } from "native-base"
import Constants from "expo-constants"
import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigation, useRoute } from "@react-navigation/native"

import { colors } from "../utils/colors"
import Textarea from "react-native-textarea"
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import { SIGN_USER_UP } from "../graphql/mutations"
import useStore, { AppStateInterface } from "../store"
import { graphqlClient } from "../utils/graphqlClient"
import { screenNames } from "../utils/screens"
import {
	ModelFormData,
	UserFormData,
	UserFormRouteParamsProps,
} from "./SignUpWithEmailScreen"

export default function SignUpWithEmailStep2Screen() {
	const navigation = useNavigation<any>()
	const route = useRoute<UserFormRouteParamsProps>()
	const { control, handleSubmit, errors, getValues, reset } =
		useForm<ModelFormData>({
			mode: "onBlur",
			defaultValues: route.params?.userFormData.model,
		})

	const userFormData = route.params?.userFormData

	const [signUpError, setsignUpError] = useState("")
	const { doLogin } = useStore((state: AppStateInterface) => ({
		doLogin: state.doLogin,
	}))

	const handleSubmitWithModel = (modelFormData: ModelFormData) => {
		const formDataWithModel: UserFormData = {
			...userFormData,
			model: modelFormData,
		}

		handleSignUp(formDataWithModel)
	}

	const handleSignUp = async (userFormData: UserFormData) => {
		console.log(userFormData)

		try {
			const { register: userData } = await graphqlClient.request(SIGN_USER_UP, {
				input: userFormData,
			})

			if (userData) {
				doLogin(userData)
			}
		} catch (error) {
			setsignUpError(error.response.errors[0].message)
			console.log(error)
		}
	}

	const goBack = () => {
		const modelInfo = getValues()

		navigation.navigate({
			name: screenNames.SignUpWithEmail,
			params: { modelInfo },
			// merge: true,
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<Text style={styles.signUpError}>{signUpError}</Text>
				<View style={styles.inputsContainer}>
					<TouchableOpacity
						onPress={goBack}
						style={{
							marginBottom: 10,
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Icon
							name="arrow-back"
							style={{
								fontSize: 24,
								color: "black",
								marginRight: 4,
							}}
						/>
						<Text>Back</Text>
					</TouchableOpacity>
					<View style={{ marginBottom: 24 }}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Enter Your Stage Name"
									error={errors.stage_name}
								/>
							)}
							name="stage_name"
							rules={{ required: "The stage name is required" }}
						/>

						<View
							style={{
								borderColor: colors.black,
								padding: 15,
								borderWidth: 0.6,
								borderRadius: 50,
								marginBottom: 15,
							}}
						>
							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<Textarea
										containerStyle={styles.textareaContainer}
										style={styles.textarea}
										onChangeText={onChange}
										defaultValue={value}
										maxLength={300}
										placeholder={"Tell us a little bit about you"}
										placeholderTextColor={"#c7c7c7"}
										underlineColorAndroid={"transparent"}
									/>
								)}
								name="bio"
							/>
						</View>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Enter Your Facebook URL"
									error={errors.facebook}
								/>
							)}
							name="facebook"
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Enter Your Instagram URL"
									error={errors.instagram}
								/>
							)}
							name="instagram"
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Enter Your Twitter URL"
									error={errors.twitter}
								/>
							)}
							name="twitter"
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Enter Your Youtube URL"
									error={errors.youtube}
								/>
							)}
							name="youtube"
						/>

						<FormButton
							btnStyle={{ marginBottom: 12, alignSelf: "center" }}
							label={"Sign up"}
							onPress={handleSubmit(handleSubmitWithModel)}
							// disabled={isValid}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 0,
		backgroundColor: colors.white,
	},
	contentContainer: {
		alignItems: "center",
	},
	image: {
		width: 200,
		height: 78,
		resizeMode: "contain",
		...Platform.select({
			ios: {
				marginTop: 54,
			},
			android: {
				marginTop: Constants.statusBarHeight + 54,
			},
		}),
	},
	signUp: {
		textTransform: "uppercase",
		fontSize: 24,
		marginVertical: 20,
	},
	signUpError: {
		textAlign: "center",
		color: colors.red,
		fontSize: 18,
		marginVertical: 20,
	},
	inputsContainer: {
		marginHorizontal: 30,
		alignSelf: "stretch",
	},
	smallText: {
		textTransform: "uppercase",
		fontSize: 12,
	},
	simpleContainer: {
		flex: 1,
		alignItems: "center",
		textAlign: "center",
		borderRadius: 50,
		marginBottom: 15,
	},
	checkboxesContainer: {
		flexDirection: "row",

		width: "100%",
		justifyContent: "space-between",
		marginBottom: 24,
	},
	checkboxesTermsCondition: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 24,
	},
	errorText: {
		color: colors.error,
		alignSelf: "center",
		marginTop: 4,
		fontSize: 12,
	},
	displayNone: {
		opacity: 0,
		height: 0,
		flex: 0,
	},
	textareaContainer: {
		height: 180,
		padding: 5,
	},
	textarea: {
		textAlignVertical: "top", // hack android
		height: 170,
		fontSize: 18,
		color: "#333",
	},
})
