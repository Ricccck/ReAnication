import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const joinThread = (username, thread) => {
  const navigate = useNavigate()
  if (thread !== "" && username !== "") {
    socket.emit("join-thread", { username, thread });
  }

  navigate("/thread", { replace: true });
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
  joinThread,
  getMessages,
};

export default socketIoService;
