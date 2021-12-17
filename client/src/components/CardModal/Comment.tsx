import React from "react";
import * as Gql from "../../gqlTypes";
import { Avatar, Flex, Flow, Text } from "../common";

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

export default Comment;
