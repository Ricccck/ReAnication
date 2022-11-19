import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import authService from "../services/auth.service";

const Header = (props) => {
  const { username, setNavState } = props;

  const returnUsername = () => {
    if (username) {
      return username;
    }
    return "Guest";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          welcome {returnUsername()}
        </Typography>

        {username === undefined || username === "Guest" && (
          <Button
            color="inherit"
            onClick={() => {
              setNavState("user");
            }}
          >
            Log in
          </Button>
        )}
        {username === true || username !== "Guest"&& (
          <Button
            color="inherit"
            onClick={() => {
              authService.logout()
              setNavState("home");
            }}
          >
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
