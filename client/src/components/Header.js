import "./styles/Header.css"
import * as React from "react";

import Box from "@mui/material/Box";

const Header = (props) => {
  const { user } = props;
  return (
    <Box className="Header">
      <h1>ReAnictaion</h1>
      {user.username}
    </Box>
  );
};

export default Header;
