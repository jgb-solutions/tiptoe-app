import React, { useState } from "react"
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

import Checkbox from "../components/Checkbox"

import { request } from "graphql-request"
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"

import { colors } from "../utils/colors"
import FormInput from "../components/FormInput"
import { SIGN_USER_UP } from "../graphql/mutations"
import FormButton from "../components/FormButton"
import useStore, { AppStateInterface } from "../store"
import { GRAPHQL_API_URL } from "../utils/constants"
const TipToeLogo = require("../../assets/images/TipToeLogo.png")
import SelectPicker from "react-native-form-select-picker"

export interface Credentials {
	name: string
	email: string
	password: string
	userType: string
	gender: string
	telephone: number
}

enum UserType {
	CONSUMER,
	MODEL,
}

enum Gender {
	FEMALE,
	MALE,
	OTHER,
}

export default function SignUpWithEmailScreen() {
	const { control, handleSubmit, errors, formState } = useForm<Credentials>({
		mode: "onBlur",
	})
	const navigation = useNavigation()
	const [signUpError, setsignUpError] = useState("")
	const [userType, setUserType] = useState<any | UserType>()
	const [termsCondition, setTermsCondition] = useState<boolean | false>(false)
	const { doLogin } = useStore((state: AppStateInterface) => ({
		doLogin: state.doLogin,
	}))
	const [gender, setGender] = useState<any | Gender>()

	const { isValid } = formState
	const userTypeGender = !!userType && !!gender

	const formIsValid = isValid && userTypeGender

	const handleSignUp = async (credentials: Credentials) => {
		credentials.userType = userType
		credentials.gender = gender
		try {
			const { register: userData } = await request(
				GRAPHQL_API_URL,
				SIGN_USER_UP,
				{
					input: credentials,
				}
			)

			if (userData) {
				doLogin(userData)
			}

			if (errors) {
				setsignUpError("something went wrong. Please check again")
			}
		} catch (error) {
			setsignUpError(error.response.errors[0].message)
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<Image style={styles.image} source={TipToeLogo} />

				<Text style={styles.signUp}>SIGN UP</Text>
				<Text style={styles.signUpError}>{signUpError}</Text>

				<View style={styles.inputsContainer}>
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
						defaultValue=""
					/>

					<Controller
						control={control}
						render={({ onChange, onBlur, value }) => (
							<FormInput
								onBlur={onBlur}
								autoCapitalize="none"
								onChangeText={(value) => onChange(value)}
								value={value}
								placeholder="Enter Your Email"
								error={errors.email}
							/>
						)}
						name="email"
						rules={{ required: "The email is required" }}
						defaultValue=""
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
						defaultValue=""
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
						defaultValue=""
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
							as={
								<SelectPicker
									onValueChange={(value) => {
										setUserType(value)
									}}
									selected={userType}
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
							}
						/>
						{!!errors.userType && !userType && (
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
							as={
								<SelectPicker
									onValueChange={(value) => {
										setGender(value)
									}}
									selected={gender}
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
							}
						/>
						{!!errors.gender && !gender && (
							<Text style={styles.errorText}>{errors.gender.message}</Text>
						)}
					</View>

					<View style={styles.simpleContainer}>
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
				</View>

				<FormButton
					btnStyle={{ marginBottom: 12 }}
					label="Sign up"
					onPress={handleSubmit(handleSignUp)}
					disabled={(formIsValid && !termsCondition)}
					color={{ color: termsCondition ? colors.black : colors.lightGrey }}
				/>

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
})
