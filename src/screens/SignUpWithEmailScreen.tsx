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
	type: string
	gender: string
	telephone: number
}

export default function SignUpWithEmailScreen() {
	const { control, handleSubmit, errors } = useForm<Credentials>({
		mode: "onBlur",
	})
	const navigation = useNavigation()
	const [signUpError, setsignUpError] = useState("")
	const [selectedValue, setSelectedValue] = useState<any | null>(null)
	const [termsCondition, setTermsCondition] = useState<boolean | false>(false)
	const { doLogin } = useStore((state: AppStateInterface) => ({
		doLogin: state.doLogin,
	}))

	const genres = ["male", "female", "other"]

	const [gender, setGender] = useState("")

	const handleSignUp = async (credentials: Credentials) => {
		try {
			const { signUp: userData } = await request(
				GRAPHQL_API_URL,
				SIGN_USER_UP,
				{
					input: credentials,
				}
			)

			if (errors) {
				setsignUpError("Your email or password is not valid.")
			}

			if (userData) {
				doLogin(userData)
			}
		} catch (error) {
			console.log(JSON.stringify(error.response.errors[0].message))
			setsignUpError(error.response.errors[0].message)
		}
	}

	// const options = ["Viewer", "Model"]

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
							borderColor: errors.type ? colors.error : colors.black,
							paddingHorizontal: 10,
							borderWidth: 0.6,
							borderRadius: 50,
							marginBottom: 15,
						}}
					>
						<Controller
							name="type"
							control={control}
							render={({}) => (
								<SelectPicker
									onValueChange={(value) => {
										setSelectedValue(value)
									}}
									selected={selectedValue}
									style={{ flexDirection: "row", justifyContent: "center" }}
									onSelectedStyle={{ color: "#252525", fontSize: 16 }}
									placeholder="Signup as"
									placeholderStyle={{
										textAlign: "center",
										fontSize: 15,
										color: "#757575",
									}}
								>
									<SelectPicker.Item label={"Viewer"} value={"viewer"} />
									<SelectPicker.Item label={"Model"} value={"model"} />
								</SelectPicker>
							)}
						/>
					</View>

					<View style={styles.simpleContainer}>
						<Text style={{ margin: 10 }}>Check for your gender</Text>

						<Controller
							control={control}
							name="gender"
							rules={{ required: "The gender is required" }}
							render={() => (
								<View style={styles.checkboxesContainer}>
									{genres.map((genre) => (
										<Checkbox
											key={genre}
											checked={gender === genre}
											onValueChanged={() => setGender(genre)}
											label={genre}
										/>
									))}
								</View>
							)}
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
					btnStyle={{ marginBottom: 12, }}
					label="Sign up"
					onPress={handleSubmit(handleSignUp)}
					disabled={!termsCondition}
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
