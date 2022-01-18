import { gql } from "apollo-server";
import { Context } from "../../..";
import { UserDocument } from "../../types";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    avatar: String
    bio: String
    phone: String
    email: String
    boards: [Board!]!
    friends: [User!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Token {
    value: String!
  }
`;

const resolvers = {
  User: {
    friends: async (root: UserDocument, _: never, ctx: Context) =>
      ctx.dataLoader.UserLoader.loadMany(root.friends),
    boards: async (root: UserDocument, _: never, ctx: Context) =>
      ctx.dataLoader.UserBoard.load(root.id),
  },
};

export default { typeDefs, resolvers };
