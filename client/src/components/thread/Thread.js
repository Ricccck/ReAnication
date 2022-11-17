import * as React from "react";
import { useState, useEffect, useRef } from "react";

import ThreadHeader from "./ThreadHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

import Container from "@mui/material/Container";

const Thread = (props) => {
  const { username, thread, setNavState, setShowNavbar, socket } = props;

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
