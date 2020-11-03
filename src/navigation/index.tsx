import React from "react"
import { Icon } from "native-base"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Screens
import HomeScreen from "../screens/HomeScreen"
import LogInWithEmailScreen from "../screens/LogInWithEmailScreen."
import ProfileScreen from "../screens/ProfileScreen"
import SearchScreen from "../screens/SearchScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import AddPhotoScreen from "../screens/AddPhotoScreen"
import SettingsScreen from "../screens/SettingsScreen"
import SignUpWithEmailScreen from "../screens/SignUpWithEmailScreen"
import ChatScreen from "../screens/ChatScreen"

// Other stuff
import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"

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
            <Icon name="home" style={{
              fontSize: size,
              color: color
            }} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" style={{
              fontSize: size,
              color: color
            }} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddPhotoScreen}
        options={{
          tabBarLabel: 'Add Photo',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="add-circle"
              style={{
                fontSize: size * 1.9,
                color: color
              }} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" style={{
              fontSize: size,
              color: color
            }} />
          ),
          // tabBarBadge: 3
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" style={{
              fontSize: size,
              color: color
            }} />
          ),
        }}
      />
    </Tab.Navigator >
  )
}

function MainNavigation() {
  const isLoggedIn = useStore((state: AppStateInterface) => state.user.isLoggedIn)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
          </>
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
