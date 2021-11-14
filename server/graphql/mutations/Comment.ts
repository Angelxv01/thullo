import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose, {ObjectId} from 'mongoose';
import {IComment, UserDocument} from '../../../types';
import Logger from '../../../utils/Logger';
import Comment from '../../models/Comment';
import Card from '../../models/Card';

const typeDefs = gql`
  input CreateReply {
    commentId: ID!
    text: String
  }
  input CreateComment {
    cardId: ID!
    text: String
  }
  extend type Mutation {
    createComment(comment: CreateComment): Comment
    createReply(reply: CreateReply): Comment
  }
`;
const resolvers = {
  Mutation: {
    createComment: async (
      _root: never,
      {comment}: {comment: {cardId: mongoose.ObjectId; text: string}},
      {
        currentUser,
        dataLoader,
      }: {
        currentUser: UserDocument;
        dataLoader: {
          CardLoader: DataLoader<unknown, unknown, unknown>;
          CommentLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError('Only logged user can create Comment');
      }

      try {
        const card = await Card.findById(comment.cardId);
        if (!card) throw new ApolloError('Invalid Card');
      } catch (error) {
        throw new ApolloError('Invalid Card');
      }

      const newComment = new Comment({
        text: comment.text,
        user: currentUser.id as ObjectId,
      });

      try {
        await newComment.save();
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save the comment');
      }

      return dataLoader.CommentLoader.load(newComment.id);
    },
    createReply: async (
      _root: never,
      {reply}: {reply: {commentId: mongoose.ObjectId; text: string}},
      {
        currentUser,
        dataLoader,
      }: {
        currentUser: UserDocument;
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
        user: currentUser,
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
