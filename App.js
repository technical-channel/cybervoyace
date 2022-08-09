import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";

import Congratulations from "./Pages/Congratulations";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>

      <Route path="/success" />
    </Routes>
  );
}
