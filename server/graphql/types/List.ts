import { gql } from 'apollo-server';
import Card from '../../models/Card';
import { ObjectId } from 'mongoose';
import { ListDocument } from '../../../types';
import { Context } from '../..';

const typeDefs = gql`
  type List {
    id: ID!
    name: String
    cards: [Card!]!
    cardCount: Int!
  }
`;

const resolvers = {
  List: {
    cardCount: async (root: ListDocument) =>
      Card.find({ listId: root.id as ObjectId }).countDocuments(),
    cards: async (root: ListDocument, _: never, ctx: Context) =>
      ctx.dataLoader.CardList.load(root.id),
  },
};

export default { typeDefs, resolvers };
