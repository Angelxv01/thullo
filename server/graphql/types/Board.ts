import {gql} from 'apollo-server';
import {ObjectId} from 'mongoose';
import {BoardDocument, Role, Visibility} from '../../../types';
import {List, Label, Card, User} from '../../models';

const typeDefs = gql`
  type Member {
    user: User!
    role: Role!
  }

  type Board {
    id: ID!
    title: String
    visibility: Visibility!
    description: String
    lists: [List!]!
    cards: [Card!]!
    coverId: String
    members: [Member!]!
    labels: [Label!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Board: {
    lists: async (root: BoardDocument) =>
      List.find({boardId: root.id as ObjectId}),
    visibility: (root: BoardDocument) => Visibility[root.visibility],
    cards: async (root: {id: ObjectId}) => Card.find({boardId: root.id}),
    labels: async (root: {id: ObjectId}) => Label.find({boardId: root.id}),
  },
  Member: {
    user: async (root: {id: ObjectId}) => User.findById(root.id),
    role: (root: {role: number}) => Role[root.role],
  },
};

export default {typeDefs, resolvers};
