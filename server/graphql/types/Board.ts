import {gql} from 'apollo-server';
import DataLoader from 'dataloader';

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
    lists: (
      {lists}: {lists: string[]},
      _args: never,
      {
        dataLoader: {ListLoader},
      }: {dataLoader: {ListLoader: DataLoader<unknown, unknown, unknown>}}
    ) => ListLoader.loadMany(lists),
    owner: (
      {owner}: {owner: string},
      _args: never,
      {
        dataLoader: {UserLoader},
      }: {dataLoader: {UserLoader: DataLoader<unknown, unknown, unknown>}}
    ) => UserLoader.load(owner),
    collaborators: (
      {collaborators}: {collaborators: string[]},
      _args: never,
      {
        dataLoader: {UserLoader},
      }: {dataLoader: {UserLoader: DataLoader<unknown, unknown, unknown>}}
    ) => UserLoader.loadMany(collaborators),
  },
};

export default {typeDefs, resolvers};
