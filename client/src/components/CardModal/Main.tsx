import React from "react";
import useTextArea from "../../hooks/useTextArea";
import theme from "../../style/theme";
import { Flow, Flex, Icon, Button, TextArea, Avatar, Text } from "../common";
import InfoLabel from "../common/InfoLabel";
import Attachment from "./Attachment";
import Comment from "./Comment";
import * as Gql from "../../gqlTypes";
import useVisibility from "../../hooks/useVisiblity";
import styled from "styled-components";

const Main = ({ card, me }: { card: Gql.Card; me: Gql.User }) => {
  return (
    <Flow space="2em" style={{ flex: "3" }}>
      <DescriptionSection description={card.description} />
      <AttachmentSection attachments={card.attachments} />
      <CommentSection comments={card.comments} me={me} />
    </Flow>
  );
};

const DescriptionSection = ({ description }: { description: string }) => {
  const descriptionValue = description || "There's no description yet";
  const descriptionController = useTextArea(
    description || "There's no description yet"
  );

  const [edit, setEdit] = useVisibility();

  return (
    <Flow>
      {/* Logo + Edit button */}
      <Flex>
        <InfoLabel text="Description">
          <Icon.Description />
        </InfoLabel>
        <Button.Outline
          color="GRAY3"
          style={{ padding: "0.25em 1em" }}
          onClick={setEdit}
        >
          <Icon.Edit style={{ fontSize: theme.font.size[200] }} />
          <Text fontSize={theme.font.size[200]}>Edit</Text>
        </Button.Outline>
      </Flex>

      {/* Content */}

      {edit ? (
        <TextArea
          disabled
          {...descriptionController}
          style={{
            color: `hsl(${theme.color.DARK})`,
            fontSize: theme.font.size[400],
          }}
        />
      ) : (
        <Text fontSize={theme.font.size[400]} color="DARK">
          {descriptionValue}
        </Text>
      )}
    </Flow>
  );
};

const StyledCommentForm = styled.div`
  display: grid;
  grid-template:
    [row1-start] "a b" max-content[row1-end]
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
      <Flow>
        {comments.map((comment, i) => (
          <>
            {i > 0 && <hr />}
            <Comment key={comment.id} comment={comment} />
          </>
        ))}
      </Flow>
    </Flow>
  );
};

const AttachmentSection = ({
  attachments,
}: {
  attachments: Gql.Attachment[];
}) => {
  return (
    <Flow>
      <Flex>
        <InfoLabel text="Attachments">
          <Icon.AttachFile />
        </InfoLabel>
        <Button.Outline color="GRAY3" style={{ padding: "0.25em 1em" }}>
          <Icon.Add />
          <Text>Add</Text>
        </Button.Outline>
      </Flex>
      {attachments.map((attachment) => (
        <Attachment key={attachment.title} attachment={attachment} />
      ))}
    </Flow>
  );
};

export default Main;
