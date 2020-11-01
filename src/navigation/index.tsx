import { AppLoading } from "expo"
import React, { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons'

// Screens
import HomeScreen from "../screens/HomeScreen"
import LogInWithEmailScreen from "../screens/LogInWithEmailScreen."
import ProfileScreen from "../screens/ProfileScreen"
import SearchScreen from "../screens/SearchScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import AddPhotoScreen from "../screens/AddPhotoScreen"
import SettingsScreen from "../screens/SettingsScreen"
import SignUpWithEmailScreen from "../screens/SignUpWithEmailScreen."
import AsyncStorage from "@react-native-community/async-storage"


AsyncStorage.clear()

// Other stuff
import { AppContext } from "../providers"
import { colors } from "../utils/colors"

// Navigators setup
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.pink,
        tabStyle: {},
        style: {
          paddingVertical: 5
        },
        showLabel: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddPhotoScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-add-circle-outline" color={color} size={size * 1.9} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-heart" color={color} size={size} />
          ),
          tabBarBadge: 3
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator >
  )
}

function MainNavigation() {
  const { isLoggedIn, loadingDataFromStorage } = useContext(AppContext)

  if (loadingDataFromStorage) return <AppLoading />

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        ) : (
            <>
              <Stack.Screen name="LogIn" component={LogInWithEmailScreen} />
              <Stack.Screen name="SignUp" component={SignUpWithEmailScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { MainNavigation }
