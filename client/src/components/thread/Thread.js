import * as React from "react";
import { useState, useEffect, useRef } from "react";

import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Container from "@mui/material/Container";
import ThreadHeader from "./ThreadHeader";

const Thread = (props) => {
  const { socket, username, thread } = props;
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref.current);
    if (ref && ref.current) {
      ref.current.scrollIntoView();
    }
  }, [socket]);

  return (
    <Container className="Thread">
      <ThreadHeader socket={socket} username={username} thread={thread} />
      <Container className="Thread-container" position={"relative"}>
        <Messages socket={socket} username={username} thread={thread}/>
        <SendMessage socket={socket} username={username} thread={thread} />
        <div ref={ref} />
      </Container>
    </Container>
  );
};

export default Thread;
