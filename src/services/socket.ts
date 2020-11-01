import { Socket } from "phoenix";

import { SOCKET_URL } from "../utils/constants"

const socket = new Socket(SOCKET_URL, {});

socket.connect();

export default socket;
