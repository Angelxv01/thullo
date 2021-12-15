import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import {
  Avatar,
  Button,
  Icon,
  TextArea,
  Label,
  Text,
  Flow,
  Flex,
  Absolute,
} from "../common";
import { CARD, Data, MASTER } from "../../graphql/query";
import * as Gql from "../../gqlTypes";
import useTextArea from "../../hooks/useTextArea";
import useVisibility from "../../hooks/useVisiblity";
import { Cover, Labels } from "../Card/Utils";
import InfoLabel from "../common/InfoLabel";
import InviteFriend from "../InviteFriend";
import User from "../User";

const CardModal = ({
  setVisibility,
  id,
}: {
  setVisibility: () => void;
  id: string;
}) => {
  const theme = useTheme();
  const data = useQuery<{ card: Gql.Card }, { id: string }>(CARD, {
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
  const commentController = useTextArea(card?.description);

  const [showMember, setShowMember] = useVisibility();
  const [showAddMember, setShowAddMember] = useVisibility();
  const [showLabel, setShowLabel] = useVisibility();
  const [showCover, setShowCover] = useVisibility();

  useEffect(() => {
    if (data.data) {
      setCard(data.data.card);
    }
  }, [data.data]);

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
                  backgroundImage:
                    "url(" +
                    `https://source.unsplash.com/${card.coverId}` +
                    ")",
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
                <Button.Icon>
                  <Icon.Edit />
                  <Text>Edit</Text>
                </Button.Icon>
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
                  <Button.Icon>
                    <Icon.Add />
                    <Text>Add</Text>
                  </Button.Icon>
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
              {showCover && <Cover />}
            </div>
          </Flow>
        </Flex>
      </div>
    </div>
  );
};

const Attachment = ({ attachment }: { attachment: Gql.Attachment }) => {
  const date = new Date(attachment.createdAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Flex>
      <div style={{ maxWidth: "15%" }}>
        {attachment.coverId ? (
          <img
            src={`https://source.unsplash.com/${attachment.coverId}`}
            alt=""
          />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <Text>added {date}</Text>
        <Text>{attachment.title}</Text>
        <div>
          <a href={attachment.url}>Download</a>
          <button>Delete</button>
        </div>
      </div>
    </Flex>
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

const LabelModal = ({ labels }: { labels: Gql.Label[] }) => {
  const theme = useTheme();
  return (
    <Flow
      style={{
        position: "absolute",
        backgroundColor: "white",
        padding: "1em",
        border: "1px solid #E0E0E0",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        zIndex: 7,
        borderRadius: "12px",
        marginTop: "1em",
      }}
    >
      {/* Header */}
      <div>
        <Text>Label</Text>
        <Text>Select a name and a color</Text>
      </div>

      {/* Labels */}

      <input type="text" style={{ width: "100%" }} />
      <div
        style={{
          display: "grid",
          grid: "repeat(3, 2.5rem) / repeat(4, 4rem)",
          gap: "0.5em",
        }}
      >
        {Object.keys(Gql.Color).map((color) => (
          <button
            key={color}
            style={{
              backgroundColor: `hsl(${theme.color[color]})`,
              outline: 0,
              border: 0,
              borderRadius: "4px",
            }}
          ></button>
        ))}
      </div>

      <Flow style={{ alignItems: "center" }} space="0.5em">
        <InfoLabel text="Available">
          <Icon.Label />
        </InfoLabel>
        <Labels>
          {labels.map((label) => (
            <Label color={label.color} key={label.id}>
              {label.text}
            </Label>
          ))}
        </Labels>
      </Flow>
    </Flow>
  );
};

export default CardModal;
