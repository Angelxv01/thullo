import React from "react";
import { Flow } from "../common";
import * as Gql from "../../gqlTypes";
import DescriptionSection from "./DescriptionSection";
import CommentSection from "./CommentSection";
import AttachmentSection from "./AttachmentSection";
import { useQuery } from "@apollo/client";
import { Data, MASTER } from "../../graphql/query";

const Main = ({ card }: { card: Gql.Card }) => {
  const { data } = useQuery<Data, { id: string }>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
    fetchPolicy: "cache-only",
  });

  if (!data) return null;

  return (
    <Flow space="2em" style={{ flex: "3" }}>
      <DescriptionSection description={card.description} />
      <AttachmentSection attachments={card.attachments} />
      <CommentSection comments={card.comments} />
    </Flow>
  );
};

export default Main;
