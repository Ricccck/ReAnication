import * as React from "react";
import { useState, useEffect, useRef } from "react";

import ThreadHeader from "./ThreadHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

import Container from "@mui/material/Container";

import apiService from "../../services/api.service";

const Thread = (props) => {
  const { setNavState, setShowNavbar, socket } = props;

  const [username, setUsername] = useState("");
  const [thread, setThread] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;

    apiService.getUserData(token).then((res) => {
      setUsername(res.username);
    });

    setThread(localStorage.getItem("thread"));
  }, []);

  return (
    <Container sx={{ pb: 7 }} className="Thread">
      <ThreadHeader
        socket={socket}
        username={username}
        thread={thread}
        setNavState={setNavState}
        setShowNavbar={setShowNavbar}
      />
      <Messages socket={socket} />
      <SendMessage socket={socket} username={username} thread={thread} />
    </Container>
  );
};

export default Thread;
