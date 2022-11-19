import "./styles/App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

//import components
import User from "./components/User";
import Home from "./components/Home";
import Thread from "./components/thread/Thread";
// import ThreadList from "./components/ThreadList";
import Navbar from "./components/Navbar";

//import mui contents
import Container from "@mui/material/Container";

// import functions
const socket = io();

const App = () => {
  const [navState, setNavState] = useState("home");
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (navState === "home") {
      setNavState(
        <Home
          socket={socket}
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
        {navState}

        {showNavbar === true && (
          <Navbar navState={navState} setNavState={setNavState} />
        )}
      </Container>
    </>
  );
};

export default App;
