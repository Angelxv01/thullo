import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import Avatars from "../Avatars";
import { Cover } from "../Card/Utils";
import { Flex, Text } from "../common";
import * as Gql from "../../gqlTypes";

const StyledBoard = styled(Flex)`
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  border: 1px #ededed solid;
  width: 17em;
  padding: 1em;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
`;

const Board = ({ board }: { board: Gql.Board }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <StyledBoard onClick={() => navigate(`./${board.id}`)}>
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
          <>
            <Avatars
              members={board.members.slice(0, 3).map((member) => member.user)}
            ></Avatars>
            <Text color="GRAY4" fontFamily={theme.font.family.secondary}>
              + {board.members.length - 3} others
            </Text>
          </>
        )}
      </StyledBoard>
    </>
  );
};

export default Board;
