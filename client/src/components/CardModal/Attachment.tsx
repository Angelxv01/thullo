import React from "react";
import * as Gql from "../../gqlTypes";
import styled, { useTheme } from "styled-components";
import { Flow, Flex, Button, Text } from "../common";
import { formatDate } from "../../utils/formatting";
import AttachmentCover from "./AttachmentCover";
import { download } from "../../utils/downloader";

const StyledAttachment = styled.div`
  display: grid;
  grid-template-columns: 80px auto;
  gap: 1em;
`;

const Attachment = ({ attachment }: { attachment: Gql.Attachment }) => {
  const theme = useTheme();
  const date = formatDate(attachment.createdAt);

  return (
    <StyledAttachment>
      <AttachmentCover
        coverId={attachment.coverId}
        title={attachment.title || "Untitled"}
      />
      <Flow space="0.5em">
        <div>
          <Text fontSize={theme.font.size[100]} style={{ lineHeight: "12px" }}>
            added {date}
          </Text>
          <Text
            fontSize={theme.font.size[200]}
            lineHeight={theme.lineHeight[0]}
          >
            {attachment.title || "Untitled"}
          </Text>
        </div>
        <Flex>
          <Button.Outline
            color="GRAY3"
            style={{ padding: "0.25em 0.5em" }}
            onClick={() => download(attachment.filename)}
          >
            Download
          </Button.Outline>
          <Button.Outline color="GRAY3" style={{ padding: "0.25em 0.5em" }}>
            Delete
          </Button.Outline>
        </Flex>
      </Flow>
    </StyledAttachment>
  );
};

export default Attachment;
