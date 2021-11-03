import {gql} from 'apollo-server';
import DataLoader from 'dataloader';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    boards: [Board!]
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
      {boards}: {boards: string[]},
      _args: never,
      {
        dataLoader: {BoardLoader},
      }: {dataLoader: {BoardLoader: DataLoader<unknown, unknown, unknown>}}
    ) => BoardLoader.loadMany(boards),
  },
};

export default {typeDefs, resolvers};
