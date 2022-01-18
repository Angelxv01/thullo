import { gql, ApolloError } from "apollo-server";
import { ObjectId } from "mongoose";
import Label from "../../models/Label";

import { Color } from "../../types/ILabel";
import { Board, Card } from "../../models";
import { UserDocument } from "../../types";

interface LabelInput {
  boardId: ObjectId;
  cardId: ObjectId;
  text: string;
  color: Color;
}

const typeDefs = gql`
  input createLabelInput {
    boardId: ID!
    text: String!
    color: Color
    cardId: ID
  }

  extend type Mutation {
    createLabel(labelData: createLabelInput): Label
  }
`;
const resolvers = {
  Mutation: {
    createLabel: async (
      _root: never,
      {
        labelData,
      }: {
        labelData: LabelInput;
      },
      {
        currentUser,
      }: {
        currentUser: UserDocument;
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError("Only logged user can create a List");
      }

      const board = await Board.findById(labelData.boardId);
      if (!board) throw new ApolloError("Invalid board");

      const label = new Label({
        text: labelData.text,
        color: Color[labelData.color],
        boardId: labelData.boardId,
      });

      await label.save();
      if (!labelData.cardId) return label.toJSON();

      const card = await Card.findById(labelData.cardId);
      if (!card) throw new ApolloError("Invalid Card");
      card.labels.push(label.id);
      await card.save();

      return label.toJSON();
    },
  },
};
export default { typeDefs, resolvers };
