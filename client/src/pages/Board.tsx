import React from "react";
import Infobar from "../components/Infobar";
import Kanban from "../components/Kanban";
import Navigation from "../components/Navigation";
import { Container } from "../style/Utils";

const Board = () => {
  return (
    <Container>
      <Navigation />
      <Infobar />
      <Kanban />
    </Container>
  );
};

export default Board;
