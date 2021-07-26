import createStore from "zustand"
import { configurePersist } from "zustand-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"

import UserInterface from "../interfaces/UserInterface"

// Configure offline storage
export const { persist, purge } = configurePersist({
	storage: AsyncStorage,
	rootKey: "tiptoeCacheRoot", // optional, default value is `root`
})

export interface UserDataInterface {
	user?: UserInterface
	access_token?: string
}

export interface AuthDataInterface extends UserDataInterface {
	isLoggedIn: boolean
}

export type AppStateInterface = {
	authData: AuthDataInterface
	updateAuthData: (userData: UserDataInterface) => void
	doLogin: (userData: UserDataInterface) => void
	doLogout: () => void,
	updateCardData: (params: { last4: string}) => void
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
			updateAuthData: async (userData) => {
				set((_) => ({
					authData: {
						...userData,
						isLoggedIn: true,
					},
				}))
			},
			updateCardData: async ({ last4 }) => {
				set(({ authData }) => {
					const { user, ...rest } = authData

					if (user) {
						return {
							authData: {
							...rest,
								user: {
									...user,
									pm_last_four: last4
								}
							}
						}
					} else {
						return { authData }
					}
				})
			},
			doLogin: async (userData) => {
				set((_) => ({
					authData: {
						...userData,
						isLoggedIn: true,
					},
				}))
			},
			doLogout: async () => {
				set((_) => ({
					authData: INITIAL_USER_STATE,
				}))
			},
		})
	)
)

// purge()

export default useStore
