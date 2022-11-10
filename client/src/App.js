import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

//import components
import Header from "./components/Header";
import Home from "./components/Home";
import ThreadList from "./components/ThreadList";
import Thread from "./components/thread/Thread";
import User from "./components/User";
import Footer from "./components/Footer";

//import mui contents
import Container from "@mui/material/Container";

// import functions
import apiService from "./services/api.service";
import userService from "./services/user.service";
import socketIoService from "./services/socket.service";


const App = () => {
  // const [headerView, setHeaderView] = useState(true);
  const [username, setUsername] = useState("");
  const [thread, setThread] = useState("");
  const { socket } = socketIoService;
  // const [footerView, setFooterView] = useState(true);

  return (
    <>
      <Router>
        {/* {headerView === true && <Header user={user} setUser={setUser} />} */}
        <Container className="app">
          <Routes>
            <Route
              path="/"
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
                <Thread
                  username={username}
                  thread={thread}
                  socket={socket}
                />
              }
            />
          </Routes>
        </Container>
        {/* {footerView === true && <Footer />} */}
      </Router>
    </>
  );
};

export default App;
