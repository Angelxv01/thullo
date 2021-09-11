import {gql} from 'apollo-server';
import Card from '../../models/Card';

const typeDefs = gql`
  extend type Query {
    cardCount: Int!
    allCards: [Card!]!
    card(id: ID!): Card!
  }
`;

const resolvers = {
  Query: {
    cardCount: async () => await Card.count(),
    allCards: async () => await Card.find(),
    card: async (_root: never, args: {id: String}) =>
      await Card.findById(args.id),
  },
};

export default {typeDefs, resolvers};
