import * as React from "react";
import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

const Messages = (props) => {
  const { socket } = props;

  const [messagesArr, setMessagesArr] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesArr((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Container className="Thread">
      {messagesArr.map((msg, i) => (
        <Card className="message" key={i}>
          <CardHeader
            title={msg.username}
            subheader={formatDateFromTimestamp(msg.__createdtime__)}
          />
          <CardContent className="msgText">{msg.message}</CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Messages;
