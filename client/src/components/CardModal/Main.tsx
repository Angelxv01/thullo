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
    <Flow space="2em">
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
  grid-template-columns: max-content auto;
  grid-template-rows: auto max-content;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.color.GRAY5};
  padding: 1em;
  border-radius: 12px;
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
    <div>
      <StyledCommentForm>
        <Avatar id={me.avatar} username={me.username} />
        <TextArea {...commentController} placeholder="Write a comment..." />
        <Button.Colored style={{ padding: "0.5em 1em" }}>
          Comment
        </Button.Colored>
      </StyledCommentForm>
      <Flow>
        {comments.map((comment, i) => (
          <>
            {i > 0 && <hr />}
            <Comment key={comment.id} comment={comment} />
          </>
        ))}
      </Flow>
    </div>
  );
};

const AttachmentSection = ({
  attachments,
}: {
  attachments: Gql.Attachment[];
}) => {
  return (
    <div>
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
    </div>
  );
};

export default Main;
