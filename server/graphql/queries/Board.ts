import {gql} from 'apollo-server';

import Board from '../../models/Board';

const typeDefs = gql`
  extend type Query {
    boardCount: Int!
    allBoards: [Board!]!
    board(id: ID!): Board!
  }
`;

const resolvers = {
  Query: {
    allBoards: async () =>
      await Board.find().populate({
        path: 'lists',
        populate: {path: 'cards'},
      }),
    board: async (_root: never, args: {id: String}) =>
      await Board.findById(args.id).populate({
        path: 'lists',
        populate: {path: 'cards'},
      }),
  },
};

export default {typeDefs, resolvers};
