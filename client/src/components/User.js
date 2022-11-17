import * as React from "react";
import { useState, useEffect } from "react";

import Login from "./user/Login";
import Signup from "./user/Signup";

import Container from "@mui/material/Container";

const User = (props) => {
  const [loginView, setLoginView] = useState("login");

  return (
    <Container className="User">
        {loginView === "login" && (
          <Login setLoginView={setLoginView} />
        )}

        {loginView === "signup" && (
          <Signup setLoginView={setLoginView} />
        )}

        {/* {loginView === "profile" && (
          <Profile setLoginView={setLoginView} />
        )} */}
    </Container>
  );
};

export default User;
