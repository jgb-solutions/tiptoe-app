import { Icon } from "native-base"
import React, { useEffect, useState } from "react"
import Constants from "expo-constants"
import {
	Text,
	View,
	Image,
	Platform,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
} from "react-native"
import Textarea from "react-native-textarea"
import { useForm, Controller } from "react-hook-form"
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native"

import { colors } from "../utils/colors"
import Checkbox from "../components/Checkbox"
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import { graphqlClient } from "../utils/graphqlClient"
import useStore, { AppStateInterface } from "../store"
import SelectPicker from "react-native-form-select-picker"
const TipToeLogo = require("../../assets/images/TipToeLogo.png")
import { SIGN_USER_UP, VERIFY_USER_EMAIL } from "../graphql/mutations"
import { emailRegex } from "../utils/checkEmail"
import { screenNames } from "../utils/screens"

type UserType = "CONSUMER" | "MODEL"

type Gender = "FEMALE" | "MALE" | "OTHER"

export interface ModelFormData {
	name: string
	stageName: string
	bio: string
	facebook: string
	twitter: string
	youtube: string
	instagram: string
}

export interface FormData {
	name: string
	email: string
	password: string
	userType: UserType
	gender: Gender
	telephone: number
	model?: ModelFormData
}

type RouteParamsProps = RouteProp<
	{
		params: {
			formData: any
		}
	},
	"params"
>
export const validateEmailUnique = async (email: string) => {
	try {
		const {
			verifyUserEmail: { exists },
		} = await graphqlClient.request(VERIFY_USER_EMAIL, {
			input: { email },
		})

		return exists ? "A user with this email already exists." : true
	} catch (error) {
		// console.error(error.response.errors[0].message)
		return "We could not validate your email."
	}
}

export const validateEmailAddress = (email: string) => {
	return emailRegex.test(email) ? true : "Your email address is not valid"
}

export const emailRequired = "The email is required"

export const emailFieldRules = {
	required: emailRequired,
	validate: {
		validateEmailAddress,
		validateEmailUnique,
	},
}

