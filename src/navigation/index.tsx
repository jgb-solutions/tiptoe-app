import React from "react"
import { Icon } from "native-base"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ApolloProvider } from "@apollo/react-hooks"

// Screens
import ChatScreen from "../screens/ChatScreen"
import HomeScreen from "../screens/HomeScreen"
import SearchScreen from "../screens/SearchScreen"
import UpdateInfoScreen from "../screens/UpdateInfoScreen"
import ProfileScreen from "../screens/ProfileScreen"
import ChatListScreen from "../screens/ChatListScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import AddPhotoScreen from "../screens/AddPhotoScreen"
import AddPhotoStep2Screen from "../screens/AddPhotoStep2Screen"
import AddPhotoStep3Screen from "../screens/AddPhotoStep3Screen"
import SettingsScreen from "../screens/SettingsScreen"
import ChangePasswordScreen from "../screens/ChangePasswordScreen"
import LogInWithEmailScreen from "../screens/LogInWithEmailScreen."
import SignUpWithEmailScreen from "../screens/SignUpWithEmailScreen"
import PublicModelProfileScreen from "../screens/PublicModelProfileScreen"
import TermsConditionScreen from "../screens/TermsConditionScreen"
import BillingScreen from "../screens/BillingScreen"

// Other stuff
import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { screenNames } from "../utils/screens"
import { getClient } from "../graphql/client"
import SignUpWithEmailStep2Screen from "../screens/SignUpWithEmailStep2Screen"

// Navigators setup
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigation() {
	const { currentUser } = useStore((state: AppStateInterface) => ({
		currentUser: state.authData.user,
	}))
	const navigatorScreenOptions = { headerShown: false }

	return (
		<Tab.Navigator
			initialRouteName={screenNames.Home}
			tabBarOptions={{
				activeTintColor: colors.pink,
				inactiveTintColor: colors.black,
				tabStyle: {},
				style: {
					paddingVertical: 5,
				},
				showLabel: false,
			}}
		>
			<Tab.Screen
				name={screenNames.Home}
				component={HomeScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="home"
							style={{
								fontSize: size,
								color,
							}}
						/>
					),
				}}
			/>

			<Tab.Screen
				name={screenNames.Search}
				component={SearchScreen}
				options={{
					tabBarLabel: "Search",
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="search"
							style={{
								fontSize: size,
								color,
							}}
						/>
					),
				}}
			/>
			{currentUser?.modele && (
				<Tab.Screen
					name={screenNames.Add}
					component={AddPhotoScreen}
					options={{
						tabBarLabel: "Add Photo",
						tabBarIcon: ({ color, size }) => (
							<Icon
								name="add-circle"
								style={{
									fontSize: size * 1.9,
									color,
								}}
							/>
						),
					}}
				/>
			)}

			<Tab.Screen
				name={screenNames.Favorites}
				component={FavoritesScreen}
				options={{
					tabBarLabel: "Favorites",
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="heart"
							style={{
								fontSize: size,
								color,
							}}
						/>
					),
					// tabBarBadge: 3
				}}
			/>
			<Tab.Screen
				name={screenNames.Profile}
				component={ProfileScreen}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="person"
							style={{
								fontSize: size,
								color,
							}}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}

function MainNavigation() {
	const { isLoggedIn, currentUser } = useStore(
		(state: AppStateInterface) => ({
			isLoggedIn: state.authData.isLoggedIn,
			currentUser: state.authData.user,
		})
	)
	const navigatorScreenOptions = { headerShown: false }

	return (
		<NavigationContainer>
			{isLoggedIn ? (
				<ApolloProvider client={getClient()}>
					<Stack.Navigator
						initialRouteName={
							currentUser?.first_login ? screenNames.UpdateInfo : screenNames.Home
						}
						screenOptions={navigatorScreenOptions}
					>
						<Stack.Screen name="TabNavigation" component={TabNavigation} />
						<Stack.Screen name={screenNames.Chat} component={ChatScreen} />
						<Stack.Screen
							name={screenNames.ChatList}
							component={ChatListScreen}
						/>
						<Stack.Screen
							name={screenNames.PublicModelProfileScreen}
							component={PublicModelProfileScreen}
						/>
						<Stack.Screen
							name={screenNames.Setting}
							component={SettingsScreen}
						/>
						<Stack.Screen
							name={screenNames.Billing}
							component={BillingScreen}
						/>
						<Stack.Screen
							name={screenNames.UpdateInfo}
							component={UpdateInfoScreen}
						/>
						<Stack.Screen
							name={screenNames.ChangePassword}
							component={ChangePasswordScreen}
						/>
						<Stack.Screen
							name={screenNames.AddPhotoStep2}
							component={AddPhotoStep2Screen}
						/>
						<Stack.Screen
							name={screenNames.AddPhotoStep3}
							component={AddPhotoStep3Screen}
						/>
					</Stack.Navigator>
				</ApolloProvider>
			) : (
				<Stack.Navigator
					screenOptions={navigatorScreenOptions}
					initialRouteName={screenNames.LogIn}
				>
					<Stack.Screen
						name={screenNames.LogIn}
						component={LogInWithEmailScreen}
					/>
					<Stack.Screen
						name={screenNames.SignUpWithEmail}
						component={SignUpWithEmailScreen}
					/>
					<Stack.Screen
						name={screenNames.SignUpWithEmailStep2}
						component={SignUpWithEmailStep2Screen}
					/>
					<Stack.Screen
						name={screenNames.TermsCondition}
						component={TermsConditionScreen}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	)
}

export { MainNavigation }
