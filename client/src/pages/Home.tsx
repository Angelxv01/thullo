import { useQuery } from "@apollo/client";
import React from "react";
import { useTheme } from "styled-components";
import { Button, Flex, Flow, Icon, Text } from "../components/common";
import Navigation from "../components/Navigation";
import { ALL_BOARDS } from "../graphql/query";
import { Container } from "./Board";
import * as Gql from "../gqlTypes";
import { Cover } from "../components/Card/Utils";
import Avatars from "../components/Avatars";

const Home = () => {
  const theme = useTheme();
  const { data } = useQuery<{ allBoards: Gql.Board[] }>(ALL_BOARDS);

  return (
    <Container>
      <Navigation />
      <Flow
        style={{
          width: "calc(80% + 2em)",
          margin: "1em auto",
          padding: "2em",
          borderRadius: "12px",
          backgroundColor: `hsl(${theme.color.WHITE1})`,
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
          >
            <Icon.Add />
            Add
          </Button.IconColored>
        </Flex>
        <Flex>
          {data?.allBoards.map((board) => (
            <Flex
              key={board.id}
              style={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                borderRadius: "12px",
                border: "1px #ededed solid",
                width: "20em",
                padding: "1em",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              {board.coverId && <Cover src={board.coverId} />}
              <Text
                fontSize={theme.font.size[500]}
                fontFamily={theme.font.family.secondary}
              >
                {board.title}
              </Text>
              {board.members.length < 4 ? (
                <Avatars members={board.members.map((member) => member.user)} />
              ) : (
                <Avatars
                  members={board.members
                    .slice(0, 3)
                    .map((member) => member.user)}
                >
                  <Text color="GRAY4" fontFamily={theme.font.family.secondary}>
                    + {board.members.length - 3} others
                  </Text>
                </Avatars>
              )}
            </Flex>
          ))}
        </Flex>
      </Flow>
    </Container>
  );
};

export default Home;
