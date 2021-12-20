import React from "react";
import styled from "styled-components";
import useTextArea from "../../hooks/useTextArea";
import { Flow, Avatar, TextArea, Button } from "../common";
import Comment from "./Comment";
import * as Gql from "../../gqlTypes";

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
    border-top: 2px solid steelblue;
  }
`;

const CommentSection = ({
  me,
  comments,
}: {
  me: Gql.User;
  comments: Gql.Comment[];
}) => {
  const commentController = useTextArea();

  return (
    <Flow>
      <StyledCommentForm>
        <Avatar id={me.avatar} username={me.username} />
        <TextArea {...commentController} placeholder="Write a comment..." />
        <Button.Colored className="button-colored">Comment</Button.Colored>
      </StyledCommentForm>
      <StyledCommentFlow>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </StyledCommentFlow>
    </Flow>
  );
};

export default CommentSection;
