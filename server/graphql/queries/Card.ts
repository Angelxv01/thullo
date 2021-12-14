import { gql } from 'apollo-server';
import DataLoader from 'dataloader';
import Label from '../../models/Label';

const typeDefs = gql`
  extend type Query {
    card(id: ID!): Card
    labels: [Label!]!
  }
`;

const resolvers = {
  Query: {
    card: (
      _root: never,
      args: { id: string },
      {
        dataLoader: { CardLoader },
      }: { dataLoader: { CardLoader: DataLoader<unknown, unknown, unknown> } }
    ) => CardLoader.load(args.id),
    labels: async () => Label.find(),
  },
};

export default { typeDefs, resolvers };
