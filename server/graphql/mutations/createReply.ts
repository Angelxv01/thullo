import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose from 'mongoose';
import Logger from '../../../utils/Logger';
import Comment, {IComment} from '../../models/Comment';
import {IUser} from '../../models/User';

const typeDefs = gql`
  input CreateReply {
    commentId: ID!
    text: String
  }
  extend type Mutation {
    createReply(reply: CreateReply): Comment
  }
`;
const resolvers = {
  Mutation: {
    createReply: async (
      _root: never,
      {reply}: {reply: {commentId: mongoose.ObjectId; text: string}},
      {
        currentUser,
        dataLoader,
      }: {
        currentUser: IUser;
        dataLoader: {
          CardLoader: DataLoader<unknown, unknown, unknown>;
          CommentLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError('Only logged user can create Comment');
      }

      let comment: IComment;
      try {
        comment = (await dataLoader.CommentLoader.load(
          reply.commentId
        )) as IComment;
      } catch (error) {
        Logger.info(error);
        throw new ApolloError('Invalid Comment');
      }

      if (!comment) {
        throw new ApolloError("The comment doesn't exist");
      }

      const newReply = new Comment({
        text: reply.text,
        user: currentUser.id as string,
        parentId: reply.commentId,
      });

      try {
        await newReply.save();
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save the comment');
      }

      return dataLoader.CommentLoader.load(newReply.id);
    },
  },
};
export default {typeDefs, resolvers};
