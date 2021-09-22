import {gql} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose from 'mongoose';

const typeDefs = gql`
  type Attachment {
    id: ID!
    url: String!
    abbreviation: String
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
    assignedTo: [User!]!
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
    assignedTo: async (
      {assignedTo}: {assignedTo: mongoose.ObjectId[]},
      _args: never,
      {
        dataLoader,
      }: {dataLoader: {UserLoader: DataLoader<unknown, unknown, unknown>}}
    ) => dataLoader.UserLoader.loadMany(assignedTo),
    comments: async (
      {comments}: {comments: string[]},
      _args: never,
      {
        dataLoader,
      }: {dataLoader: {CommentLoader: DataLoader<unknown, unknown, unknown>}}
    ) => dataLoader.CommentLoader.loadMany(comments),
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
