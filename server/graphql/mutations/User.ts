import { gql } from "apollo-server";
import { ApolloError, UserInputError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { object, string, Asserts } from "yup";

import User from "../../models/User";
import { UserDocument } from "../../types";
import { SECRET } from "../../utils/config";
import { ObjectId } from "mongoose";

const userSchema = object().shape({
  credentials: object().shape({
    username: string().trim().required(),
    password: string()
      .trim()
      .required()
      .min(8, "Password should be long at least 8"),
  }),
});
type UserInput = Asserts<typeof userSchema>;

const addFriendSchema = object().shape({ userId: string().trim().required() });
type AddFriendInput = Asserts<typeof addFriendSchema>;

const typeDefs = gql`
  input UserInput {
    username: String!
    password: String!
  }

  extend type Mutation {
    login(credentials: UserInput): Token
    createUser(credentials: UserInput): User
    addFriend(userId: String!): User
  }
`;

const resolvers = {
  Mutation: {
    login: async (_: never, args: unknown) => {
      const { credentials }: UserInput = await userSchema.validate(args, {
        stripUnknown: false,
      });
      const user = (await User.findOne({
        username: credentials.username,
      })) as UserDocument | null;
      const isPasswordValid = user
        ? await user.comparePasswords(credentials.password)
        : false;
      if (!(user && isPasswordValid)) {
        throw new UserInputError("Invalid credentials");
      }

      const token = { username: user.username, id: user.id as ObjectId };
      // add this only after development {expiresIn: 60 * 60}
      // bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZ2VsIiwiaWQiOiI2MTQwY2NjYWNiZTAxNWNmYzQzMTU2MTgiLCJpYXQiOjE2MzE4MjUzNTZ9.TgXp8KqXIjxdxxz0fAxzrn3bFCSeZ32-hld3r2B1Xl8
      return { value: jwt.sign(token, SECRET) };
    },
    createUser: async (_: never, args: unknown) => {
      const { credentials }: UserInput = await userSchema.validate(args, {
        stripUnknown: false,
      });
      const user: UserDocument = new User({
        username: credentials.username,
        passwordHash: credentials.password,
      });
      await user.save();

      return user.toJSON();
    },
    addFriend: async (
      _: never,
      args: unknown,
      { currentUser }: { currentUser: UserDocument }
    ) => {
      if (!currentUser)
        throw new ApolloError("Only logged user can add friends");

      const { userId }: AddFriendInput = await addFriendSchema.validate(args);
      const user = await User.findById(userId);
      if (!user) return null;

      currentUser.friends.push(user.id);
      user.friends.push(currentUser.id);
      await currentUser.save();
      await user.save();

      return user.toJSON();
    },
  },
};

export default { typeDefs, resolvers };
