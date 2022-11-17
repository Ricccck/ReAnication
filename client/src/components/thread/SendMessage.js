import * as React from "react";
import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const SendMessage = (props) => {
  const { socket, username, thread } = props;
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", {
        username,
        thread,
        message,
        __createdtime__,
      });
      setMessage("");
    }
  };

  return (
    <Container
      className="SendMessage"
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          variant="outlined"
          className="message-input"
          label="Send your voice"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="btn" variant="contained" onClick={sendMessage}>
          <SendIcon />
        </Button>
      </Stack>
    </Container>
  );
};

export default SendMessage;
