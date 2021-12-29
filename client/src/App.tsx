import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import { Data, MASTER, Var } from "./graphql/query";
import { loadState } from "./utils/localStorage";
import Board from "./pages/Board";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const navigate = useNavigate();
  const ctx = useQuery<Data, Var>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
  });

  useEffect(() => {
    const token = loadState("token");
    if (!token) navigate("login");
  }, []);

  if (!ctx) return null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/halo" element={<Board />} />
    </Routes>
  );
};

export default App;
