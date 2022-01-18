import { gql } from "apollo-server";
import DataLoader from "dataloader";

import Board from "../../models/Board";

const typeDefs = gql`
  extend type Query {
    allBoards: [Board!]!
    board(id: ID!): Board
  }
`;

const resolvers = {
  Query: {
    allBoards: async () => await Board.find(),
    board: async (
      _root: never,
      args: { id: String },
      {
        dataLoader: { BoardLoader },
      }: { dataLoader: { BoardLoader: DataLoader<unknown, unknown, unknown> } }
    ) => BoardLoader.load(args.id),
  },
};

export default { typeDefs, resolvers };
