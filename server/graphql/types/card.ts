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
    value: String!
    color: Color!
  }
  type Comment {
    id: ID!
    text: String
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type Card {
    id: ID!
    title: String
    description: String
    assignedTo: [User!]!
    coverId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    # labels: [Label!]!
    # attachments: [Attachment!]!
    # comments: [Comment!]!
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
  },
};

export default {typeDefs, resolvers};
