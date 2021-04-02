import React, { useState } from "react"
import Constants from "expo-constants"
import {
	Text,
	View,
	Platform,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
} from "react-native"

import { useForm, Controller } from "react-hook-form"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { colors } from "../utils/colors"
import FormInput from "../components/FormInput"
import { SIGN_USER_UP } from "../graphql/mutations"
import FormButton from "../components/FormButton"
import useStore, { AppStateInterface } from "../store"
import Textarea from "react-native-textarea"
import { graphqlClient } from "../utils/graphqlClient"
import { screenNames } from "../utils/screens"

import { ModelFormData, FormData } from "./SignUpWithEmailScreen"

import { Icon } from "native-base"
import { useEffect } from "react"

type RouteParamsProps = RouteProp<
	{
		params: {
			formData: any
		}
	},
	"params"
>

export default function SignUpWithEmailStep2Screen() {
	const navigation = useNavigation()
	const route = useRoute<RouteParamsProps>()
	const {
		control,
		handleSubmit,
		errors,
		formState,
		getValues,
	} = useForm<ModelFormData>({
		mode: "onBlur",
		defaultValues: route.params?.formData?.model,
	})

	const [formData, setFormData] = useState<FormData | undefined>()
	const [signUpError, setsignUpError] = useState("")
	const { doLogin } = useStore((state: AppStateInterface) => ({
		doLogin: state.doLogin,
	}))

	useEffect(() => {
		setFormData(route.params?.formData)
	}, [route])

	const { isValid } = formState

	const handleSubmitWithModel = (modelFormData: ModelFormData) => {
		const formDataWithModel: any = { ...formData, model: modelFormData }

		handleSignUp(formDataWithModel)
	}

	const handleSignUp = async (formData: FormData) => {
		try {
			const { register: userData } = await graphqlClient.request(SIGN_USER_UP, {
				input: formData,
			})

			if (userData) {
				doLogin(userData)
			}
		} catch (error) {
			setsignUpError(error.response.errors[0].message)
			console.error(error)
		}
	}

	const goBack = () => {
		const data: any = { ...formData, model: getValues() }
		navigation.navigate(screenNames.SignUp, { formData: data })
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
									placeholder="Enter Your Model Name"
									error={errors.name}
								/>
							)}
							name="name"
							rules={{ required: "The model name is required" }}
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Enter Your Stage Name"
									error={errors.stageName}
								/>
							)}
							name="stageName"
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
							// rules={{ required: "The stage name is required" }}
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
							// rules={{ required: "The stage name is required" }}
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
							// rules={{ required: "The Twitter URL is required" }}
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
							// rules={{ required: "The Youtube URL is required" }}
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
		// textTransform: "uppercase",
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
