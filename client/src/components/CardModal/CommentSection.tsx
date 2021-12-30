import React from "react";
import styled from "styled-components";
import useTextArea from "../../hooks/useTextArea";
import { Flow, Avatar, TextArea, Button } from "../common";
import Comment from "./Comment";
import * as Gql from "../../gqlTypes";
import { useMutation, useQuery } from "@apollo/client";
import { CARD, Data, MASTER } from "../../graphql/query";
import { CREATE_COMMENT, CommentInput } from "../../graphql/mutation";
import { useParams } from "react-router-dom";

const StyledCommentForm = styled.div`
  display: grid;
  grid-template:
    [row1-start] "a b" max-content [row1-end]
    [row2-start] ". c" [row2-end] / max-content auto;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid hsl(${({ theme }) => theme.color.GRAY5});
  padding: 1em;
  border-radius: 12px;
  column-gap: 1em;

  & > .button-colored {
    padding: 0.5em 1em;
    grid-area: c;
    justify-self: end;
  }
`;

const StyledCommentFlow = styled(Flow)`
  & > *:where(:not(:first-child)) {
    border-top: 1px solid #f2f2f2;
  }
`;

const CommentSection = ({
  comments,
  cardId,
  cardAuthor,
}: {
  comments: Gql.Comment[];
  cardId: string;
  cardAuthor: string;
}) => {
  const { id } = useParams();
  if (!id) return null;
  const commentController = useTextArea();
  const { data } = useQuery<Data, { id: string }>(MASTER, {
    variables: { id },
    fetchPolicy: "cache-only",
  });
  const [createComment] = useMutation<
    { createComment: Gql.Comment },
    CommentInput
  >(CREATE_COMMENT, {
    refetchQueries: [{ query: CARD, variables: { id: cardId } }],
  });

  const createCommentHandler = () => {
    createComment({
      variables: { data: { text: commentController.value, cardId } },
    });
    commentController.setValue("");
  };

  if (!data) return null;
  const isAuthor = data.authorizedUser.id === cardAuthor;

  return (
    <Flow>
      <StyledCommentForm>
        <Avatar
          id={data.authorizedUser.avatar}
          username={data.authorizedUser.username}
        />
        <TextArea {...commentController} placeholder="Write a comment..." />
        <Button.Colored
          className="button-colored"
          onClick={createCommentHandler}
        >
          Comment
        </Button.Colored>
      </StyledCommentForm>
      <StyledCommentFlow>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} isAuthor={isAuthor} />
        ))}
      </StyledCommentFlow>
    </Flow>
  );
};

export default CommentSection;
