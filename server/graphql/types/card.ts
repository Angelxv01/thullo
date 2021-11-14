import {gql} from 'apollo-server';
import {ObjectId} from 'mongoose';
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
    boardId: ID!
    listId: ID!
    members: [User!]!
    coverId: String
    comments: [Comment!]!
    labels: [Label!]!
    attachments: [Attachment!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Card: {
    comments: async (root: {id: ObjectId}) => Comment.find({cardId: root.id}),
  },
};

export default {typeDefs, resolvers};
