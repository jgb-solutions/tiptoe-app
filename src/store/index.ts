import { Socket } from "phoenix"
import create from "zustand";

import socket from "../services/socket";
type State = {
  user: {
    isLoggedIn: boolean,
    data?: null,
    token?: string
  },
  socket: Socket
  // increase: (by: number) => void
}

const useStore = create<State>(set => ({
   user: {
    isLoggedIn: false,
    data: null
  },
  socket,
  // increase: (by) => set(state => ({
  //   bears: state.bears + by
  // })
}))

export default useStore;
