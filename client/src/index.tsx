import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import Theme from "./style/theme";
import client from "./utils/apolloClient";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </ThemeProvider>,
  document.querySelector("#root")
);
