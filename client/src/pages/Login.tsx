import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Button, Text, Flow } from "../components/common";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import useInput from "../hooks/useInput";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutation";
import { saveState } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { Container } from "../style/Utils";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 1em;
  align-items: center;

  & input {
    outline: 0;
    border: 0;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const usernameController = useInput("text");
  const passwordController = useInput("password");
  const [error, setError] = useState(false);
  let id: NodeJS.Timeout;

  const showError = () => {
    clearTimeout(id);
    setError(true);
    id = setTimeout(() => setError(false), 3000);
  };

  const [login] = useMutation<
    { login: { value: string } },
    { data: { username: string; password: string } }
  >(LOGIN);

  const loginHandler = async () => {
    try {
      const { data, errors } = await login({
        variables: {
          data: {
            username: usernameController.value,
            password: passwordController.value,
          },
        },
      });
      if (!data || errors) return showError();
      saveState("token", data.login);
    } catch {
      return showError();
    }

    return navigate("/");
  };

  const theme = useTheme();
  return (
    <div className="h-screen grid place-items-center">
      <div className="w-96 p-8 border-gray-400 border rounded-lg ">
        <Logo />
        <p className="mt-4 text-lg font-semibold font-accent">
          Join thousands of learners from around the world
        </p>
        <p className="mt-2 font-accent">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>
        <div className="bg-red-200 text-red-700" hidden={!error}>
          Error: invalid credentials!
        </div>
        <form className="space-y-3 mt-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium font-accent"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border border-gray-400 w-full text-sm py-2 rounded-lg mt-1"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium font-accent"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-400 w-full text-sm py-2 rounded-lg mt-1"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-dark text-white w-full rounded-lg py-1 font-semibold"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

{
  /* <Container className="h-full flex justify-center items-center">
  <div className="w-96 space-y-8">
        <Logo />
        <Flow className="header" style={{ textAlign: "center", width: "80%" }}>
          <Text
            fontSize={theme.font.size[500]}
            fontFamily={theme.font.family.secondary}
          >
            Join thousands of learners from around the world
          </Text>
          <Text fontWeight="bold">Login to create your first project!</Text>
          {error && (
            <Button.Colored
              backgroundColor="RED"
              style={{
                width: "100%",
                padding: "0.5em",
              }}
            >
              Invalid credentials
            </Button.Colored>
          )}
        </Flow>
        <Grid>
          <Text>Username</Text>
          <input {...usernameController} placeholder="Username" />
          <Text>Password</Text>
          <input {...passwordController} placeholder="Password" />
        </Grid>
        <Button.Colored
          style={{ padding: "0.5em 1em", fontSize: theme.font.size[400] }}
          onClick={loginHandler}
        >
          Login
        </Button.Colored>
      </div>
    </Container> */
}

export default Login;
