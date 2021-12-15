import { gql } from 'apollo-server';
import { Context } from '../..';
import { CommentDocument } from '../../../types';

const typeDefs = gql`
  type Comment {
    id: ID!
    text: String
    user: User!
    replies: [Comment!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Comment: {
    replies: async (root: CommentDocument, _: never, ctx: Context) =>
      ctx.dataLoader.CommentReply.load(root.id),
    user: async (root: CommentDocument, _: never, ctx: Context) =>
      ctx.dataLoader.UserLoader.load(root.user),
  },
};
export default { typeDefs, resolvers };
