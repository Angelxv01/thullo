import React from "react";
import useVisibility from "../../hooks/useVisiblity";
import { Flow, Icon, Button, Absolute, Text } from "../common";
import InfoLabel from "../common/InfoLabel";
import InviteFriend from "../InviteFriend";
import User from "../User";
import CoverModal from "./CoverModal";
import LabelModal from "./LabelModal";
import * as Gql from "../../gqlTypes";
import { useMutation, useQuery } from "@apollo/client";
import { CARD, Data, MASTER } from "../../graphql/query";
import styled from "styled-components";
import {
  AddMemberInput,
  ADD_MEMBER,
  CreateCardInput,
  CREATE_CARD,
} from "../../graphql/mutation";
import { useParams } from "react-router-dom";

const Aside = ({
  card,
  removeCardHandler,
}: {
  card: Gql.Card;
  removeCardHandler: (id: string) => void;
}) => {
  const { id } = useParams();
  if (!id) return null;

  const [showLabel, setShowLabel] = useVisibility();
  const [showCover, setShowCover] = useVisibility();

  const { data } = useQuery<Data, { id: string }>(MASTER, {
    variables: { id },
    fetchPolicy: "cache-only",
  });
  if (!data) return null;
  const labelIds = card.labels.map((label) => label.id);
  const availableLabels = data?.board.labels.filter(
    (label) => labelIds.indexOf(label.id) === -1
  );
  const [addCover] = useMutation<{ createCard: Gql.Card }, CreateCardInput>(
    CREATE_CARD,
    { refetchQueries: [{ query: CARD, variables: { id: card.id } }] }
  );

  const addCoverHandler = (photo: string) => {
    addCover({
      variables: {
        data: {
          id: card.id,
          listId: card.list.id,
          boardId: id,
          coverId: photo,
        },
      },
    });
  };

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
        {showLabel && (
          <LabelModal
            cardId={card.id}
            available={availableLabels}
            active={card.labels}
          />
        )}
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
        {showCover && <CoverModal addCover={addCoverHandler} />}
      </div>
      <Button.IconColored
        backgroundColor="RED"
        color="RED"
        onClick={() => removeCardHandler(card.id)}
      >
        Delete
        <Icon.Delete />
      </Button.IconColored>
    </Flow>
  );
};

const Members = ({ card }: { card: Gql.Card }) => {
  const { id } = useParams();
  if (!id) return null;
  const [showMember, setShowMember] = useVisibility();
  const { data } = useQuery<Data, { id: string }>(MASTER, {
    variables: { id },
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
  const { id } = useParams();
  if (!id) return null;
  const [showAddMember, setShowAddMember] = useVisibility();
  const [addMember] = useMutation<{ addMember: Gql.Card }, AddMemberInput>(
    ADD_MEMBER,
    {
      refetchQueries: [{ query: CARD, variables: { id: card.id } }],
    }
  );

  const addMemberHandler = (ids: string[]) => {
    addMember({ variables: { data: { cardId: card.id, members: ids } } });
    setShowAddMember();
  };
  return (
    <Flow>
      {card.members.map((member: Gql.User) => (
        <User user={member} key={member.id} />
      ))}
      <Button.IconColored onClick={setShowAddMember}>
        Assign a member
        <Icon.Add />
      </Button.IconColored>
      {showAddMember && (
        <StyledInviteMemberWrapper>
          <InviteFriend action={addMemberHandler} />
        </StyledInviteMemberWrapper>
      )}
    </Flow>
  );
};

export default Aside;
