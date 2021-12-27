import React from "react";
import useVisibility from "../../hooks/useVisiblity";
import { Flow, Icon, Button, Absolute, Text } from "../common";
import InfoLabel from "../common/InfoLabel";
import InviteFriend from "../InviteFriend";
import User from "../User";
import CoverModal from "./CoverModal";
import LabelModal from "./LabelModal";
import * as Gql from "../../gqlTypes";
import { useQuery } from "@apollo/client";
import { Data, MASTER } from "../../graphql/query";
import styled from "styled-components";

const Aside = ({ card }: { card: Gql.Card }) => {
  const [showLabel, setShowLabel] = useVisibility();
  const [showCover, setShowCover] = useVisibility();

  const { data } = useQuery<Data, { id: string }>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
    fetchPolicy: "cache-only",
  });

  if (!data) return null;

  return (
    <Flow style={{ flex: 1 }}>
      {/* Label */}
      <InfoLabel text="Actions">
        <Icon.AccountCircle />
      </InfoLabel>
      {/* Members */}
      <Members card={card} />
      {/* Labels */}
      <div style={{ position: "relative" }}>
        <Button.Icon
          onClick={setShowLabel}
          style={{
            width: "100%",
          }}
        >
          <Icon.Label />
          <Text>Labels</Text>
        </Button.Icon>
        {showLabel && <LabelModal labels={data.board.labels} />}
      </div>
      {/* Covers */}
      <div style={{ position: "relative" }}>
        <Button.Icon
          onClick={setShowCover}
          style={{
            width: "100%",
          }}
        >
          <Icon.Image />
          <Text>Cover</Text>
        </Button.Icon>
        {showCover && <CoverModal />}
      </div>
    </Flow>
  );
};

const Members = ({ card }: { card: Gql.Card }) => {
  const [showMember, setShowMember] = useVisibility();
  const { data } = useQuery<Data, { id: string }>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
    fetchPolicy: "cache-only",
  });

  if (!data) return null;

  return (
    <>
      <Button.Icon
        onClick={setShowMember}
        style={{
          width: "100%",
        }}
      >
        <Icon.People />
        <Text>Members</Text>
      </Button.Icon>
      {showMember && <CardMemberList card={card} />}
    </>
  );
};

const StyledInviteMemberWrapper = styled(Absolute)`
  background-color: hsl(${({ theme }) => theme.color.WHITE});
  padding: 1em;
  width: 20rem;
  margin: 1em 0;
  border: 1px solid hsl(${({ theme }) => theme.color.GRAY5});
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.border.radius[2]};
  z-index: ${({ theme }) => theme.z.CARD_POPUP};
`;

const CardMemberList = ({ card }: { card: Gql.Card }) => {
  const [showAddMember, setShowAddMember] = useVisibility();
  const { data } = useQuery<Data, { id: string }>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
    fetchPolicy: "cache-only",
  });
  const memberIds = card.members.map((member) => member.id);
  const memberNotInCard = data?.board.members
    .filter((member) => memberIds.indexOf(member.user.id) === -1)
    .map((member) => member.user);
  return (
    <Flow>
      {[...card.members, card.author].map((member: Gql.User) => (
        <User user={member} key={member.id} />
      ))}
      <Button.IconColored onClick={setShowAddMember}>
        Assign a member
        <Icon.Add />
      </Button.IconColored>
      {showAddMember && (
        <StyledInviteMemberWrapper>
          <InviteFriend
            friends={memberNotInCard || []}
            action={() => console.log("hello")}
          />
        </StyledInviteMemberWrapper>
      )}
    </Flow>
  );
};

export default Aside;
