import { ApolloError, gql } from "apollo-server";
import DataLoader from "dataloader";
import { Context } from "../../..";
import { Board, Card } from "../../models";
import Label from "../../models/Label";
import { promises } from "fs";
import { UPLOAD_URL } from "../../utils/config";

interface FindCardInput {
  keyword: string;
}

const typeDefs = gql`
  input FindCardInput {
    keyword: String
  }
  extend type Query {
    card(id: ID!): Card
    labels: [Label!]!
    findCard(data: FindCardInput): [Card!]!
    getAllAttachments: [Attachment]
  }
`;

const resolvers = {
  Query: {
    card: async (
      _root: never,
      args: { id: string },
      {
        dataLoader: { CardLoader },
      }: { dataLoader: { CardLoader: DataLoader<unknown, unknown, unknown> } }
    ) => CardLoader.load(args.id),
    findCard: async (_: never, args: { data: FindCardInput }, ctx: Context) => {
      const user = ctx.currentUser;
      if (!user) {
        throw new ApolloError("Logged User only");
      }

      const boards = await Board.find({ "members.id": user.id });
      const ids = boards.map((board) => board.id);
      const cards = await Card.find({
        title: { $regex: args.data.keyword, $options: "i" },
        boardId: { $in: ids },
      }).limit(5);

      return cards;
    },
    labels: async () => Label.find(),
    getAllAttachments: () => {
      console.log(UPLOAD_URL);
    },
  },
};

export default { typeDefs, resolvers };
