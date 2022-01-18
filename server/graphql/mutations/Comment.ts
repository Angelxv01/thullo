import { ApolloError, gql } from "apollo-server";
import { ObjectId } from "mongoose";
import { UserDocument } from "../../types";
import Comment from "../../models/Comment";
import Card from "../../models/Card";
import { Context } from "../../..";

interface CommentInput {
  commentId?: ObjectId;
  cardId?: ObjectId;
  text: string;
}

interface EditCommentInput {
  data: {
    commentId?: ObjectId;
    text?: string;
  };
}

const typeDefs = gql`
  input CreateComment {
    commentId: ID
    cardId: ID
    text: String
  }
  input EditComment {
    commentId: ID
    text: String
  }
  extend type Mutation {
    createComment(commentData: CreateComment): Comment
    editComment(data: EditComment): Comment
    deleteComment(id: ID): Boolean
  }
`;

const resolvers = {
  Mutation: {
    createComment: async (
      _: never,
      { commentData }: { commentData: CommentInput },
      {
        currentUser,
      }: {
        currentUser: UserDocument;
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError("Only logged user can create Comment");
      }

      try {
        const card = await Card.findById(commentData.cardId);
        if (!(card || commentData.commentId))
          throw new ApolloError("Invalid Card");
      } catch (error) {
        throw new ApolloError("Invalid Card");
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
        console.error(error);
        throw new ApolloError("Cannot save the comment");
      }

      return comment;
    },
    editComment: async (_: never, args: EditCommentInput, ctx: Context) => {
      if (!ctx.currentUser) throw new ApolloError("Logged User Only");
      const comment = await Comment.findById(args.data.commentId);
      const card = await Card.findById(comment?.cardId);

      if (!(comment && card)) throw new ApolloError("Invalid resources");

      if (String(card.author) !== String(ctx.currentUser.id))
        throw new ApolloError("Unauthorized");

      comment.text = args.data.text || comment.text;
      await comment.save();

      return comment.toJSON();
    },
    deleteComment: async (_: never, { id }: { id: ObjectId }, ctx: Context) => {
      if (!ctx.currentUser) throw new ApolloError("Logged User Only");
      const comment = await Comment.findById(id);
      const card = await Card.findById(comment?.cardId);

      if (!(comment && card)) throw new ApolloError("Invalid resources");

      if (String(card.author) !== String(ctx.currentUser.id))
        throw new ApolloError("Unauthorized");
      await comment.remove();
      return true;
    },
  },
};
export default { typeDefs, resolvers };
