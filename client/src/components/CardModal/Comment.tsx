import { useMutation } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import * as Gql from "../../gqlTypes";
import {
  DELETE_COMMENT,
  EditCommentInput,
  EDIT_COMMENT,
} from "../../graphql/mutation";
import useVisibility from "../../hooks/useVisiblity";
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
  const [edit, setEdit] = useVisibility();

  const [editComment] = useMutation<
    { editComment: Gql.Comment },
    EditCommentInput
  >(EDIT_COMMENT);
  const [deleteComment] = useMutation<Record<string, unknown>, { id: string }>(
    DELETE_COMMENT
  );

  const editCommentHandler = (e: ChangeEvent<HTMLParagraphElement>) => {
    editComment({
      variables: {
        data: {
          commentId: comment.id,
          text: e.target.outerText,
        },
      },
    });
    setEdit();
  };

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

        {isAuthor && !edit && (
          <Flex style={{ alignItems: "center" }} space="0.25em">
            <Text style={{ cursor: "pointer" }}>Edit</Text>
            <Text>-</Text>
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => deleteComment({ variables: { id: comment.id } })}
            >
              Delete
            </Text>
          </Flex>
        )}
      </StyledComment>
      {/* Content */}
      <Text
        className="comment-text"
        contentEditable
        suppressContentEditableWarning
        onBlur={editCommentHandler}
        onFocus={setEdit}
      >
        {comment.text}
      </Text>
    </div>
  );
};

export default Comment;
