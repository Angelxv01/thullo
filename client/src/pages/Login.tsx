import React from "react";
import styled, { useTheme } from "styled-components";
import { Button, Text, Flow } from "../components/common";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import useInput from "../hooks/useInput";

export const LoginContainer = styled(Flow)`
  margin: 10em auto;
  width: min(25em, 30vw);
  aspect-ratio: 4/5;
  padding: 3em 0;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  background-color: hsl(${({ theme }) => theme.color.WHITE});
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: ${({ theme }) => theme.font.size[400]};
`;

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
  const usernameController = useInput("text");
  const passwordController = useInput("password");
  const theme = useTheme();
  return (
    <LoginContainer space="2em">
      <Logo />
      <Flow className="header" style={{ textAlign: "center", width: "80%" }}>
        <Text
          fontSize={theme.font.size[500]}
          fontFamily={theme.font.family.secondary}
        >
          Join thousands of learners from around the world{" "}
        </Text>
        <Text fontWeight="bold">Login to create your first project!</Text>
      </Flow>
      <Grid>
        <Text>Username</Text>
        <input {...usernameController} placeholder="Username" />
        <Text>Password</Text>
        <input {...passwordController} placeholder="Password" />
      </Grid>
      <Button.Colored
        style={{ padding: "0.5em 1em", fontSize: theme.font.size[400] }}
      >
        Login
      </Button.Colored>
    </LoginContainer>
  );
};

export default Login;
