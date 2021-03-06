import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { loadState } from "./utils/localStorage";
import Board from "./pages/Board";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = loadState("token");
    if (!token) navigate("login");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path=":id" element={<Board />} />
    </Routes>
  );
};

export default App;
