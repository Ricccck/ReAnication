import io from "socket.io-client";
const socket = io("http://localhost:8080", {
  withCredentials: true,
});

const joinThread = (username, thread) => {
  if (thread !== "" && username !== "") {
    socket.emit("join-thread", { username, thread });
  }
};

const getMessages = async (func) => {
  await socket.on("receive_message", (data) => {
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
