import React from "react";
import Navigation from "./components/Navigation";
import { Container } from "./components/common";
import { useQuery } from "@apollo/client";
import { Data, MASTER, Var } from "./graphql/query";
import Infobar from "./components/Infobar";
// import {useTheme} from 'styled-components';
import Kanban from "./components/Kanban";
const App = () => {
  const ctx = useQuery<Data, Var>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
  });

  if (!ctx) return null;

  return (
    <Container>
      <Navigation />
      <Infobar />
      <Kanban />
    </Container>
  );
};

export default App;
