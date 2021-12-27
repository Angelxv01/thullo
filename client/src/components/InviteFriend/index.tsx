import React, { useState } from "react";
import { useTheme } from "styled-components";
import { InputGroup, Flow, Text, Button, Icon, Flex } from "../common";
import User from "../User";
import StyledFriendFlow from "./StyledFriendFlow";
import * as Gql from "../../gqlTypes";

const InviteFriend = ({
  friends,
  action,
}: {
  friends: Gql.User[];
  action: (ids: string[]) => void;
}) => {
  const theme = useTheme();

  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectUser = (id: string) =>
    setSelected(
      selected.indexOf(id) > -1
        ? selected.filter((obj) => obj !== id)
        : [...selected, id]
    );

  const clickHandler = () => {
    action(selected);
  };

  return (
    <Flow space="1em" style={{ minWidth: "20em" }}>
      <Flow space="1px">
        <Text color="GRAY2">Invite to Board</Text>
        <Text color="GRAY3" fontFamily={theme.font.family.secondary}>
          Search users you want to invite to
        </Text>
      </Flow>
      <InputGroup props={{ placeholder: "User..." }} width="100%">
        <Button.Squared>
          <Icon.Search />
        </Button.Squared>
      </InputGroup>
      <StyledFriendFlow>
        {friends.length === 0 && <Text>All your friends are here!</Text>}
        {friends.map((friend) => (
          <Flex key={friend.id}>
            <User
              user={friend}
              selected={selected.indexOf(friend.id) > -1}
              onClick={() => handleSelectUser(friend.id)}
            />
          </Flex>
        ))}
      </StyledFriendFlow>
      <Flow style={{ textAlign: "center", marginTop: "2em" }}>
        <Button.Colored
          style={{ padding: "0.75em 1em" }}
          onClick={clickHandler}
        >
          Invite
        </Button.Colored>
      </Flow>
    </Flow>
  );
};

export default InviteFriend;
