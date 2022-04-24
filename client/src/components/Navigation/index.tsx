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
    <div className="grid shadow-lg py-4 px-8 gap-12 items-center grid-cols-12">
      <Logo className="cursor-pointer" onClick={() => navigate("/")} />
      {id && (
        <div className="flex items-center gap-6 col-span-3">
          <h1
            className="text-lg focus:outline-none"
            onBlur={handleTitleChange}
            contentEditable
            suppressContentEditableWarning
          >
            {ctx?.data?.board.title}
          </h1>
          <hr className="w-px h-8 bg-gray-300" />
          <button className="text-sm border-2 border-blue-dark py-1 px-3 rounded-lg inline-flex items-center gap-2 text-gray-900">
            <Icon.Apps />
            All Boards
          </button>
        </div>
      )}
      <div className="w-96 rounded-lg p-1 text-sm shadow inline-flex justify-self-end col-span-3 col-start-8">
        <input
          {...searchController}
          placeholder="Keyword"
          className="flex-1 border-0 focus:ring-blue-dark focus:ring-1 rounded-lg px-3 py-1"
        />
        <button className="border-2 border-blue-dark px-4 py-1 rounded-lg text-gray-900 font-semibold ml-1 h-full">
          Search
        </button>
      </div>
      {user && (
        <div className="flex items-center col-span-2 justify-self-end">
          <Avatar id={user.avatar} username={user.username || ""} />
          <p className="font-accent font-semibold text-sm ml-2">
            {user.username}
          </p>
          <Icon.Logout
            onClick={logout}
            className="!text-xl material-icons ml-4 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

// {/* <StyledNavigation>
// <Logo className="navigation-logo" onClick={() => navigate("/")} />

// {/* Board Name + Back to boards */}
// {id && (
//   <Flex space="1em" className="navigation-info">
//     <Text
//       style={{ outline: 0 }}
//       fontSize={theme.font.size[600]}
//       lineHeight={theme.lineHeight[3]}
//       contentEditable
//       suppressContentEditableWarning
//       onBlur={handleTitleChange}
//     >
//       {ctx?.data?.board.title}
//     </Text>
//     <Separator />
//     <Button.Icon onClick={() => navigate("/")}>
//       <Icon.Apps />
//       <Text>All boards</Text>
//     </Button.Icon>
//   </Flex>
// )}
// {/* Search bar */}
// <InputGroup
//   props={{
//     ...searchController,
//     placeholder: "Keyword...",
//   }}
//   wrapper={{
//     className: "navigation-input",
//     style: {
//       justifySelf: "end",
//       gridColumn: "3",
//     },
//   }}
//   width="30em"
// >
//   <Button.Colored style={{ padding: "0.75em 1.5em" }}>
//     Search
//   </Button.Colored>
// </InputGroup>
// {/* User */}
// {user && (
//   <Flex space="0.25em" className="navigation-user">
//     <Avatar id={user.avatar || ""} username={user.username || ""} />
//     <Text
//       fontFamily={theme.font.family.secondary}
//       fontWeight="bold"
//       lineHeight={theme.lineHeight[0]}
//     >
//       {user.username}
//     </Text>
//     <Icon.Logout style={{ fontSize: "1.5em" }} onClick={logout} />
//   </Flex>
// )}
// </StyledNavigation> */}
export default Navigation;
