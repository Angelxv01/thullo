import React, { FormEvent, useState } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import useInput from "../hooks/useInput";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutation";
import { saveState } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

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

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <div className="h-screen grid place-items-center">
      <div className="w-96 p-8 rounded-lg shadow-lg">
        <Logo />
        <p className="mt-4 text-lg font-semibold font-accent">
          Join thousands of learners from around the world
        </p>
        <p className="mt-2 text-tiny font-accent">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>
        <div
          className="bg-red/5 text-red p-2 rounded-lg text-tiny font-semibold border-2 border-red"
          hidden={!error}
        >
          Error: invalid credentials!
        </div>
        <form className="mt-2" onSubmit={loginHandler}>
          <div className="mt-2">
            <label htmlFor="username" className="block text-tiny  font-accent">
              Username
            </label>
            <input
              {...usernameController}
              id="username"
              className="border border-gray-400 w-full text-tiny py-2 rounded-lg mt-1"
              placeholder="Username"
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="block text-tiny  font-accent">
              Password
            </label>
            <input
              {...passwordController}
              id="password"
              className="border border-gray-400 w-full text-tiny py-2 rounded-lg mt-1"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-dark text-white w-full rounded-lg py-1 font-semibold mt-6"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
