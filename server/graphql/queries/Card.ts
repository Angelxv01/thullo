import {gql} from 'apollo-server';
import Card from '../../models/Card';

const typeDefs = gql`
  extend type Query {
    card(id: ID!): Card!
  }
`;

const resolvers = {
  Query: {
    card: async (_root: never, args: {id: String}) =>
      await Card.findById(args.id),
  },
};

export default {typeDefs, resolvers};
