import React from "react";
import styled from "styled-components";
import * as Gql from "../../gqlTypes";
import { formatDate } from "../../utils/formatting";
import { Avatar, Flex, Flow, Text } from "../common";

const StyledComment = styled.div`
  padding: 0.5em 0;
  display: grid;
  grid-template-columns: max-content auto max-content;
  align-items: center;
  gap: 1em;
`;

const Comment = ({
  comment,
  isAuthor,
}: {
  comment: Gql.Comment;
  isAuthor: boolean;
}) => {
  const commentDate = formatDate(comment.createdAt);

  return (
    <div>
      <StyledComment>
        {/* Header */}
        <Avatar id={comment.user.avatar} username={comment.user.username} />
        <Flow space="0.25em">
          <Text>{comment.user.username}</Text>
          <Text>{commentDate}</Text>
        </Flow>
        {/* Actions */}

        {isAuthor && (
          <Flex style={{ alignItems: "center" }} space="0.25em">
            <Text>Edit</Text>
            <Text>-</Text>
            <Text>Delete</Text>
          </Flex>
        )}
      </StyledComment>
      {/* Content */}
      <Text className="comment-text">{comment.text}</Text>
    </div>
  );
};

export default Comment;
