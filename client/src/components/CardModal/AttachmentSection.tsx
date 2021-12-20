import React from "react";
import { useTheme } from "styled-components";
import * as Gql from "../../gqlTypes";
import { Flow, Flex, Icon, Button, Text } from "../common";
import InfoLabel from "../common/InfoLabel";
import Attachment from "./Attachment";

const AttachmentSection = ({
  attachments,
}: {
  attachments: Gql.Attachment[];
}) => {
  const theme = useTheme();
  return (
    <Flow>
      <Flex>
        <InfoLabel text="Attachments">
          <Icon.AttachFile />
        </InfoLabel>
        <Button.Outline color="GRAY3" style={{ padding: "0.25em 1em" }}>
          <Icon.Add style={{ fontSize: theme.font.size[200] }} />
          <Text>Add</Text>
        </Button.Outline>
      </Flex>
      {attachments.map((attachment) => (
        <Attachment key={attachment.title} attachment={attachment} />
      ))}
    </Flow>
  );
};

export default AttachmentSection;
