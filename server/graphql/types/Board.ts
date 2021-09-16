import {gql} from 'apollo-server';
import DataLoader from 'dataloader';
import Logger from '../../../utils/Logger';

const typeDefs = gql`
  type Board {
    id: ID!
    title: String!
    visibility: Visibility!
    description: String!
    lists: [List!]!
    coverId: String
    owner: User!
    collaborators: [User!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Board: {
    lists: async (
      {lists}: {lists: string[]},
      _args: never,
      {
        dataLoader: {ListLoader},
      }: {dataLoader: {ListLoader: DataLoader<unknown, unknown, unknown>}}
    ) => {
      return ListLoader.loadMany(lists);
    },
    owner: async (
      {owner}: {owner: string},
      _args: never,
      {
        dataLoader: {UserLoader},
      }: {dataLoader: {UserLoader: DataLoader<unknown, unknown, unknown>}}
    ) => UserLoader.load(owner),
    collaborators: async (
      {collaborators}: {collaborators: string[]},
      _args: never,
      {
        dataLoader: {UserLoader},
      }: {dataLoader: {UserLoader: DataLoader<unknown, unknown, unknown>}}
    ) => UserLoader.loadMany(collaborators),
  },
};

export default {typeDefs, resolvers};
