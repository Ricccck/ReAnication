import "./styles/App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import components
import Header from "./components/Header";
import User from "./components/User";
import Home from "./components/Home";
// import ThreadList from "./components/ThreadList";
import Navbar from "./components/Navbar";

//import mui contents
import Container from "@mui/material/Container";

import apiService from "./services/api.service";
import Thread from "./components/Thread";

const App = () => {
  const [username, setUsername] = useState("Guest");
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (isLoggedin) {
      apiService
        .getUserData()
        .then((res) => {
          console.log(res)
          setUsername(res.username);
        })
        .catch(() => {
          setUsername("Guest");
        });
    }
  }, [isLoggedin]);

  return (
    <>
      <BrowserRouter>
        <Container className="app">
          {showNavbar === true && <Header username={username} />}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home username={username} setShowNavbar={setShowNavbar} />
              }
            />
            <Route path="/threads" element={<p>threads</p>} />
            <Route path="/news" element={<p>news</p>} />
            <Route path="/annoucement" element={<p>threads</p>} />
            <Route
              path="/user"
              element={<User setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/thread"
              element={
                <Thread username={username} setShowNavbar={setShowNavbar} />
              }
            />
          </Routes>
          {showNavbar === true && <Navbar />}
        </Container>{" "}
      </BrowserRouter>
    </>
  );
};

export default App;
