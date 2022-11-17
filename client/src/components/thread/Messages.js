import * as React from "react";
import { useState, useEffect, useRef } from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import utilService from "../../services/util.services";

const Messages = (props) => {
  const { socket } = props;
  const ref = useRef(null);

  const [messagesArr, setMessagesArr] = useState([]);

  useEffect(() => {
    if (ref && ref.current) ref.current.scrollIntoView();
  }, [messagesArr]);

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

  useEffect(() => {
    socket.on("get_all_message", (data) => {
      data = utilService.sortBytimestamp(data);
      setMessagesArr((state) => [...data, ...state]);
    });

    return () => socket.off("get_all_message");
  }, [socket]);

  return (
    <Container className="Thread">
      {messagesArr.map((msg, i) => (
        <Card className="message" key={i}>
          <CardHeader
            title={msg.username}
            subheader={utilService.formatTimestamp(msg.__createdtime__)}
          />
          <CardContent className="msgText">{msg.message}</CardContent>
        </Card>
      ))}
      <div ref={ref} />
    </Container>
  );
};

export default Messages;
