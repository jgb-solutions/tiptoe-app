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
import ChatListScreen from "../screens/ChatListScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import AddPhotoScreen from "../screens/AddPhotoScreen"
import SettingsScreen from "../screens/SettingsScreen"
import SignUpWithEmailScreen from "../screens/SignUpWithEmailScreen"
import ChatScreen from "../screens/ChatScreen"
import PublicModelProfileScreen from "../screens/PublicModelProfileScreen"

// Other stuff
import { colors } from "../utils/colors"
import useStore, { AppStateInterface } from "../store"
import { screenNames } from "../utils/screens"

// Navigators setup
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={screenNames.Home}
      tabBarOptions={{
        activeTintColor: colors.pink,
        tabStyle: {},
        style: {
          paddingVertical: 5
        },
        showLabel: false
      }}
    >
      {/* <Tab.Screen
        name={screenNames.PublicModelProfileScreen}
        component={PublicModelProfileScreen}
        options={{
          tabBarVisible: false
        }}
      /> */}
      <Tab.Screen
        name={screenNames.Home}
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
        name={screenNames.Search}
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
        name={screenNames.Add}
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
        name={screenNames.Favorites}
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
        name={screenNames.Profile}
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
    </Tab.Navigator>
  )
}

function MainNavigation() {
  const isLoggedIn = useStore((state: AppStateInterface) => state.authData.isLoggedIn)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
            <Stack.Screen name={screenNames.Chat} component={ChatScreen} />
            <Stack.Screen name={screenNames.ChatList} component={ChatListScreen} />
            <Tab.Screen name={screenNames.PublicModelProfileScreen} component={PublicModelProfileScreen} />
          </>
        ) : (
            <>
              <Stack.Screen name={screenNames.LogIn} component={LogInWithEmailScreen} />
              <Stack.Screen name={screenNames.SignUp} component={SignUpWithEmailScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { MainNavigation }
