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
  type Card {
    id: ID!
    title: String
    description: String
    assignedTo: [User!]!
    coverId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    comments: [Comment!]!
    # labels: [Label!]!
    # attachments: [Attachment!]!
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
