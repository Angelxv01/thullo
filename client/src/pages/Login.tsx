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
    <div className="h-full">
      <div className="w-96 mx-auto">
        <Logo />
        <p>Join thousands of learners from around the world</p>
        <p>Login to create your first project!</p>
        <div className="bg-red-200 text-red-700" hidden={!error}>
          Error: invalid credentials!
        </div>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              id="username"
              className=""
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              id="password"
              className=""
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
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
