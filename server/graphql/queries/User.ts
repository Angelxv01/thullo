import { ApolloError, gql } from "apollo-server";
import { ObjectId } from "mongoose";
import { Context } from "../../..";
import { BoardDocument, IUser, UserDocument } from "../../types";
import User from "../../models/User";

interface FriendsNotInBoardArgs {
  id: ObjectId;
}

const typeDefs = gql`
  extend type Query {
    allUser: [User!]!
    authorizedUser: User
    friendsNotInBoard(id: ID): [User!]!
  }
`;

const resolvers = {
  Query: {
    allUser: async () => {
      const users: UserDocument[] = (await User.find()) as UserDocument[];
      return users.map((user) => user.toJSON());
    },
    authorizedUser: (
      _root: never,
      _args: never,
      context: { currentUser: IUser }
    ) => context.currentUser,
    friendsNotInBoard: async (
      _: never,
      args: FriendsNotInBoardArgs,
      ctx: Context
    ) => {
      if (!ctx.currentUser) throw new ApolloError("Logged User Only");
      const userFriends = ctx.currentUser.friends;
      const currentBoard = (await ctx.dataLoader.BoardLoader.load(
        args.id
      )) as BoardDocument;
      const boardMemberIds = currentBoard.members.map((member) =>
        String(member.id)
      );
      const friendsNotInBoard = userFriends.filter(
        (friend) => boardMemberIds.indexOf(String(friend)) === -1
      );

      return ctx.dataLoader.UserLoader.loadMany(friendsNotInBoard);
    },
  },
};

export default { typeDefs, resolvers };
