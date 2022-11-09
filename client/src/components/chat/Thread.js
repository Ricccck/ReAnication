import * as React from "react";
import { useState, useEffect } from "react";

import Messages from "./Messages";

import Container from "@mui/material/Container";

const Thread = (props) => {
  const {socket} = props;
  return (
    <Container className="Thread">
      <div>
      <Messages socket={socket} />
      </div>
    </Container>
  );
};

export default Thread;
