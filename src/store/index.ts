import { Socket } from "phoenix"
import createStore from "zustand"
import { configurePersist } from "zustand-persist"
import AsyncStorage from "@react-native-community/async-storage"

import UserInterface from "../interfaces/UserInterface"

// Sonfigure storage
export const { persist, purge } = configurePersist({
	storage: AsyncStorage,
	rootKey: "tiptoeCacheRoot", // optional, default value is `root`
})

export interface UserDataInterface {
	data?: UserInterface
	token?: string
}

export interface AuthDataInterface extends UserDataInterface {
	isLoggedIn: boolean
}

export type AppStateInterface = {
	authData: AuthDataInterface
	socket?: Socket
	doLogin: (userData: UserDataInterface) => void
}

export const INITIAL_USER_STATE = {
	isLoggedIn: false,
}

const useStore = createStore<AppStateInterface>(
	persist(
		{
			key: "tiptoe-local-storage", // required, child key of storage
			allowlist: ["authData"], // optional, will save everything if allowlist is undefined
		},
		(set) => ({
			authData: INITIAL_USER_STATE,
			doLogin: async (userData) => {
				set((_) => ({
					authData: {
						...userData,
						isLoggedIn: true,
					},
				}))
			},
		})
	)
)

// purge()

export default useStore
