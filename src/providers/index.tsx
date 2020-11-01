import React, { createContext, useEffect, useReducer } from "react"
import AsyncStorage from "@react-native-community/async-storage"

import {
	POPULATE_FROM_STORAGE,
	LOADING_DATA_FROM_STORAGE,
	STORE_USER_INFO,
	REMOVE_USER_INFO,
	RESET_STATE,
} from "./types"

import { UserRef, Auth } from "../services/firebase"

export const APP_CACHE_KEY = "app_state"

// To be updated
const initialState = {
	isLoggedIn: true,
	loadingDataFromStorage: false,
	userData: {},
}

function reducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case POPULATE_FROM_STORAGE:
			if (payload) {
				return { ...state, ...payload }
			}

			return state
		case STORE_USER_INFO:
			return { ...state, userData: payload, isLoggedIn: true }
		case REMOVE_USER_INFO:
			return { ...state, userData: {}, isLoggedIn: false }
		case LOADING_DATA_FROM_STORAGE:
			return { ...state, loadingDataFromStorage: payload }
		case RESET_STATE:
			return initialState
		default:
			return initialState
	}
}

async function getStateFromStorage() {
	return JSON.parse(await AsyncStorage.getItem(APP_CACHE_KEY, '')) || initialState
}

function writeStateToStorage(state) {
	return AsyncStorage.setItem(APP_CACHE_KEY, JSON.stringify(state))
}

function deleteStorage() {
	return AsyncStorage.removeItem(APP_CACHE_KEY)
}

export const AppContext = createContext(initialState)

export default function AppProvider({ children, value = {} }) {
	const [appState, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		const getInitialState = async () => {
			// letting everybody knows that data is being fetched from storage
			// @ts-ignore
			dispatch({ type: LOADING_DATA_FROM_STORAGE, payload: true })

			// Getting the cached data from storage
			const state = await getStateFromStorage()
			// @ts-ignore
			dispatch({ type: POPULATE_FROM_STORAGE, payload: state })

			// letting everybody knows that data has been fetched from storage
			// @ts-ignore
			dispatch({ type: LOADING_DATA_FROM_STORAGE, payload: false })
		}

		// fetch initial state from storage
		getInitialState()

		// Add event listener for Firebase Auth
		const unsubscribeToAuthState = Auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				if (!Object.keys(appState.userData).length)
					fetchAndStoreUserInfo(authUser)
			} else {
				// @ts-ignore
				dispatch({ type: REMOVE_USER_INFO })
			}
		})

		return () => {
			unsubscribeToAuthState()
		}
	}, [])

	useEffect(() => {
		writeStateToStorage(appState)
	}, [appState])

	const fetchAndStoreUserInfo = async (authUser) => {
		try {
			const userSnapshot = await UserRef.doc(authUser.uid).get()
			const userInfo = userSnapshot.data()

			// @ts-ignore
			dispatch({ type: STORE_USER_INFO, payload: userInfo })
		} catch (error) {
			console.log("Could not fetch store the user info")
		}
	}

	const storeUserInfo = async (authData, data) => {
		console.log(authData, data)

		try {
			await UserRef.doc(authData.user.uid).set(data)
			// @ts-ignore
			dispatch({ type: STORE_USER_INFO, payload: data })
		} catch (error) {
			console.log("Could not store the user info", error)
		}
	}

	const resetState = () => {
		deleteStorage()
			.then(() => {
				// @ts-ignore
				dispatch({ type: RESET_STATE })
			})
			.catch((error) => console.log("Could not reset state", error))
	}

	return (
		<AppContext.Provider
			value={{
				...appState,
				...value,
				dispatch,
				fetchAndStoreUserInfo,
				storeUserInfo,
				resetState,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
