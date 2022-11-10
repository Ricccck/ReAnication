import * as React from "react";
import { useState, useEffect } from "react";

import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Container from "@mui/material/Container";
import ThreadHeader from "./ThreadHeader";

const Thread = (props) => {
  const { socket, username, thread } = props;
  return (
    <Container className="Thread">
      <ThreadHeader socket={socket} username={username} thread={thread} />
      <Container className="Thread-container">
        <Messages socket={socket} />
        <SendMessage socket={socket} username={username} thread={thread} />
      </Container>
    </Container>
  );
};

export default Thread;
