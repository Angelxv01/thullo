import React from "react";
import Navigation from "./components/Navigation";
import { Button, Container } from "./components/common";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Data, FILE, MASTER, Var } from "./graphql/query";
import Infobar from "./components/Infobar";
// import {useTheme} from 'styled-components';
import Kanban from "./components/Kanban";
import { Icon } from "./components/common";
const App = () => {
  const ctx = useQuery<Data, Var>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
  });

  if (!ctx) return null;

  const [download] = useLazyQuery(FILE);

  return (
    <Container>
      <Button.Squared onClick={() => download()}>
        <Icon.Add />
      </Button.Squared>
      <Navigation />
      <Infobar />
      <Kanban />
    </Container>
  );
};

export default App;
