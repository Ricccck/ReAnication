import * as React from "react";
import { useState } from "react";

import Login from "./user/Login";
import Signup from "./user/Signup";

import Container from "@mui/material/Container";

const User = (props) => {
  const { setIsLoggedIn } = props;

  const [loginView, setLoginView] = useState("login");

  return (
    <Container className="User">
      {loginView === "login" && (
        <Login setLoginView={setLoginView} setIsLoggedIn={setIsLoggedIn} />
      )}

      {loginView === "signup" && (
        <Signup setLoginView={setLoginView} setIsLoggedIn={setIsLoggedIn} />
      )}

      {/* {loginView === "profile" && (
          <Profile setLoginView={setLoginView} />
        )} */}
    </Container>
  );
};

export default User;
