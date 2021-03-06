import React from "react";
import { useQuery } from "@apollo/client";
import { Data, MASTER, Var } from "../../graphql/query";
import { Button, Flex, Icon, Relative, Text } from "../common";

import Avatars from "../Avatars";
import StyledInfobar from "./StyledInfobar";
import * as Gql from "../../gqlTypes";
import Menu from "../Menu";
import useVisibility from "../../hooks/useVisiblity";
import InviteFriendModal from "./InviteFriendModal";
import VisibilityModal from "./VisibilityModal";
import { useParams } from "react-router-dom";

const Infobar = () => {
  const { id } = useParams();
  if (!id) return null;
  const ctx = useQuery<Data, Var>(MASTER, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  const [visibility, setVisibility] = useVisibility();

  if (!ctx.data) return null;

  return (
    <Relative>
      <StyledInfobar>
        {/* Left hand side */}
        <Flex>
          <VisibilityModal visibility={ctx.data.board.visibility} />
          <Avatars
            members={ctx.data.board.members.map(
              ({ user }: { user: Gql.User }) => user
            )}
          >
            {/* Append this at the end of the 'mapping' */}
            <InviteFriendModal />
          </Avatars>
        </Flex>
        {/* Right hand side */}
        <Button.Icon onClick={setVisibility}>
          <Icon.MoreHoriz />
          <Text>Show Menu</Text>
        </Button.Icon>
      </StyledInfobar>
      {visibility && <Menu toggle={setVisibility} />}
    </Relative>
  );
};

export default Infobar;
