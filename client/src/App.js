import "./styles/App.css";
import React, { useState, useEffect } from "react";

import apiService from "./services/api.service";
const { helloWorld } = apiService;

const App = () => {
  const [get, setGet] = useState("");

  useEffect(() => {
    helloWorld().then((res) => setGet(res));
  });

  return (
    <div className="app-div">
      <p>Hello World</p>
      <p>{get}</p>
    </div>
  );
};

export default App;
