import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useTheme } from "styled-components";
import * as Gql from "../../gqlTypes";
import {
  CreateAttachmentInput,
  CREATE_FILE_ATTACHMENT,
} from "../../graphql/mutation";
import useVisibility from "../../hooks/useVisiblity";
import { Flow, Flex, Icon, Button, Text, Relative, Absolute } from "../common";
import InfoLabel from "../common/InfoLabel";
import Attachment from "./Attachment";

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
  >(CREATE_FILE_ATTACHMENT);
  const [state, setState] = useState<File | null>();
  const theme = useTheme();

  const handleUploadFile = () =>
    createAttachment({
      variables: {
        data: {
          cardId,
          file: state,
        },
      },
    });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.validity.valid && setState(e.target.files?.item(0));

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
            onClick={setVisibility}
          >
            <Icon.Add style={{ fontSize: theme.font.size[200] }} />
            <Text>Add</Text>
          </Button.Outline>
          {visible && (
            <Absolute>
              <div
                style={{
                  backgroundColor: "red",
                  width: "20em",
                  padding: "2em",
                }}
              >
                Hello world
                <input type="file" onChange={onChange} />
                <button onClick={handleUploadFile}>Halo</button>
              </div>
            </Absolute>
          )}
        </Relative>
      </Flex>
      {attachments.map((attachment) => (
        <Attachment key={attachment.title} attachment={attachment} />
      ))}
    </Flow>
  );
};

export default AttachmentSection;
