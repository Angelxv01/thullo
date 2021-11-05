import {gql} from 'apollo-server';
import DataLoader from 'dataloader';

const typeDefs = gql`
  type Member {
    user: User!
    role: Role!  
  }

  type Board {
    id: ID!
    title: String!
    visibility: Visibility!
    description: String!
    lists: [List!]!
    coverId: String
    members: [Member!]!
    labels: [Label!]!
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
    labels: async (
      {labels}: {labels: string[]},
      _args: never,
      {
        dataLoader,
      }: {
        dataLoader: {
          LabelLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => dataLoader.LabelLoader.loadMany(labels),
  },
};

export default {typeDefs, resolvers};
