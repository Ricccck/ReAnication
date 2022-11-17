import * as React from "react";
import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import apiService from "../services/api.service";

const Home = (props) => {
  const {
    thread,
    setThread,
    setNavState,
    setShowNavbar,
    socket,
  } = props;
  const [username, setUsername] = useState("");

  const joinThread = () => {
    if (thread !== "" && username !== "") {
      socket.emit("join-thread", { username, thread });
    }

    setShowNavbar(false);
    setNavState("thread");
  };

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    apiService.getUserData(token).then(res => {
      setUsername(res.username)
    })
  }, [])

  return (
    <Card className="Popup">
      <h1>{username}</h1>
      <FormControl fullWidth>
        <InputLabel>Choose your topic</InputLabel>
        <Select
          className="select"
          label="thread"
          defaultValue={""}
          onChange={(e) => setThread(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value={"-story"}>Story</MenuItem>
          <MenuItem value={"-movement"}>Movement</MenuItem>
          <MenuItem value={"-drawing"}>Drawing</MenuItem>
          <MenuItem value={"-music"}>Music</MenuItem>
        </Select>
        <Button className="btn" onClick={joinThread}>
          Join Thread
        </Button>
      </FormControl>
    </Card>
  );
};

export default Home;
