import { ApolloError, gql } from "apollo-server";
import DataLoader from "dataloader";
import { Context } from "../../..";
import { Board, Card } from "../../models";
import Label from "../../models/Label";
import { promises } from "fs";

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
  },
};

export default { typeDefs, resolvers };
