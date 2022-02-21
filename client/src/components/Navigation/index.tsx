import React, { ChangeEvent } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Data, MASTER, Var } from "../../graphql/query";
import useInput from "../../hooks/useInput";
import { useTheme } from "styled-components";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { Avatar, Button, Flex, Icon, InputGroup, Text } from "../common";
import StyledNavigation from "./StyledNavigation";
import Separator from "./Separator";
import * as Gql from "../../gqlTypes";
import { BoardInput, CHANGE_TITLE } from "../../graphql/mutation";
import { useNavigate, useParams } from "react-router-dom";
import { removeState } from "../../utils/localStorage";
import useUser from "../../hooks/useUser";

const Navigation = () => {
  const { id } = useParams();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const ctx = id
    ? useQuery<Data, Var>(MASTER, {
        fetchPolicy: "cache-and-network",
        variables: { id },
      })
    : undefined;
  const logout = () => {
    removeState("token");
    apolloClient.resetStore();
    navigate("../login");
  };
  const user = useUser();
  const searchController = useInput("text");
  const theme = useTheme();
  const [changeTitle] = useMutation<{ createBoard: Gql.Board }, BoardInput>(
    CHANGE_TITLE,
    {
      refetchQueries: [{ query: MASTER, variables: { id } }],
    }
  );

  const handleTitleChange = (e: ChangeEvent<HTMLParagraphElement>) =>
    changeTitle({
      variables: {
        data: {
          title: e.target.outerText,
          id,
        },
      },
    });

  return (
    <StyledNavigation>
      <Logo className="navigation-logo" onClick={() => navigate("/")} />

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
            {ctx?.data?.board.title}
          </Text>
          <Separator />
          <Button.Icon onClick={() => navigate("/")}>
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
      {user && (
        <Flex space="0.25em" className="navigation-user">
          <Avatar id={user.avatar || ""} username={user.username || ""} />
          <Text
            fontFamily={theme.font.family.secondary}
            fontWeight="bold"
            lineHeight={theme.lineHeight[0]}
          >
            {user.username}
          </Text>
          <Icon.Logout style={{ fontSize: "1.5em" }} onClick={logout} />
        </Flex>
      )}
    </StyledNavigation>
  );
};

export default Navigation;
