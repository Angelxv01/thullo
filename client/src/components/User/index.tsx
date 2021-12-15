import React from "react";
import { Avatar, Flex, Text } from "../common";
import { Gql } from "../../../../types";

const User = ({ user }: { user: Gql.User }) => {
  return (
    <Flex space="0.75em" style={{ alignItems: "center" }}>
      <Avatar id={user.avatar} username={user.username} />
      <Text>{user.username}</Text>
    </Flex>
  );
};

export default User;
