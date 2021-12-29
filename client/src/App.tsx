import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Button, Container, LoginContainer, Text } from "./components/common";
import { Data, MASTER, Var } from "./graphql/query";
import Infobar from "./components/Infobar";
import Kanban from "./components/Kanban";
import { ReactComponent as Logo } from "./assets/Logo.svg";
import useInput from "./hooks/useInput";
import { saveState } from "./utils/localStorage";
import { LOGIN } from "./graphql/mutation";

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
      <Route
        path="/halo"
        element={
          <Container>
            <Navigation />
            <Infobar />
            <Kanban />
          </Container>
        }
      />
    </Routes>
  );
};

const Login = () => {
  const usernameController = useInput("text");
  const passwordController = useInput("password");
  return (
    <LoginContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="header" style={{ textAlign: "center" }}>
          <Logo />
          <Text>Join thousands of learners from around the world </Text>
          <Text>Login to create your first project!</Text>
        </div>
        <div className="form">
          <div>
            <Text>Username</Text>
            <input {...usernameController} placeholder="Username" />
          </div>
          <div>
            <Text>Username</Text>
            <input {...passwordController} placeholder="Password" />
          </div>

          <Button.Colored style={{ padding: "0.5em 1em" }}>
            Login
          </Button.Colored>
        </div>
      </div>
    </LoginContainer>
  );
};

export default App;
