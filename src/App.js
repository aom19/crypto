import React from "react";
import "./App.css";

import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

//Components
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main"></div>
      <div className="footers"></div>
    </div>
  );
}

export default App;
