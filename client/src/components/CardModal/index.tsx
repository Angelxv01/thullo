import React, { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Button, Icon, Text, Flow, Flex, Absolute } from "../common";
import { CARD, Data, MASTER } from "../../graphql/query";
import * as Gql from "../../gqlTypes";
import useVisibility from "../../hooks/useVisiblity";
import InfoLabel from "../common/InfoLabel";
import InviteFriend from "../InviteFriend";
import User from "../User";
import CoverModal from "./CoverModal";
import LabelModal from "./LabelModal";
import Header from "./Header";
import Main from "./Main";

const CardModal = ({
  setVisibility,
  id,
}: {
  setVisibility: () => void;
  id: string;
}) => {
  const theme = useTheme();
  const { data } = useQuery<{ card: Gql.Card }, { id: string }>(CARD, {
    variables: { id },
  });
  const ctx = useQuery<Data, { id: string }>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
    fetchPolicy: "cache-only",
  });

  const [card, setCard] = useState<Gql.Card | undefined>();

  const [showMember, setShowMember] = useVisibility();
  const [showAddMember, setShowAddMember] = useVisibility();
  const [showLabel, setShowLabel] = useVisibility();
  const [showCover, setShowCover] = useVisibility();

  useEffect(() => {
    if (data) {
      setCard(data.card);
    }
  }, [data]);

  if (!(card && ctx.data)) return <div>Loading</div>;

  return (
    <div
      style={{
        margin: "0",
        backgroundColor: `hsl(${theme.color.DARK} / 0.1)`,
        position: "fixed",
        inset: "0",
        zIndex: theme.z.CARD,
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          backgroundColor: "white",
          margin: "1em auto",
          width: "50%",
          padding: "2em 1.75em",
        }}
      >
        {/* Header */}
        <Header
          setVisibility={setVisibility}
          coverId={card.coverId}
          title={card.title}
          listName={card.list.name}
        />
        {/* Card Content */}
        <Flex>
          {/* Left hand side */}
          <Main card={card} />
          {/* Right hand side */}
          <Flow style={{ flex: 1 }}>
            {/* Label */}
            <InfoLabel text="Actions">
              <Icon.AccountCircle />
            </InfoLabel>
            {/* Members */}
            <Button.Icon
              onClick={setShowMember}
              style={{
                width: "100%",
              }}
            >
              <Icon.People />
              <Text>Members</Text>
            </Button.Icon>
            {showMember && (
              <Flow style={{ position: "relative" }}>
                {card.members.map((member) => (
                  <Flex key={member.id} className="flex">
                    <User user={member} />
                  </Flex>
                ))}
                <Button.IconColored onClick={setShowAddMember}>
                  Assign a member
                  <Icon.Add />
                </Button.IconColored>
                {showAddMember && (
                  <Absolute
                    style={{
                      backgroundColor: "white",
                      padding: "1em",
                      width: "23em",
                      margin: "1em 0",
                      border: "1px solid #E0E0E0",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                      borderRadius: "12px",
                      zIndex: 5,
                    }}
                  >
                    <InviteFriend
                      friends={ctx.data.board.members.map(
                        (member) => member.user
                      )}
                    />
                  </Absolute>
                )}
              </Flow>
            )}
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
              {showLabel && <LabelModal labels={ctx.data.board.labels} />}
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
        </Flex>
      </div>
    </div>
  );
};

export default CardModal;
