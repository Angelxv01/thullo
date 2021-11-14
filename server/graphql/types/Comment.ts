import {gql} from 'apollo-server';
import {ObjectId} from 'mongoose';
import {CommentDocument} from '../../../types';
import {Comment, User} from '../../models';

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
    replies: async (root: CommentDocument) =>
      Comment.find({parentId: root.id as ObjectId}),
    user: async (root: CommentDocument) => User.findById(root.user),
  },
};
export default {typeDefs, resolvers};
