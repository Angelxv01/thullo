import React from "react";
import styled from "styled-components";
import Infobar from "../components/Infobar";
import Kanban from "../components/Kanban";
import Navigation from "../components/Navigation";

export const Container = styled.div`
  margin: 2em auto;
  width: 80vw;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  background-color: hsl(${({ theme }) => theme.color.WHITE});
`;

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
