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
} from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { formatToUnits } from "../utils/formatNumber"
import { screenNames } from "../utils/screens"

import {
	ViewStyle,
	StyleSheet,
	Settings,
	Dimensions,
	ScrollView,
	Image,
	ImageBackground,
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
						<Icon
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
						Billing
					</Text>
				</Left>

                <Right style={{ flex: 1 }}>
					<Menu
						ref={setMenuRef}
						button={
							<Icon
								onPress={showMenu}
								name="ellipsis-h"
                                style={{ color: colors.white, fontSize: 20 }}
							/>
						}
					>
						<MenuItem >Add a Card</MenuItem>
						<MenuDivider />
						{/* <MenuItem onPress={logout}>Logout</MenuItem> */}
					</Menu>
				</Right>
			</Header>
			<Content>
				<View style={{ padding: 12 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 8,
						}}
					>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 18,
								color: colors.pink,
							}}
						>
							My cards
						</Text>
					</View>
					<View>
						<ScrollView style={styles.imageBox}>
							<View style={styles.imageWrapper}>
								<TouchableOpacity>
									<View style={styles.image}>
										<Text
											style={{
												fontWeight: "bold",
												// color: colors.white,
												marginBottom: 10,
											}}
										>
											{currentUser?.name}
										</Text>
										<View
											style={{
												flex: 1,
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<Text>XXXX XXXX XXXX 4242</Text>
											<Text
												style={{
													fontWeight: "bold",
													// color: colors.white,
													marginBottom: 10,
												}}
											>
												Visa
											</Text>
										</View>
                                        <Text>Exp: 04/24</Text>
									</View>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>
				</View>
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
	imageSelected: {
		height: "100%",
		width: "100%",
	},
	imageBox: {},
	imageWrapper: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		// justifyContent: "space-between",
	},
	image: {
		height: 100,
		width: SCREEN_WIDTH / 1.07,
		borderWidth: 0.5,
		borderColor: "rgba(0,0,0,.2)",
		borderRadius: 10,
		marginBottom: 10,
		padding: 10,
		flex: 1,
		// alignItems: 'center',
		resizeMode: "cover",
	},
})
