import React from "react";
import { Avatar, Flex, Text } from "../common";
import * as Gql from "../../gqlTypes";
import { useTheme } from "styled-components";

const User = ({
  user,
  selected,
  onClick,
}: {
  user: Gql.User;
  selected?: boolean;
  onClick?: () => void;
}) => {
  const theme = useTheme();

  const base = {
    alignItems: "center",
    padding: "0.5em",
    width: "100%",
    borderRadius: theme.border.radius[1],
  };
  const style = selected
    ? {
        ...base,
        backgroundColor: `hsl(${theme.color.BLUE1})`,
        color: `hsl(${theme.color.WHITE})`,
      }
    : base;
  return (
    <Flex space="0.75em" style={style} onClick={onClick}>
      <Avatar id={user.avatar} username={user.username} />
      <Text>{user.username}</Text>
    </Flex>
  );
};

export default User;
