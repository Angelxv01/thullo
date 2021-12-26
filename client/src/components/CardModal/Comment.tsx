import React from "react";
import styled from "styled-components";
import * as Gql from "../../gqlTypes";
import { formatDate } from "../../utils/formatting";
import { Avatar, Flex, Flow, Text } from "../common";

const StyledComment = styled.div`
  padding: 0.5em 0;
  display: grid;
  grid-template-columns: max-content auto max-content;
  grid-template-areas:
    "header header header"
    "comment comment comment";
  align-items: center;
  gap: 1em;

  .comment-text {
    grid-area: comment;
  }
`;

const Comment = ({ comment }: { comment: Gql.Comment }) => {
  const commentDate = formatDate(comment.createdAt);

  return (
    <StyledComment>
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
      <Text className="comment-text">{comment.text}</Text>
    </StyledComment>
  );
};

export default Comment;
