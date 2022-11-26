import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import authService from "../services/auth.service";

const Header = (props) => {
  const { username } = props;
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          welcome {username}
        </Typography>

        {username === "Guest" && (
          <Button
            color="inherit"
            onClick={() => {
              navigate("/user")
            }}
          >
            Log in
          </Button>
        )}
        {username !== "Guest" && (
          <Button
            color="inherit"
            onClick={() => {
              authService.logout();
              window.location.reload();
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
