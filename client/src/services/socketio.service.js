import { useEffect } from "react";
import socket from "./socket";

const useSocketSetup = (thread, username) => {
  useEffect(()=>{
    socket.connect();
  }, [])
}

export default useSocketSetup;