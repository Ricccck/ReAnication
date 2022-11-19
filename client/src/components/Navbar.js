import * as React from "react";

import { BottomNavigation } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ForumIcon from "@mui/icons-material/Forum";
import ArticleIcon from "@mui/icons-material/Article";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Paper } from "@mui/material";

const Navbar = (props) => {
  const { navState, setNavState } = props;

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={navState}
        onChange={(e, value) => {
          setNavState(value);
        }}
      >
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Threads"
          value="thread"
          icon={<ForumIcon />}
        />
        <BottomNavigationAction
          label="News"
          value="news"
          icon={<ArticleIcon />}
        />
        <BottomNavigationAction
          label="Announcment"
          value="annoucement"
          icon={<AnnouncementIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navbar;
