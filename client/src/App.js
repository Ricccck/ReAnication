import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import io from "socket.io-client";

//import components
import User from "./components/User";
import Home from "./components/Home";
import Thread from "./components/thread/Thread";
// import ThreadList from "./components/ThreadList";

//import mui contents
import Container from "@mui/material/Container";

// import functions
const socket = io();

const App = () => {
  const [username, setUsername] = useState("");
  const [thread, setThread] = useState("");

  return (
    <>
      <Router>
        <Container className="app">
          <Routes>
            <Route path="/" element={<User/>} />
            <Route
              path="/home"
              element={
                <Home
                  username={username}
                  setUsername={setUsername}
                  thread={thread}
                  setThread={setThread}
                  socket={socket}
                />
              }
            />
            <Route
              path="/thread"
              element={
                <Thread username={username} thread={thread} socket={socket} />
              }
            />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
