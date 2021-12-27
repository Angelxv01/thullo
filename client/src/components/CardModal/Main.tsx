import React from "react";
import { Flow } from "../common";
import * as Gql from "../../gqlTypes";
import DescriptionSection from "./DescriptionSection";
import CommentSection from "./CommentSection";
import AttachmentSection from "./AttachmentSection";

const Main = ({ card }: { card: Gql.Card }) => {
  return (
    <Flow space="2em" style={{ flex: "3" }}>
      <DescriptionSection card={card} />
      <AttachmentSection attachments={card.attachments} cardId={card.id} />
      <CommentSection
        cardId={card.id}
        comments={card.comments}
        cardAuthor={card.author.id}
      />
    </Flow>
  );
};

export default Main;
