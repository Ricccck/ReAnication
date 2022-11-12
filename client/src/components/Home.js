import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import socketIoService from "../services/socket.service";
const { joinThread } = socketIoService;

const Home = (props) => {
  const { username, setUsername, thread, setThread, socket } = props;
  const navigate = useNavigate();

  return (
    <Container className="Home">
      <Card className="home-card">
        <h1>ReAnication</h1>
        <TextField
          className="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Choose a thread</InputLabel>
          <Select
            className="select"
            label="thread"
            defaultValue={""}
            onChange={(e) => setThread(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={"Demo Thread1"}>Demo Thread1</MenuItem>
            <MenuItem value={"Demo Thread2"}>Demo Thread2</MenuItem>
            <MenuItem value={"Demo Thread3"}>Demo Thread3</MenuItem>
            <MenuItem value={"Demo Thread4"}>Demo Thread4</MenuItem>
          </Select>
          <Button className="btn" onClick={()=> {
            joinThread(username, thread)

            navigate("/thread", { replace: true });
            }}>
            Join Room
          </Button>

          {/* <Button
            onClick={() => {
              getAllMessage().then(res => {
                console.log(res)
              })
            }}
          >
            test
          </Button> */}
        </FormControl>
      </Card>
    </Container>
  );
};

export default Home;