export default function SignUpWithEmailScreen() {
	const {
		control,
		handleSubmit,
		errors,
		formState,
		watch,
		getValues,
		trigger,
	} = useForm<FormData>({
		mode: "onBlur",
	})
	const watchUserType = watch("userType") // you can supply default value as second argument
	const watchGender = watch("gender") // you can supply default value as second argument
	const navigation = useNavigation()
	const [signUpError, setsignUpError] = useState("")
	const [termsCondition, setTermsCondition] = useState<boolean | false>(false)
	const [submitForm, setSubmitForm] = useState<boolean | true>(true)
	const [formData, setFormData] = useState<FormData | undefined>()
	const [modelData, setModelData] = useState<ModelFormData | undefined>()

	const { doLogin } = useStore((state: AppStateInterface) => ({
		doLogin: state.doLogin,
	}))
	const [showModelForm, setShowModelForm] = useState(false)
	const [showSignUpButton, setshowSignUpButton] = useState(true)
	const [showNextButton, setShowNextButton] = useState(false)

	const { isValid } = formState

	const formIsValid = isValid && !!watchUserType && !!watchGender
	const watchAllFields = watch()

	const route = useRoute<RouteParamsProps>()

	useEffect(() => {
		route.params && setModelData(route.params?.formData.model)
	}, [route])

	const handleSubmitWithModel = (modelFormData: ModelFormData) => {
		if (!formData) {
			// Show original form
			handleHideModelForm()
			// trigger validation
			trigger()
		}

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

	const handleShowModelForm = () => {
		// Make sure the user form is valid first
		trigger()

		if (formState.isValid) {
			// save existing values
			setFormData(getValues())
			navigation.navigate(screenNames.SignUpWithEmailStep2, {
				formData: { ...formData, model: modelData },
			})
		}
	}

	const handleHideModelForm = () => {
		setShowModelForm(false)
		setShowNextButton(true)
		setshowSignUpButton(false)
	}

	useEffect(() => {
		if (!watchUserType) return

		if (watchUserType === "MODEL") {
			setshowSignUpButton(false)
			setShowNextButton(true)
		} else {
			setshowSignUpButton(true)
			setShowNextButton(false)
		}
	}, [watchUserType])

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<Image style={styles.image} source={TipToeLogo} />

				<Text style={styles.signUp}>SIGN UP</Text>
				<Text style={styles.signUpError}>{signUpError}</Text>

				<View style={styles.inputsContainer}>
					<View>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Enter Your Full Name"
									error={errors.name}
								/>
							)}
							name="name"
							rules={{ required: "The full name is required" }}
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={onChange}
									value={value}
									placeholder="Enter Your Email"
									error={errors.email}
									success={formState.touched.email && !errors.email}
								/>
							)}
							name="email"
							rules={emailFieldRules}
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									secureTextEntry
									autoCapitalize="none"
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Please Choose A Password"
									error={errors.password}
								/>
							)}
							name="password"
							rules={{ required: "The password is required" }}
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormInput
									onBlur={onBlur}
									autoCapitalize="none"
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="Enter Your Phone"
									error={errors.telephone}
								/>
							)}
							name="telephone"
							rules={{ required: "The phone is required" }}
						/>

						<View
							style={{
								borderColor: errors.userType ? colors.error : colors.black,
								paddingHorizontal: 10,
								borderWidth: 0.6,
								borderRadius: 50,
								marginBottom: 15,
							}}
						>
							<Controller
								name="userType"
								control={control}
								render={({ onChange, onBlur, value }) => (
									<SelectPicker
										dismissable
										doneButtonText="OK"
										onValueChange={(userType: string) => {
											if (!userType) return

											onChange(userType)

											if (userType === "MODEL") setSubmitForm(false)
										}}
										selected={value}
										style={{ flexDirection: "row", justifyContent: "center" }}
										placeholder="Signup as"
										placeholderStyle={{
											textAlign: "center",
											fontSize: 18,
										}}
									>
										<SelectPicker.Item label={"Consumer"} value={"CONSUMER"} />
										<SelectPicker.Item label={"Model"} value={"MODEL"} />
									</SelectPicker>
								)}
							/>
							{!!errors.userType && !watchUserType && (
								<Text style={styles.errorText}>{errors.userType.message}</Text>
							)}
						</View>

						<View
							style={{
								borderColor: errors.userType ? colors.error : colors.black,
								paddingHorizontal: 10,
								borderWidth: 0.6,
								borderRadius: 50,
								marginBottom: 15,
							}}
						>
							<Controller
								name="gender"
								control={control}
								render={({ onChange, onBlur, value }) => (
									<SelectPicker
										dismissable
										doneButtonText="OK"
										onValueChange={(gender: string) => {
											if (!gender) return

											onChange(gender)
										}}
										selected={value}
										style={{ flexDirection: "row", justifyContent: "center" }}
										placeholder="Check for your gender"
										placeholderStyle={{
											textAlign: "center",
											fontSize: 18,
										}}
									>
										<SelectPicker.Item label={"Male"} value={"MALE"} />
										<SelectPicker.Item label={"Female"} value={"FEMALE"} />
										<SelectPicker.Item label={"Other"} value={"OTHER"} />
									</SelectPicker>
								)}
							/>
							{!!errors.gender && !watchGender && (
								<Text style={styles.errorText}>{errors.gender.message}</Text>
							)}
						</View>
					</View>

					<View style={styles.checkboxesTermsCondition}>
						<Checkbox
							checked={termsCondition}
							onValueChanged={() => setTermsCondition(!termsCondition)}
							label={""}
						/>
						<Text style={{ marginLeft: 10 }}>
							<TouchableOpacity
								onPress={() => navigation.navigate("TermsCondition")}
							>
								<Text>Accept our terms and condition</Text>
							</TouchableOpacity>
						</Text>
					</View>
				</View>

				{showNextButton && (
					<FormButton
						btnStyle={{ marginBottom: 12 }}
						label={"Next"}
						onPress={handleShowModelForm}
					/>
				)}

				{showSignUpButton && (
					<FormButton
						btnStyle={{ marginBottom: 12 }}
						label={"Sign up"}
						onPress={handleSubmit(handleSignUp)}
						disabled={!formIsValid && !termsCondition}
					/>
				)}

				<Text style={styles.smallText}>ALREADY HAVE AN ACCOUNT?</Text>
				<TouchableOpacity
					style={{ marginBottom: 80 }}
					onPress={() => navigation.navigate("LogIn")}
				>
					<Text style={[styles.smallText, { fontWeight: "bold" }]}>LOGIN</Text>
				</TouchableOpacity>
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
