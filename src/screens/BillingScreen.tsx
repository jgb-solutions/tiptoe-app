import React, { useState } from "react"
import {
	Container,
	Header,
	Content,
	Text,
	// Icon,
	Left,
	Right,
	View,
	Row,
} from "native-base"
import { FontAwesome } from '@expo/vector-icons';

import { formatToUnits } from "../utils/formatNumber"
import { screenNames } from "../utils/screens"

import {
	ViewStyle,
	StyleSheet,
	Dimensions,
	ScrollView,
	Image,
} from "react-native"

import Menu, { MenuItem, MenuDivider } from "react-native-material-menu"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

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

export default function SettingsScreen() {
	const navigation = useNavigation()
	const { logout, currentUser } = useStore((state: AppStateInterface) => ({
		logout: state.doLogout,
		currentUser: state.authData.user,
	}))
	const [isAmodel, setIsAmodel] = useState(currentUser?.modele ? true : false)
	const [showModelInfo, setShowModelInfo] = useState(false)

	let menu: any = null

	const setMenuRef = (ref: any) => {
		menu = ref
	}

	const hideMenu = () => {
		menu.hide()
	}

	const showMenu = () => {
		menu.show()
	}

	const goToProfile = () => {
		navigation.navigate(screenNames.Profile)
		hideMenu()
	}
	return (
		<Container>
			<Header
				iosBarStyle="light-content"
				androidStatusBarColor={colors.black}
				style={{ backgroundColor: colors.pink }}
			>
				<Left style={{ flexDirection: "row", alignItems: "center" }}>
					<Button
						transparent
						onPress={() => navigation.navigate(screenNames.Profile)}
					>
						<FontAwesome
							name="chevron-left"
							style={{ color: colors.white, fontSize: 20 }}
						/>
					</Button>

					<Text
						style={{
							fontWeight: "bold",
							color: colors.white,
						}}
					>
						Billing Informations
					</Text>
				</Left>

				<Right style={{ flex: 1 }}>
					<Menu
						ref={setMenuRef}
						button={
							<FontAwesome
								onPress={showMenu}
								name="ellipsis-h"
								style={{ color: colors.white, fontSize: 20 }}
							/>
						}
					>
						<MenuItem>Add a Card</MenuItem>
						<MenuDivider />
						{/* <MenuItem onPress={logout}>Logout</MenuItem> */}
					</Menu>
				</Right>
			</Header>
			<Content>
				<ScrollView style={styles.imageBox}>
					<View style={{ padding: 12 }}>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginBottom: 25,
								marginTop: 20,
								borderRadius: 5,
							}}
						>
							<FontAwesome name="credit-card" size={16} />
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 18,
									color: colors.blackOpact,
									marginLeft: 10,
								}}
							>
								My cards
							</Text>
						</View>

						<View style={styles.cardContainer}>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									width: "70%",
								}}
							>
								<FontAwesome
									name="cc-visa"
									style={{
										fontSize: 34,
										color: "#4267b2",
										marginRight: 10,
									}}
								/>
								<View>
									<Text
										style={{
											color: colors.blackOpact,
											fontWeight: "bold",
										}}
									>
										{currentUser?.name}
									</Text>
									<Text style={{ color: colors.blackOpact }}>
										<FontAwesome
											name="circle"
											style={{
												marginRight: 10,
												color: colors.blackOpact,
											}}
										/>{" "}
										<FontAwesome
											name="circle"
											style={{
												marginRight: 10,
												color: colors.blackOpact,
											}}
										/>{" "}
										<FontAwesome
											name="circle"
											style={{
												marginRight: 10,
												color: colors.blackOpact,
											}}
										/>{" "}
										4242
									</Text>
									<Text
										style={{
											color: colors.blackOpact,
										}}
									>
										Exp: 04/25
									</Text>
								</View>
							</View>
							<View>
								<Text style={{ fontWeight: "bold", color: colors.pink }}>
									<FontAwesome name="check" size={18} /> Default
								</Text>
							</View>
						</View>

						<View style={styles.cardContainer}>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									width: "70%",
								}}
							>
								<FontAwesome
									name="cc-mastercard"
									style={{
										fontSize: 34,
										color: colors.red,
										marginRight: 10,
									}}
								/>
								<View>
									<Text
										style={{
											color: colors.blackOpact,
											fontWeight: "bold",
										}}
									>
										{currentUser?.name}
									</Text>
									<Text style={{ color: colors.blackOpact }}>
										<FontAwesome
											name="circle"
											style={{
												marginRight: 10,
												color: colors.blackOpact,
											}}
										/>{" "}
										<FontAwesome
											name="circle"
											style={{
												marginRight: 10,
												color: colors.blackOpact,
											}}
										/>{" "}
										<FontAwesome
											name="circle"
											style={{
												marginRight: 10,
												color: colors.blackOpact,
											}}
										/>{" "}
										5432
									</Text>
									<Text
										style={{
											color: colors.blackOpact,
										}}
									>
										Exp: 05/23
									</Text>
								</View>
							</View>
							<View>
								<Text style={{ color: colors.pink }}>Make as default</Text>
							</View>
						</View>

						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginBottom: 10,
								marginTop: 20,
								borderRadius: 5,
							}}
						>
							<FontAwesome name="files-o" size={16} />
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 18,
									color: colors.blackOpact,
									marginLeft: 10,
								}}
							>
								My Invoices
							</Text>
						</View>

						{["04/23/2021", "03/23/2021", "02/23/2021", "01/23/2021"].map(
							(date, idx) => (
								<TouchableOpacity
									key={idx}
									style={{
										padding: 10,
										borderWidth: 0.5,
										borderColor: colors.lightGrey,
										borderRadius: 5,
										marginBottom: 10,
									}}
								>
									<Text style={{ color: colors.blackOpact }}>{date}</Text>
								</TouchableOpacity>
							)
						)}
					</View>
				</ScrollView>
			</Content>
		</Container>
	)
}

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
	imageBox: {},
	cardContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		paddingBottom: 20,
		borderBottomColor: colors.lightGrey,
		borderBottomWidth: 0.2,
	},
})
