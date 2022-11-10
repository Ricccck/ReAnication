import * as React from "react";
import { useState, useEffect } from "react";

import Messages from "./Messages";
import SendMessage from "./SendMessage"
import Container from "@mui/material/Container";

const Thread = (props) => {
  const {socket, username, thread} = props;
  return (
    <Container className="Thread">
      <Messages socket={socket} />
      <SendMessage socket={socket} username={username} thread={thread}/>
    </Container>
  );
};

export default Thread;
