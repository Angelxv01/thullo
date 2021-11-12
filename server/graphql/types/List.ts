import {gql} from 'apollo-server';
import Card from '../../models/Card';
import {ObjectId} from 'mongoose';

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
    cardCount: async (root: {id: ObjectId}) =>
      Card.find({listId: root.id}).countDocuments(),
    cards: async (root: {id: ObjectId}) => Card.find({listId: root.id}),
  },
};

export default {typeDefs, resolvers};
