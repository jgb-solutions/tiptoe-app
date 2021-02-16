import React, { useState } from "react"
import {
	Container,
	Header,
	Content,
	Text,
	Icon,
	Left,
	Right,
	View,
	Thumbnail,
	Card,
	CardItem,
	Body,
} from "native-base"
import { formatToUnits } from "../utils/formatNumber"
import { screenNames } from "../utils/screens"

import { ViewStyle, StyleSheet, Settings } from "react-native"
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu"

import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
var dateFormat = require("dateformat")

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

export default function ProfileScreen() {
	const navigation = useNavigation()
	const { logout, currentUser } = useStore((state: AppStateInterface) => ({
		logout: state.doLogout,
		currentUser: state.authData.data,
	}))
	const [isAmodel, setIsAmodel] = useState(currentUser?.model ? true : false)
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

	const settings = () => {
		navigation.navigate(screenNames.Setting)
		hideMenu()
	}

	const updateProfile = () => {
		navigation.navigate(screenNames.UpdateInfo)
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
						onPress={() => navigation.navigate(screenNames.Home)}
					>
						<Icon name="arrow-back" style={{ color: colors.white }} />
					</Button>

					<Text
						style={{
							fontWeight: "bold",
							color: colors.white,
						}}
					>
						Profile
					</Text>
				</Left>
				<Right style={{ flex: 1 }}>
					<Menu
						ref={setMenuRef}
						button={
							<Icon
								onPress={showMenu}
								name="more"
								style={{ color: colors.white }}
							/>
						}
					>
						<MenuItem onPress={() => settings()}>Settings</MenuItem>
						<MenuItem onPress={() => updateProfile()}>Update profile</MenuItem>
						<MenuDivider />
						<MenuItem onPress={logout}>Logout</MenuItem>
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
						<Thumbnail
							large
							source={{
								uri: !showModelInfo
									? currentUser?.avatarUrl
									: currentUser?.model?.posterUrl,
							}}
						/>

						{showModelInfo ? (
							<View
								style={{
									flex: 1,
									marginRight: 10,
									flexDirection: "row",
									justifyContent: "flex-end",
									alignItems: "center",
								}}
							>
								<Stats
									title={`Post${
										currentUser?.model?.photosCount !== 1 ? "s" : ""
									}`}
									number={123}
								/>
								<Stats
									style={{ marginLeft: 12 }}
									title={`Follower${
										currentUser?.model?.followersCount !== 1 ? "s" : ""
									}`}
									number={1234}
								/>
							</View>
						) : (
							<View
								style={{
									flex: 1,
									marginLeft: 20,
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
								}}
							>
								<View>
									<Text style={{ fontSize: 24, fontWeight: "bold" }}>
										{currentUser?.name}
									</Text>
									<Text style={{ fontSize: 18 }}>{currentUser?.userType}</Text>
								</View>
							</View>
						)}
					</View>

					<View
						style={{ flexDirection: "column", marginBottom: 24, marginTop: 20 }}
					>
						<View style={{ flexDirection: "row", marginBottom: 10 }}>
							<Icon
								name="call"
								style={{
									fontSize: 20,
									marginRight: 15,
									color: colors.pink,
								}}
							/>
							<Text>{currentUser?.telephone}</Text>
						</View>
						<View style={{ flexDirection: "row" }}>
							<Icon
								name="mail"
								style={{
									fontSize: 20,
									marginRight: 15,
									color: colors.pink,
								}}
							/>
							<Text>{currentUser?.email}</Text>
						</View>
					</View>
					{isAmodel && (
						<View
							style={{
								flexDirection: "row",
								marginBottom: 10,
								justifyContent: "space-around",
							}}
						>
							<Button
								style={{
									flex: 1,
									backgroundColor: !showModelInfo ? colors.pink : colors.white,
									justifyContent: "center",
									borderColor: colors.pink,
									borderWidth: 1,
									paddingVertical: 10,
									width: 180,
								}}
								onPress={() => setShowModelInfo(false)}
								disable={!showModelInfo}
							>
								<Text
									style={{ color: showModelInfo ? colors.black : colors.white }}
								>
									Personal Information
								</Text>
							</Button>
							<Button
								style={{
									flex: 1,
									backgroundColor: showModelInfo ? colors.pink : colors.white,
									borderWidth: 1,
									borderColor: colors.pink,
									justifyContent: "center",
									paddingVertical: 10,
									width: 180,
								}}
								onPress={() => setShowModelInfo(true)}
								disable={showModelInfo}
							>
								<Text
									style={{
										color: !showModelInfo ? colors.black : colors.white,
									}}
								>
									Model Information
								</Text>
							</Button>
						</View>
					)}
				</View>
				<View style={showModelInfo && styles.displayNone}>
					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							Name
						</Text>
						<Text>{currentUser?.name}</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							Gender
						</Text>
						<Text>{currentUser?.gender}</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							Joined on
						</Text>
						<Text>{dateFormat(currentUser?.insertedAt, "fullDate")}</Text>
					</View>
				</View>
				<View style={!showModelInfo && styles.displayNone}>
					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							Model Name
						</Text>
						<Text>{currentUser?.model?.name}</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							Stage Name
						</Text>
						<Text>{currentUser?.model?.stageName}</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							Facebook
						</Text>

						<Text>{currentUser?.model?.facebook}</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							instagram
						</Text>

						<Text>{currentUser?.model?.instagram}</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							twitter
						</Text>

						<Text>{currentUser?.model?.twitter}</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							borderTopColor: "#EFEFEF",
							borderTopWidth: 1,
							padding: 12,
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 20, width: 100 }}>
							youtube
						</Text>

						<Text>{currentUser?.model?.youtube}</Text>
					</View>
				</View>
				{!isAmodel && (
					<Card style={{ marginTop: 30 }}>
						<CardItem
							header
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							<Text style={{ fontWeight: "bold", fontSize: 18 }}>
								Your Cards
							</Text>
							<TouchableOpacity>
								<Icon
									name="add"
									style={{
										fontSize: 24,
										fontWeight: "bold",
									}}
								/>
							</TouchableOpacity>
						</CardItem>
						<CardItem>
							<Body>
								<Text>...4856 / 08-25</Text>
							</Body>
						</CardItem>
					</Card>
				)}

				{isAmodel && (
					<Card style={{ marginTop: 30 }}>
						<CardItem
							header
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							<Text style={{ fontWeight: "bold", fontSize: 18 }}>
								Your Models
							</Text>
						</CardItem>
						<CardItem>
							<Body
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									justifyContent: "flex-start",
								}}
							>
								<TouchableOpacity
									style={{
										width: 80,
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										marginHorizontal: 6,
										marginBottom: 10,
									}}
								>
									<Thumbnail
										large
										source={{
											uri: currentUser?.avatarUrl,
										}}
									/>
									<Text
										style={{
											fontWeight: "bold",
											marginTop: 10,
											color: colors.pink,
										}}
									>
										Jessica12
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										width: 80,
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										marginHorizontal: 6,
										marginBottom: 10,
									}}
								>
									<Thumbnail
										large
										source={{
											uri: currentUser?.avatarUrl,
										}}
									/>
									<Text
										style={{
											fontWeight: "bold",
											marginTop: 10,
											color: colors.pink,
										}}
									>
										Ann21
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										width: 80,
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										marginHorizontal: 6,
										marginBottom: 10,
									}}
								>
									<Thumbnail
										large
										source={{
											uri: currentUser?.avatarUrl,
										}}
									/>
									<Text
										style={{
											fontWeight: "bold",
											marginTop: 10,
											color: colors.pink,
										}}
									>
										Rose32
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										width: 80,
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										marginHorizontal: 6,
										marginBottom: 10,
									}}
								>
									<Thumbnail
										large
										source={{
											uri: currentUser?.avatarUrl,
										}}
									/>
									<Text
										style={{
											fontWeight: "bold",
											marginTop: 10,
											color: colors.pink,
										}}
									>
										Kika2
									</Text>
								</TouchableOpacity>
							</Body>
						</CardItem>
					</Card>
				)}
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
