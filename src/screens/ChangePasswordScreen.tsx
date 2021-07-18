import React, { useState, useRef } from "react"
import { Container, Header, Content, Text, Icon, Left, View } from "native-base"
import { formatToUnits } from "../utils/formatNumber"
import { screenNames } from "../utils/screens"
import FormInput from "../components/FormInput"
import { request } from "graphql-request"
import { GRAPHQL_API_URL } from "../utils/constants"
import { CHANGE_PASSWORD } from "../graphql/mutations"

import {
	StyleSheet,
	ScrollView,
	SafeAreaView,
	ViewStyle,
} from "react-native"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import FormButton from "../components/FormButton"

import { useForm, Controller } from "react-hook-form"

type StatsProps = {
	number: number
	title: string
	style?: ViewStyle
}

const Stats = ({ number, title, style }: StatsProps) => (
	<View style={{ alignItems: "center", ...style }}>
		<Text style={{ fontWeight: "bold" }}>
			{number > 999 ? formatToUnits(number) : number}
		</Text>
		<Text>{title}</Text>
	</View>
)

type ButtonProps = {
	style?: ViewStyle
	children: React.ReactNode
	onPress?: () => void
	transparent?: boolean
	disable?: boolean
}

const Button = ({
	children,
	style,
	onPress,
	transparent,
	disable,
}: ButtonProps) => {
	const handleOnPress = () => {
		if (disable) return

		onPress && onPress()
	}

	return (
		<TouchableOpacity
			style={[
				{
					alignItems: "center",
					justifyContent: "center",
					paddingHorizontal: 8,
					paddingVertical: 2,
					borderRadius: 6,
					opacity: disable ? 0.7 : 1,
					backgroundColor: transparent ? "transparent" : undefined,
					...style,
				},
			]}
			onPress={handleOnPress}
		>
			{children}
		</TouchableOpacity>
	)
}

export interface Credentials {
	password: string
	newPassword: string
	passwordConfirmation: string
}

export default function ChangePasswordScreen() {
	const { control, handleSubmit, errors } = useForm<Credentials>({
		mode: "onBlur",
	})

	const navigation = useNavigation()
	const { currentUser } = useStore((state: AppStateInterface) => ({
		currentUser: state.authData.data,
	}))

	const [passwordError, setPasswordError] = useState<any | null>("")

	const changePassword = async (input: Credentials) => {
        try {
			const { register: data } = await request(
				GRAPHQL_API_URL,
				CHANGE_PASSWORD,
				{
					input: input,
				}
			)

			if (data) {
				navigation.navigate(screenNames.Profile)
			}

            if (input.newPassword !== input.passwordConfirmation) {
				setPasswordError("Password confirmation must match")
            }

			if (errors) {
				setPasswordError("something went wrong. Please check again")
			}
		} catch (error) {
			setPasswordError(error.response.errors[0].message)
		}
        
	}

	return (
		<Container>
			<Header
				iosBarStyle="light-content"
				androidStatusBarColor={colors.black}
				style={{ backgroundColor: colors.pink }}
			>
				<Left style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
					<Button
						transparent
						onPress={() => navigation.navigate(screenNames.Setting)}
					>
						<Icon name="arrow-back" style={{ color: colors.white }} />
					</Button>

					<Text
						style={{
							fontWeight: "bold",
							color: colors.white,
							width: 200,
						}}
					>
						Change Password
					</Text>
				</Left>
			</Header>

			<Content>
				<SafeAreaView style={styles.container}>
					<ScrollView contentContainerStyle={styles.contentContainer}>
						{/* <Image style={styles.image} source={TipToeLogo} /> */}

						<Text style={styles.password}>Reset password</Text>
						<Text style={styles.passwordError}>{passwordError}</Text>

						<View style={styles.inputsContainer}>
							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<FormInput
										onBlur={onBlur}
										secureTextEntry
										autoCapitalize="none"
										onChangeText={(value) => onChange(value)}
										value={value}
										placeholder="Enter Your Current Password"
										error={errors.password}
									/>
								)}
								name="password"
								rules={{ required: "The current password is required" }}
								defaultValue=""
							/>

							<Controller
								control={control}
								render={({ onChange, onBlur, value }) => (
									<FormInput
										onBlur={onBlur}
										secureTextEntry
										autoCapitalize="none"
										onChangeText={(value) => onChange(value)}
										value={value}
										placeholder="Enter The New Password"
										error={errors.newPassword}
									/>
								)}
								name="newPassword"
								rules={{ required: "The new password is required" }}
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
										placeholder="Confirm Your new Password"
										error={errors.passwordConfirmation}
									/>
								)}
								name="passwordConfirmation"
								rules={{ required: "The confirmation password is required" }}
								defaultValue=""
							/>
						</View>

						<FormButton
							btnStyle={{ marginBottom: 12 }}
							label="Change"
							onPress={handleSubmit(changePassword)}
						/>
					</ScrollView>
				</SafeAreaView>
			</Content>
		</Container>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		paddingTop: 50,
	},
	contentContainer: {
		alignItems: "center",
	},
	password: {
		textTransform: "uppercase",
		fontSize: 24,
		marginVertical: 20,
	},
	passwordError: {
		textTransform: "uppercase",
		color: colors.red,
		fontSize: 18,
		marginVertical: 20,
        paddingHorizontal: 10,
        textAlign: 'center'
	},
	inputsContainer: {
		marginHorizontal: 30,
		alignSelf: "stretch",
	},
	smallText: {
		textTransform: "uppercase",
		// color: colors.white,
		fontSize: 12,
	},
})
