import * as React from "react";
import { useState, useEffect } from "react";

import ThreadHeader from "./thread/ThreadHeader";
import Messages from "./thread/Messages";
import SendMessage from "./thread/SendMessage";

import Container from "@mui/material/Container";

import socket from "../services/socket";

import useSocketSetup from "../services/socketio.service";


const Thread = (props) => {
  const {username, setShowNavbar } = props;
  useSocketSetup()

  const [thread, setThread] = useState("");

  useEffect(() => {
    const threadName = localStorage.getItem("thread");
    setThread(threadName)

    if (threadName !== "" && username !== "") {
      socket.emit("join-thread", { username, threadName });
    }
  }, []);

  return (
    <Container sx={{ pb: 7 }} className="Thread">
      <ThreadHeader
        username={username}
        thread={thread}
        setShowNavbar={setShowNavbar}
      />
      <Messages />
      <SendMessage  username={username} thread={thread} />
    </Container>
  );
};

export default Thread;
