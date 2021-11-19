import {gql} from 'apollo-server';
import {ObjectId} from 'mongoose';
import {CardDocument, Color} from '../../../types';
import {Label, List, User} from '../../models';
import Comment from '../../models/Comment';

const typeDefs = gql`
  type Attachment {
    id: ID!
    url: String!
    title: String
    coverId: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type Label {
    id: ID!
    text: String!
    color: Color!
  }
  type Card {
    id: ID!
    title: String
    description: String
    members: [User!]!
    coverId: String
    list: List!
    comments: [Comment!]!
    labels: [Label!]!
    attachments: [Attachment!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Card: {
    comments: async (root: CardDocument) =>
      Comment.find({cardId: root.id as ObjectId}),
    labels: async (root: CardDocument) => Label.find({_id: {$in: root.labels}}),
    members: async (root: CardDocument) =>
      User.find({_id: {$in: root.members}}),
    list: async (root: CardDocument) => List.findById(root.listId),
  },
  Label: {
    color: (root: {color: Color}) => Color[root.color],
  },
};

export default {typeDefs, resolvers};
