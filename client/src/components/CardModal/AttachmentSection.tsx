import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import * as Gql from "../../gqlTypes";
import {
  CreateAttachmentInput,
  CREATE_FILE_ATTACHMENT,
} from "../../graphql/mutation";
import { CARD } from "../../graphql/query";
import useVisibility from "../../hooks/useVisiblity";
import { Flow, Flex, Icon, Button, Text, Relative } from "../common";
import { Color } from "../common/Button";
import InfoLabel from "../common/InfoLabel";
import Attachment from "./Attachment";

const StyledFileInput = styled(Flow)<Color>`
  position: absolute;
  background-color: white;
  z-index: 7;
  width: 25em;
  padding: 2em;
  margin-top: 1em;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  & input[type="file"]::file-selector-button {
    font: inherit;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.border.radius[1]};
    background-color: hsl(
      ${({ backgroundColor, theme }) =>
        backgroundColor && theme.color[backgroundColor]
          ? theme.color[backgroundColor]
          : theme.color.BLUE1}
    );
    color: hsl(${({ theme }) => theme.color.WHITE});
    border: 0;
    line-height: ${({ theme }) => theme.lineHeight[0]};
    padding: 0.3em 0.75em;
  }
`;

const AttachmentSection = ({
  attachments,
  cardId,
}: {
  attachments: Gql.Attachment[];
  cardId: string;
}) => {
  const [visible, setVisibility] = useVisibility();
  const [createAttachment] = useMutation<
    { createFileAttachment: Gql.Attachment },
    CreateAttachmentInput
  >(CREATE_FILE_ATTACHMENT, {
    refetchQueries: [{ query: CARD, variables: { id: cardId } }],
  });
  const [state, setState] = useState<File | null>();
  const theme = useTheme();

  const handleUploadFile = () => {
    createAttachment({
      variables: {
        data: {
          cardId,
          file: state,
        },
      },
    });
    setVisibility();
    setState(null);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.validity.valid && setState(e.target.files?.item(0));
  const toggleVisibility = () => {
    setVisibility();
    setState(null);
  };

  return (
    <Flow>
      <Flex>
        <InfoLabel text="Attachments">
          <Icon.AttachFile />
        </InfoLabel>
        <Relative>
          <Button.Outline
            color="GRAY3"
            style={{ padding: "0.25em 1em" }}
            onClick={toggleVisibility}
          >
            <Icon.Add style={{ fontSize: theme.font.size[200] }} />
            <Text>Add</Text>
          </Button.Outline>
          {visible && (
            <StyledFileInput>
              <Text>Add an attachment</Text>
              <div
                style={{
                  backgroundColor: state
                    ? `hsl(${theme.color.GREEN3})`
                    : undefined,
                  padding: "1em",
                  borderRadius: "8px",
                }}
              >
                <input type="file" onChange={onChange} />
              </div>
              <Button.Colored
                style={{ padding: "0.5em 1em" }}
                onClick={handleUploadFile}
              >
                Upload
              </Button.Colored>
            </StyledFileInput>
          )}
        </Relative>
      </Flex>
      {attachments.map((attachment) => (
        <Attachment
          key={attachment.title}
          attachment={attachment}
          cardId={cardId}
        />
      ))}
    </Flow>
  );
};

export default AttachmentSection;
