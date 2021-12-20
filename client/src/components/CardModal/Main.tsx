import React from "react";
import { Flow } from "../common";
import * as Gql from "../../gqlTypes";
import DescriptionSection from "./DescriptionSection";
import CommentSection from "./CommentSection";
import AttachmentSection from "./AttachmentSection";

const Main = ({ card, me }: { card: Gql.Card; me: Gql.User }) => {
  return (
    <Flow space="2em" style={{ flex: "3" }}>
      <DescriptionSection description={card.description} />
      <AttachmentSection attachments={card.attachments} />
      <CommentSection comments={card.comments} me={me} />
    </Flow>
  );
};

export default Main;
