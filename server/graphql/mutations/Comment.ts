import {ApolloError, gql} from 'apollo-server';
import {ObjectId} from 'mongoose';
import {UserDocument} from '../../../types';
import Logger from '../../../utils/Logger';
import Comment from '../../models/Comment';
import Card from '../../models/Card';

interface CommentInput {
  commentId?: ObjectId;
  cardId?: ObjectId;
  text: string;
}

const typeDefs = gql`
  input CreateComment {
    commentId: ID
    cardId: ID
    text: String
  }
  extend type Mutation {
    createComment(commentData: CreateComment): Comment
  }
`;

const resolvers = {
  Mutation: {
    createComment: async (
      _: never,
      {commentData}: {commentData: CommentInput},
      {
        currentUser,
      }: {
        currentUser: UserDocument;
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError('Only logged user can create Comment');
      }

      try {
        const card = await Card.findById(commentData.cardId);
        if (!card) throw new ApolloError('Invalid Card');
      } catch (error) {
        throw new ApolloError('Invalid Card');
      }

      const comment = new Comment({
        cardId: commentData.cardId,
        parentId: commentData.commentId,
        text: commentData.text,
        user: currentUser.id as ObjectId,
      });

      try {
        await comment.save();
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save the comment');
      }

      return comment;
    },
  },
};
export default {typeDefs, resolvers};
