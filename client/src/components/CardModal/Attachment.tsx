import React from "react";
import * as Gql from "../../gqlTypes";
import { useTheme } from "styled-components";
import { Flow, Flex, Button, Text } from "../common";

const Attachment = ({ attachment }: { attachment: Gql.Attachment }) => {
  const theme = useTheme();
  const date = new Date(attachment.createdAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "80px auto", gap: "1em" }}
    >
      {attachment.coverId ? (
        <div
          style={{
            backgroundSize: "cover",
            borderRadius: "8px",
            backgroundImage: `url(https://source.unsplash.com/${attachment.coverId})`,
          }}
        ></div>
      ) : (
        <div
          style={{
            display: "grid",
            alignContent: "center",
            textAlign: "center",
            backgroundColor: `hsl(${theme.color.GRAY5})`,
            color: `hsl(${theme.color.GRAY2})`,
            borderRadius: "8px",
          }}
        >
          {attachment.title
            .split(" ")
            .reduce((acc, word) => (acc += word[0]), "")
            .substring(0, 2)
            .toUpperCase()}
        </div>
      )}

      <Flow space="0.5em">
        <div>
          <Text fontSize={theme.font.size[100]} style={{ lineHeight: "12px" }}>
            added {date}
          </Text>
          <Text
            fontSize={theme.font.size[200]}
            lineHeight={theme.lineHeight[0]}
          >
            {attachment.title}
          </Text>
        </div>
        <Flex>
          <a href={attachment.url}>
            <Button.Outline color="GRAY3" style={{ padding: "0.25em 0.5em" }}>
              Download
            </Button.Outline>
          </a>
          <Button.Outline color="GRAY3" style={{ padding: "0.25em 0.5em" }}>
            Delete
          </Button.Outline>
        </Flex>
      </Flow>
    </div>
  );
};

export default Attachment;
