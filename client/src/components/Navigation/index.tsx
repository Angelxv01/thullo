import React, { ChangeEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Data, MASTER, Var } from "../../graphql/query";
import useInput from "../../hooks/useInput";
import { useTheme } from "styled-components";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { Avatar, Button, Flex, Icon, InputGroup, Text } from "../common";
import StyledNavigation from "./StyledNavigation";
import Separator from "./Separator";
import * as Gql from "../../gqlTypes";
import { BoardInput, CHANGE_TITLE } from "../../graphql/mutation";
import { useParams } from "react-router-dom";

const Navigation = () => {
  const { id } = useParams();
  const { data: ctx } = useQuery<Data, Var>(MASTER, {
    fetchPolicy: "cache-only",
    variables: { id: "6182d8c9bba2b2dfab68119d" },
  });
  const searchController = useInput("text");
  const theme = useTheme();
  const [changeTitle] = useMutation<{ createBoard: Gql.Board }, BoardInput>(
    CHANGE_TITLE,
    {
      refetchQueries: [
        { query: MASTER, variables: { id: "6182d8c9bba2b2dfab68119d" } },
      ],
    }
  );

  const handleTitleChange = (e: ChangeEvent<HTMLParagraphElement>) =>
    changeTitle({
      variables: {
        data: {
          title: e.target.outerText,
          id: "6182d8c9bba2b2dfab68119d",
        },
      },
    });

  return (
    <StyledNavigation>
      <Logo className="navigation-logo" />

      {/* Board Name + Back to boards */}
      {id && (
        <Flex space="1em" className="navigation-info">
          <Text
            style={{ outline: 0 }}
            fontSize={theme.font.size[600]}
            lineHeight={theme.lineHeight[3]}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleTitleChange}
          >
            {ctx?.board.title}
          </Text>
          <Separator />
          <Button.Icon>
            <Icon.Apps />
            <Text>All boards</Text>
          </Button.Icon>
        </Flex>
      )}

      {/* Search bar */}
      <InputGroup
        props={{
          ...searchController,
          placeholder: "Keyword...",
        }}
        wrapper={{
          className: "navigation-input",
          style: {
            justifySelf: "end",
            gridColumn: "3",
          },
        }}
        width="30em"
      >
        <Button.Colored style={{ padding: "0.75em 1.5em" }}>
          Search
        </Button.Colored>
      </InputGroup>

      {/* User */}
      <Flex space="0.25em" className="navigation-user">
        <Avatar
          id={ctx?.authorizedUser.avatar || ""}
          username={ctx?.authorizedUser.username || ""}
        />
        <Text
          fontFamily={theme.font.family.secondary}
          fontWeight="bold"
          lineHeight={theme.lineHeight[0]}
        >
          {ctx?.authorizedUser.username}
        </Text>
        <Icon.Logout style={{ fontSize: "1.5em" }} />
      </Flex>
    </StyledNavigation>
  );
};

export default Navigation;
