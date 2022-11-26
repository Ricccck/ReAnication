import * as React from "react";
import { Link } from "react-router-dom";

import { BottomNavigation } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ForumIcon from "@mui/icons-material/Forum";
import ArticleIcon from "@mui/icons-material/Article";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Paper } from "@mui/material";

const Navbar = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/threads"
          label="Threads"
          icon={<ForumIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/news"
          label="News"
          icon={<ArticleIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/annoucement"
          label="Announcment"
          icon={<AnnouncementIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navbar;
