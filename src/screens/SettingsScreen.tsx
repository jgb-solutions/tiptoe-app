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

import { ViewStyle, StyleSheet, Settings } from "react-native"
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"


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
						<Icon name="chevron-left" style={{ color: colors.white, fontSize: 17, }} />
					</Button>

					<Text
						style={{
							fontWeight: "bold",
							color: colors.white,
						}}
					>
						Settings
					</Text>
				</Left>
				<Right style={{ flex: 1 }}>
					<Menu
						ref={setMenuRef}
						button={
							<Icon
								onPress={showMenu}
								name="ellipsis-h"
								style={{ color: colors.white, fontSize: 17, }}
							/>
						}
						style={{ height: 100 }}
					>
						<MenuItem onPress={() => goToProfile()}>Go to profile</MenuItem>
						<MenuItem onPress={logout}>Logout</MenuItem>
					</Menu>
				</Right>
			</Header>
			<Content>
				<View>
					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Icon
							name="user"
							style={{
								fontSize: 17,
								color: colors.pink,
								marginRight: 10,
							}}
						/>
						<TouchableOpacity
							onPress={() => navigation.navigate(screenNames.UpdateInfo)}
						>
							<Text>Update account information</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Icon
							name="money"
							style={{
								fontSize: 17,
								color: colors.pink,
								marginRight: 10,
							}}
						/>

						<TouchableOpacity
							onPress={() => navigation.navigate(screenNames.Billing)}
						>
							<Text>Billing information</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Icon
							name="lock"
							style={{
								fontSize: 17,
								color: colors.pink,
								marginRight: 10,
							}}
						/>
						<TouchableOpacity
							onPress={() => navigation.navigate(screenNames.ChangePassword)}
						>
							<Text>Change password</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Icon
							name="trash"
							style={{
								fontSize: 17,
								color: colors.pink,
								marginRight: 10,
							}}
						/>
						<TouchableOpacity>
							<Text>Delete my account</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Content>
		</Container>
	)
}

const styles = StyleSheet.create({
	displayNone: {
		opacity: 0,
		height: 0,
		flex: 0,
	},
})
