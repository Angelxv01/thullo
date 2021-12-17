import React, { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import {
  Avatar,
  Button,
  Icon,
  TextArea,
  Text,
  Flow,
  Flex,
  Absolute,
} from "../common";
import { CARD, Data, MASTER } from "../../graphql/query";
import * as Gql from "../../gqlTypes";
import useTextArea from "../../hooks/useTextArea";
import useVisibility from "../../hooks/useVisiblity";
import InfoLabel from "../common/InfoLabel";
import InviteFriend from "../InviteFriend";
import User from "../User";
import CoverModal from "./CoverModal";
import LabelModal from "./LabelModal";

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
  const descriptionController = useTextArea(
    card?.description || "There's no description yet"
  );
  const commentController = useTextArea();

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
        <div className="header">
          <Flow>
            <Button.Squared onClick={setVisibility}>
              <Icon.Close />
            </Button.Squared>
            {card.coverId && (
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${card.coverId})`,
                  borderRadius: "12px",
                }}
              ></div>
              // <img
              //   src={`https://source.unsplash.com/${card.coverId}`}
              //   alt="cover"
              // />
            )}
            <Text>{card.title}</Text>
            <Text>
              in list
              <Text as="span"> {card.list.name}</Text>
            </Text>
          </Flow>
        </div>
        {/* Card Content */}
        <Flex>
          {/* Left hand side */}
          <div style={{ flex: 3 }}>
            <Flow>
              {/* Subheading */}
              <Flex>
                <InfoLabel text="Description">
                  <Icon.Description />
                </InfoLabel>
                <Button.Outline color="GRAY3" style={{ padding: "0.25em 1em" }}>
                  <Icon.Edit />
                  <Text>Edit</Text>
                </Button.Outline>
              </Flex>

              {/* Content */}
              <div className="content">
                {/* Description */}
                <TextArea
                  disabled
                  {...descriptionController}
                  style={{
                    color: `hsl(${theme.color.DARK})`,
                    fontSize: theme.font.size[400],
                  }}
                />
                {/* Attachment */}
                <Flex>
                  <InfoLabel text="Attachments">
                    <Icon.AttachFile />
                  </InfoLabel>
                  <Button.Outline
                    color="GRAY3"
                    style={{ padding: "0.25em 1em" }}
                  >
                    <Icon.Add />
                    <Text>Add</Text>
                  </Button.Outline>
                </Flex>
                {card.attachments.map((attachment) => (
                  <Attachment key={attachment.title} attachment={attachment} />
                ))}
              </div>
              {/* Comments */}
              <Flow
                style={{
                  textAlign: "right",
                  boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #E0E0E0",
                  padding: "1em",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "max-content auto",
                    alignItems: "start",
                    gap: "1em",
                  }}
                >
                  <Avatar
                    id={ctx.data?.authorizedUser.avatar}
                    username={ctx.data?.authorizedUser.username}
                  />
                  <TextArea
                    {...commentController}
                    placeholder="Write a comment..."
                  />
                </div>
                <Button.Colored style={{ padding: "0.5em 1em" }}>
                  Comment
                </Button.Colored>
              </Flow>
              <Flow className="commentList">
                {card.comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </Flow>
            </Flow>
          </div>

          {/* Right hand side */}
          <Flow style={{ flex: 1 }}>
            {/* Label */}
            <InfoLabel text="Actions">
              <Icon.AccountCircle />
            </InfoLabel>
            {/* Members */}
            <Button.Icon onClick={setShowMember}>
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
              <Button.Icon onClick={setShowLabel}>
                <Icon.Label />
                <Text>Labels</Text>
              </Button.Icon>
              {showLabel && <LabelModal labels={ctx.data.board.labels} />}
            </div>
            {/* Covers */}
            <div style={{ position: "relative" }}>
              <Button.Icon onClick={setShowCover}>
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

const Attachment = ({ attachment }: { attachment: Gql.Attachment }) => {
  const theme = useTheme();
  const date = new Date(attachment.createdAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "80px auto", gap: "1em" }}
    >
      {attachment.coverId ? (
        <div
          style={{
            backgroundSize: "cover",
            borderRadius: "8px",
            backgroundImage: `url(https://source.unsplash.com/${attachment.coverId})`,
          }}
        ></div>
      ) : (
        <div
          style={{
            display: "grid",
            alignContent: "center",
            textAlign: "center",
            backgroundColor: `hsl(${theme.color.GRAY5})`,
            color: `hsl(${theme.color.GRAY2})`,
            borderRadius: "8px",
          }}
        >
          {attachment.title
            .split(" ")
            .reduce((acc, word) => (acc += word[0]), "")
            .substring(0, 2)
            .toUpperCase()}
        </div>
      )}

      <Flow space="0.5em">
        <div>
          <Text fontSize={theme.font.size[100]} style={{ lineHeight: "12px" }}>
            added {date}
          </Text>
          <Text
            fontSize={theme.font.size[200]}
            lineHeight={theme.lineHeight[0]}
          >
            {attachment.title}
          </Text>
        </div>
        <Flex>
          <a href={attachment.url}>
            <Button.Outline color="GRAY3" style={{ padding: "0.25em 0.5em" }}>
              Download
            </Button.Outline>
          </a>
          <Button.Outline color="GRAY3" style={{ padding: "0.25em 0.5em" }}>
            Delete
          </Button.Outline>
        </Flex>
      </Flow>
    </div>
  );
};

const Comment = ({ comment }: { comment: Gql.Comment }) => {
  const commentDate = new Date(comment.createdAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Flow>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content auto max-content",
          alignItems: "center",
          gap: "1em",
        }}
      >
        {/* Header */}
        <Avatar id={comment.user.avatar} username={comment.user.username} />
        <Flow space="0.25em">
          <Text>{comment.user.username}</Text>
          <Text>{commentDate}</Text>
        </Flow>
        {/* Actions */}
        <Flex style={{ alignItems: "center" }} space="0.25em">
          <Text>Edit</Text>
          <Text>-</Text>
          <Text>Delete</Text>
        </Flex>
        {/* Content */}
      </div>
      <div>
        <Text>{comment.text}</Text>
      </div>
    </Flow>
  );
};

export default CardModal;
