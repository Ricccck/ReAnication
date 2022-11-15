import * as React from "react";
// import { useState, useEffect, useRef } from "react";

import ThreadHeader from "./ThreadHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

import Container from "@mui/material/Container";
// import { styled } from "@mui/material/styles";

// const Offset = styled("div")(({ theme }) => {
//   theme.mixins.toolbar;
// });

const Thread = (props) => {
  const { socket, username, thread } = props;
  // const ref = useRef(null);

  // useEffect(() => {
  //   console.log(ref.current);
  //   if (ref && ref.current) {
  //     ref.current.scrollIntoView();
  //   }
  // }, [socket]);

  return (
    <Container className="Thread">
      <ThreadHeader socket={socket} username={username} thread={thread} />
      {/* <Offset /> */}
      <Messages socket={socket} username={username} thread={thread} />
      {/* <div ref={ref} /> */}
      <SendMessage socket={socket} username={username} thread={thread} />
    </Container>
  );
};

export default Thread;
