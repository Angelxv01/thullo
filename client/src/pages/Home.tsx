import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import {
  Button,
  Flex,
  Grid,
  Flow,
  Icon,
  Text,
  Absolute,
  InputGroup,
} from "../components/common";
import Navigation from "../components/Navigation";
import { USER_BOARD } from "../graphql/query";
import { Container } from "./Board";
import * as Gql from "../gqlTypes";
import Board from "../components/Board";
import useVisibility from "../hooks/useVisiblity";
import { Cover, StyledHeader } from "../components/CardModal/Header";
import CoverModal from "../components/CardModal/CoverModal";
import useInput from "../hooks/useInput";
import VisibilityBadge from "../components/Infobar/Badge";
import { BoardInput, CREATE_BOARD } from "../graphql/mutation";
import useUser from "../hooks/useUser";

const Home = () => {
  const theme = useTheme();
  const { data } = useQuery<{ authorizedUser: Gql.User }>(USER_BOARD);
  const [visible, setVisibility] = useVisibility();

  return (
    <>
      <Container
        style={{
          pointerEvents: visible ? "none" : "initial",
        }}
      >
        <Navigation />
        <Flow
          style={{
            width: "calc(80% + 2em)",
            margin: "1em auto",
            padding: "2em",
            borderRadius: "12px",
            backgroundColor: `hsl(${theme.color.WHITE1})`,
            minHeight: "80vh",
            position: "relative",
          }}
        >
          <Flex
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text fontSize={theme.font.size[600]}>All Boards</Text>
            <Button.IconColored
              color="WHITE"
              style={{ backgroundColor: `hsl(${theme.color.BLUE1})` }}
              onClick={setVisibility}
            >
              <Icon.Add />
              Add
            </Button.IconColored>
          </Flex>
          <Grid
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              justifyItems: "center",
            }}
          >
            {data?.authorizedUser?.boards?.map((board) => (
              <Board key={board.id} board={board} />
            ))}
          </Grid>
        </Flow>
      </Container>
      {visible && <CreateBoardModal setVisibility={setVisibility} />}
    </>
  );
};

const StyledCreateBoardModal = styled(Absolute)`
  position: fixed;
  inset: 0;
  background-color: hsl(${({ theme }) => theme.color.DARK} / 0.1);

  & .container {
    background-color: hsl(${({ theme }) => theme.color.WHITE});
    width: 25%;
    margin: 10em auto;
    padding: 2em;
    border-radius: ${({ theme }) => theme.border.radius[1]};
  }
`;

const CreateBoardModal = ({ setVisibility }: { setVisibility: () => void }) => {
  const theme = useTheme();
  const [showCover, setShowCover] = useVisibility();
  const [cover, setCover] = useState<string>("");
  const titleController = useInput("text");
  const [boardVisibility, setBoardVisibility] = useState<Gql.Visibility>(
    Gql.Visibility.PUBLIC
  );
  const user = useUser();
  const [createBoard] = useMutation<{ createBoard: Gql.Board }, BoardInput>(
    CREATE_BOARD,
    {
      refetchQueries: [{ query: USER_BOARD }],
    }
  );

  const toggleVisibility = () => {
    if (boardVisibility === Gql.Visibility.PRIVATE)
      setBoardVisibility(Gql.Visibility.PUBLIC);
    else setBoardVisibility(Gql.Visibility.PRIVATE);
  };

  const handleCreateBoard = () => {
    createBoard({
      variables: {
        data: {
          visibility: boardVisibility,
          coverId: cover,
          members: user ? [user.id] : undefined,
          title: titleController.value,
        },
      },
    });
    setVisibility();
  };

  return (
    <StyledCreateBoardModal>
      <StyledHeader className="container" hasCover={Boolean(cover)}>
        <Button.Squared className="offset-button" onClick={setVisibility}>
          <Icon.Close />
        </Button.Squared>
        {cover && <Cover url={cover} />}

        <InputGroup
          width="100%"
          props={{
            ...titleController,
            placeholder: "Add board title",
          }}
          wrapper={{
            style: {
              border: "1px solid #E0E0E0",
            },
          }}
        />
        <Flex>
          <div style={{ position: "relative", flex: "1" }}>
            <Button.Icon onClick={setShowCover} style={{ width: "100%" }}>
              <Icon.Image />
              <Text>Cover</Text>
            </Button.Icon>
            {showCover && <CoverModal addCover={(url) => setCover(url)} />}
          </div>
          <div style={{ position: "relative", flex: "1" }}>
            <VisibilityBadge
              visibility={boardVisibility}
              onClick={toggleVisibility}
              style={{ width: "100%" }}
            />
          </div>
        </Flex>
        <Flex style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <Text onClick={setVisibility}>Cancel</Text>
          <Button.IconColored
            color="WHITE"
            style={{ backgroundColor: `hsl(${theme.color.BLUE1})` }}
            onClick={handleCreateBoard}
          >
            <Icon.Add style={{ fontSize: "1.5em" }} />
            <Text>Create</Text>
          </Button.IconColored>
        </Flex>
      </StyledHeader>
    </StyledCreateBoardModal>
  );
};

export default Home;
