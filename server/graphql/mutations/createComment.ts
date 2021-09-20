import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose from 'mongoose';
import Logger from '../../../utils/Logger';
import {ICard} from '../../models/Card';
import Comment from '../../models/Comment';
import {IUser} from '../../models/User';

const typeDefs = gql`
  input CreateComment {
    cardId: ID!
    text: String
  }
  extend type Mutation {
    createComment(comment: CreateComment): Comment
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

      let card: ICard;
      try {
        card = (await dataLoader.CardLoader.load(comment.cardId)) as ICard;
      } catch (error) {
        Logger.info(error);
        throw new ApolloError('Invalid Card');
      }

      const newComment = new Comment({
        text: comment.text,
        user: currentUser.id as string,
      });
      card.comments.push(newComment.id);

      try {
        await newComment.save();
        await card.save();
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save the comment');
      }

      return dataLoader.CommentLoader.load(newComment.id);
    },
  },
};
export default {typeDefs, resolvers};
