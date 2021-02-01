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
import { Picker } from "@react-native-picker/picker"

import { request } from "graphql-request"
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"

import { colors } from "../utils/colors"
import FormInput from "../components/FormInput"
import { SIGN_USER_UP } from "../graphql/queries"
import FormButton from "../components/FormButton"
import useStore, { AppStateInterface } from "../store"
import { GRAPHQL_API_URL } from "../utils/constants"
const TipToeLogo = require("../../assets/images/TipToeLogo.png")

export interface Credentials {
	lastName: string
	firstName: string
	email: string
	password: string
	type: string
	gender: string
	phone: number
	termsCondition: boolean
}

export default function SignUpWithEmailScreen() {
	const { control, handleSubmit, errors, register } = useForm<Credentials>({
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

	// console.error(selectedValue)

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
								placeholder="Enter Your First Name"
								error={errors.lastName}
							/>
						)}
						name="lastName"
						rules={{ required: "The last name is required" }}
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
								placeholder="Enter Your Last Name"
								error={errors.lastName}
							/>
						)}
						name="firstName"
						rules={{ required: "The last name is required" }}
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
								error={errors.phone}
							/>
						)}
						name="phone"
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
								<Picker
									selectedValue={selectedValue}
									onValueChange={(itemValue, itemIndex) =>
										setSelectedValue(itemValue)
									}
								>
									<Picker.Item label="Sign up as a viewer" value="viewer" />
									<Picker.Item label="Sign up as a model" value="model" />
								</Picker>
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
						<Controller
							control={control}
							name="termsCondition"
							rules={{
								required: "You suppose to accept our terms and condition first",
							}}
							render={() => (
								<View style={styles.checkboxesTermsCondition}>
									<Checkbox
										checked={termsCondition}
										onValueChanged={() => setTermsCondition(!termsCondition)}
										label={""}
									/>
									<Text style={{ marginLeft: 10 }}>
										Accept our term and condition
									</Text>
								</View>
							)}
						/>
						{!!errors.termsCondition && !termsCondition && (
							<Text style={styles.errorText}>
								{errors.termsCondition.message}
							</Text>
						)}
					</View>
				</View>

				<FormButton
					btnStyle={{ marginBottom: 12 }}
					label="Sign up"
					onPress={handleSubmit(handleSignUp)}
					disabled={!termsCondition}
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
		marginTop: 25,
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
		textTransform: "uppercase",
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
