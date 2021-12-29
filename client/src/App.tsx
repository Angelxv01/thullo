import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import { Data, MASTER, Var } from "./graphql/query";
import { LOGIN } from "./graphql/mutation";
import { saveState } from "./utils/localStorage";
import Board from "./pages/Board";
import Login from "./pages/Login";

const App = () => {
  const ctx = useQuery<Data, Var>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
  });
  const [login] = useMutation<
    { login: { value: string } },
    { data: { username: string; password: string } }
  >(LOGIN);

  const loginHandler = async () => {
    try {
      const { data, errors } = await login({
        variables: { data: { username: "Angel", password: "password" } },
      });
      if (!data || errors) return;
      saveState("token", data.login);
    } catch {
      return;
    }
  };

  useEffect(() => {
    loginHandler();
  }, []);

  if (!ctx) return null;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/halo" element={<Board />} />
    </Routes>
  );
};

export default App;
