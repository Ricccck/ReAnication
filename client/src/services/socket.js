import { io } from "socket.io-client";

const socket = new io("http://127.0.0.1:8080/", {
  autoConnect: false,
});

export default socket;
