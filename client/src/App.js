import "./styles/App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

//import components
import Header from "./components/Header";
import User from "./components/User";
import Home from "./components/Home";
import Thread from "./components/thread/Thread";
// import ThreadList from "./components/ThreadList";
import Navbar from "./components/Navbar";

//import mui contents
import Container from "@mui/material/Container";

import apiService from "./services/api.service";

// import functions
const socket = io();

const App = () => {
  const [username, setUsername] = useState("");
  const [navState, setNavState] = useState("home");
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    apiService
      .getUserData()
      .then((res) => {
        setUsername(res.username);
      })
      .catch(() => {
        setUsername("Guest");
      });
  }, []);

  useEffect(() => {
    if (navState === "home") {
      setNavState(
        <Home
          socket={socket}
          username={username}
          setNavState={setNavState}
          setShowNavbar={setShowNavbar}
        />
      );
    } else if (navState === "thread") {
      setNavState(
        <Thread
          socket={socket}
          setNavState={setNavState}
          setShowNavbar={setShowNavbar}
        />
      );
    } else if (navState === "news") {
      setNavState();
    } else if (navState === "announcement") {
      setNavState();
    } else if (navState === "user") {
      setNavState(<User setNavState={setNavState} />);
    }
  }, [navState]);

  return (
    <>
      <Container className="app">
        {showNavbar === true && (
          <Header
            username={username}
            navState={navState}
            setNavState={setNavState}
          />
        )}
        {navState}
        {showNavbar === true && (
          <Navbar navState={navState} setNavState={setNavState} />
        )}
      </Container>
    </>
  );
};

export default App;
