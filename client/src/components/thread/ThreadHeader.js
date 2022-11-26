import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import socket from "../../services/socket";

const ThreadHeader = (props) => {
  const { username, thread, setShowNavbar } = props;
  const navigate = useNavigate();

  const [userList, setUserList] = useState("");
  const [threadUsers, setThreadUsers] = useState([]);

  useEffect(() => {
    socket.on("thread_users", (data) => {
      setThreadUsers(data);
    });

    return () => socket.off("thread_users");
  }, [socket]);

  const leaveRoom = () => {
    socket.emit("leave_thread", { username, thread });

    setShowNavbar(true);
    navigate("/");
  };

  return (
    <AppBar className="ThreadHeader" position="sticky">
      <Toolbar>
        <Button className="btn" color={"inherit"} onClick={leaveRoom}>
          Leave
        </Button>
        <Typography
          className="thread-title"
          textAlign="center"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {thread}
        </Typography>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="All Users">
            <IconButton
              onClick={(e) => setUserList(e.currentTarget)}
              sx={{ p: 0 }}
            >
              {threadUsers.length > 0 && <h5 className="usersTitle">Users:</h5>}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={userList}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(userList)}
            onClose={() => {
              setUserList("");
            }}
          >
            {threadUsers.map((user) => (
              <MenuItem
                style={{
                  fontWeight: `${
                    user.username === username ? "bold" : "normal"
                  }`,
                }}
                key={user.id}
              >
                <Typography textAlign="center">{user.username}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ThreadHeader;
