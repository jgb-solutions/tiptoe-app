import { Socket } from "phoenix"
import createStore from "zustand";
import { configurePersist} from 'zustand-persist'
import AsyncStorage from "@react-native-community/async-storage"

// Sonfigure storage
export const { persist, purge } = configurePersist({
  storage: AsyncStorage,
  rootKey: 'tiptoeCacheRoot', // optional, default value is `root`
})


export type AppStateInterface = {
  user: {
    isLoggedIn: boolean,
    data?: null,
    token?: string
  },
  socket?: Socket
  login: (username: string, password: string) => void
}

const useStore = createStore<AppStateInterface>(
  persist({
    key: 'tiptoe-local-storage', // required, child key of storage
    allowlist: [], // optional, will save everything if allowlist is undefined
    denylist: [], // optional, if allowlist set, denylist will be ignored
  }, (set) => ({
    user: {
    isLoggedIn: false,
    data: null
  },
    login: async (username, password) => {
      // const { user } = await webLogin(username, password)
      set((state) => ({
        user: {
          isLoggedIn: true
        }
      }))
    }
  }))
)

export default useStore;
