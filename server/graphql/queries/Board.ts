import {gql} from 'apollo-server';

import Board from '../../models/Board';

const typeDefs = gql`
  extend type Query {
    allBoards: [Board!]!
    board(id: ID!): Board!
  }
`;

const resolvers = {
  Query: {
    allBoards: async () => {
      const board = await Board.find();
      return board;
    },
    board: async (_root: never, args: {id: String}) =>
      await Board.findById(args.id),
  },
};

export default {typeDefs, resolvers};
