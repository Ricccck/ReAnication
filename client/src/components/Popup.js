import * as React from "react";
import { useState, useEffect } from "react";

import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Button } from "@mui/material";

const Popup = (props) => {
  const {
    socket,
    username,
    selectedAnime,
    setNavState,
    setShowNavbar,
    setPopupView,
  } = props;
  const [thread, setThread] = useState("");

  const joinThread = () => {
    localStorage.setItem("thread", thread);

    if (thread !== "" && username !== "") {
      socket.emit("join-thread", { username, thread });
    }

    setShowNavbar(false);
    setNavState("thread");
  };

  const closePopup = () => {
    setPopupView(false);
  };

  return (
    <Card
      className="Popup"
      sx={{ position: "fixed", zIndex: "tooltip", width: 0.8 }}
    >
      <CardContent>
        <Button className="close-btn" onClick={closePopup}>
          <CloseIcon />
        </Button>
        <Typography variant="h5" component="div">
          {selectedAnime.title}
        </Typography>
        <Typography>broad on {selectedAnime.media}</Typography>
        <Typography>{selectedAnime.released_on_about}</Typography>

        <FormControl fullWidth>
          <InputLabel>Choose your topic, {username}</InputLabel>
          <Select
            className="select"
            label="thread"
            defaultValue={""}
            onChange={(e) => setThread(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={`${selectedAnime.id}-story`}>Story</MenuItem>
            <MenuItem value={`${selectedAnime.id}-movement`}>Movement</MenuItem>
            <MenuItem value={`${selectedAnime.id}-drawing`}>Drawing</MenuItem>
            <MenuItem value={`${selectedAnime.id}-music`}>Music</MenuItem>
          </Select>
          <Button className="btn" onClick={joinThread}>
            Join Thread
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default Popup;
