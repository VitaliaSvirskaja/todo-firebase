import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const App = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
  </Routes>
);
