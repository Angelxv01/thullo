import {gql} from 'apollo-server';
import DataLoader from 'dataloader';
import { UserDocument } from '../../../types';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    boards: [Board!]!
    friends: [User!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Token {
    value: String!
  }
`;

const resolvers = {
  User: {
    friends: async (
      {friends}:{friends: string[]},
      _: never, 
      {dataLoader}: 
        {dataLoader: Record<string, DataLoader<unknown, unknown>>}
    ) => dataLoader.UserLoader.loadMany(friends),
    boards: async (
      root: UserDocument,
      _args: never,
      {
        dataLoader,
      }: {dataLoader: {UserBoard: DataLoader<unknown, unknown, unknown>}}
    ) => dataLoader.UserBoard.load(root.id),
  },
};

export default {typeDefs, resolvers};
