import {gql} from 'apollo-server';
import DataLoader from 'dataloader';

const typeDefs = gql`
  extend type Query {
    card(id: ID!): Card
  }
`;

const resolvers = {
  Query: {
    card: (
      _root: never,
      args: {id: string},
      {
        dataLoader: {CardLoader},
      }: {dataLoader: {CardLoader: DataLoader<unknown, unknown, unknown>}}
    ) => CardLoader.load(args.id),
  },
};

export default {typeDefs, resolvers};
