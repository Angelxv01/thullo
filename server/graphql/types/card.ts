import {gql} from 'apollo-server';
import {Context} from '../..';
import {CardDocument, Color, LabelDocument} from '../../../types';

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
    comments: async (root: CardDocument, _: never, ctx: Context) =>
      ctx.dataLoader.CommentCard.load(root.id),
    labels: async (root: CardDocument, _: never, ctx: Context) =>
      ctx.dataLoader.LabelLoader.loadMany(root.labels),
    members: async (root: CardDocument, _: never, ctx: Context) =>
      ctx.dataLoader.UserLoader.loadMany(root.members),
    list: async (root: CardDocument, _: never, ctx: Context) =>
      ctx.dataLoader.ListLoader.load(root.listId),
  },
  Label: {
    color: (root: LabelDocument) => Color[root.color],
  },
};

export default {typeDefs, resolvers};
