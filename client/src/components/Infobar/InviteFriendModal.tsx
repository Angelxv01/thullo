import React from "react";
import { useTheme } from "styled-components";
import { Button, Icon } from "../common";
import * as Gql from "../../gqlTypes";
import Toggle from "../Toggle";
import InviteFriend from "../InviteFriend";
import { useMutation } from "@apollo/client";
import { InviteUserInput, INVITE_USER } from "../../graphql/mutation";
import { MASTER, FRIENDS_NOT_IN_BOARD } from "../../graphql/query";

const InviteFriendModal = ({ friends }: { friends: Gql.User[] }) => {
  const theme = useTheme();
  const ToggleStyle = {
    style: {
      marginTop: "1em",
      zIndex: theme.z.HEADER_POPUP,
      backgroundColor: `hsl(${theme.color.WHITE})`,
      minWidth: "23em",
      padding: "0.75em 1em",
      border: "1px solid #E0E0E0",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      borderRadius: theme.border.radius[2],
    },
  };

  const [inviteUser] = useMutation<{ inviteUser: Gql.Board }, InviteUserInput>(
    INVITE_USER,
    {
      refetchQueries: [
        { query: MASTER, variables: { id: "6182d8c9bba2b2dfab68119d" } },
        {
          query: FRIENDS_NOT_IN_BOARD,
          variables: { id: "6182d8c9bba2b2dfab68119d" },
        },
      ],
    }
  );

  const inviteUserHandler = (selected: string[]) => {
    inviteUser({
      variables: {
        data: {
          userId: selected,
          boardId: "6182d8c9bba2b2dfab68119d",
        },
      },
    });
  };

  return (
    <Toggle props={ToggleStyle}>
      {/* Button */}
      <Button.Squared>
        <Icon.Add />
      </Button.Squared>
      <InviteFriend friends={friends} action={inviteUserHandler} />
    </Toggle>
  );
};

export default InviteFriendModal;
