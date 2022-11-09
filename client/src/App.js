import "./styles/App.css";
import * as React from "react";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import ThreadList from "./components/ThreadList";
import User from "./components/User";
import Footer from "./components/Footer";

import Container from "@mui/material/Container";

import apiService from "./services/api.service";
import userService from "./services/user.services";
const { helloWorld } = apiService;
const { getUserData } = userService;

const App = () => {
  const [get, setGet] = useState("");
  const [user, setUser] = useState("");
  const [headerView, setHeaderView] = useState(true);
  const [navState, setNavState] = useState("home");
  const [footerView, setFooterView] = useState(true);

  useEffect(() => {
    // helloWorld().then((res) => setGet(res));
    // getUserData(1).then((res) => setUser(res));
  });

  useEffect(() => {
    if (navState === "home") {
      setNavState(<Home />);
    } else if (navState === "thread_list") {
      setNavState(<ThreadList />);
    } else if (navState === "user") {
      setNavState(<User />);
    }
  });

  return (
    <>
      {headerView === true && <Header user={user} setUser={setUser} />}
      <Container className="app">{navState}</Container>
      {footerView === true && <Footer />}
    </>
  );
};

export default App;
