import io from "socket.io-client";
const socket = io();

const joinThread = (username, thread) => {
  if (thread !== "" && username !== "") {
    socket.emit("join-thread", { username, thread });
  }
};

const getMessages = (func) => {
  socket.on("receive_message", (data) => {
    func((state) => [
      ...state,
      {
        message: data.message,
        username: data.username,
        __createdtime__: data.__createdtime__,
      },
    ]);
  });

  return () => socket.off("receive_message");
};

const socketIoService = {
  socket,
  joinThread,
  getMessages,
};

export default socketIoService;
