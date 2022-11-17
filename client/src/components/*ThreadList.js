import * as React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import apiService from "../services/api.service";
const { getAllThread } = apiService;

const ThreadList = (props) => {
  const [allThread, setAllThread] = useState("");

  useEffect(() => {
    getAllThread().then((res) => {
      setAllThread(res);
    });
  });

  return <Box className="ThreadList"></Box>;
};

export default ThreadList;
