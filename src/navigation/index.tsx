import { AppLoading } from "expo"
import React, { useContext } from "react"
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Screens
import HomeScreen from "../screens/HomeScreen"
import LogInScreen from "../screens/LogInScreen"
import LogInWithEmailScreen from "../screens/LogInWithEmailScreen."
import ProfileScreen from "../screens/ProfileScreen"
import SettingsScreen from "../screens/SettingsScreen"
import SignUpScreen from "../screens/SignUpScreen"
import SignUpWithEmailScreen from "../screens/SignUpWithEmailScreen."


// Other stuff
import { AppContext } from "../providers"

// Navigators setup
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

function MainNavigation() {
  const { isLoggedIn, loadingDataFromStorage } = useContext(AppContext)

  if (loadingDataFromStorage) return <AppLoading />

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        ) : (
            <>
              <Stack.Screen name="LogIn" component={LogInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="LogInWithEmail" component={LogInWithEmailScreen} />
              <Stack.Screen name="SignUpWithEmail" component={SignUpWithEmailScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { MainNavigation }
