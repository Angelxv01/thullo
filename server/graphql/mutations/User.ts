import {gql} from 'apollo-server';
import {ApolloError, UserInputError} from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import {object, string, Asserts} from 'yup';

import User from '../../models/User';
import {UserDocument} from '../../../types';
import config from '../../../utils/config';

const userSchema = object().shape({
  credentials: object().shape({
    username: string()
      .trim()
      .required(),
    password: string()
      .trim()
      .required()
      .min(8, 'Password should be long at least 8')
  })
});
type UserInput = Asserts<typeof userSchema>;

const addFriendSchema = object().shape(
  {userId: string().trim().required()}
);
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
      const {credentials}: UserInput = await userSchema.validate(args, {stripUnknown: false});
      const user = (await User.findOne({
        username: credentials.username,
      })) as UserDocument | null;
      const isPasswordValid = user 
        ? await user.comparePasswords(credentials.password) 
        : false;
      if (!(user && isPasswordValid)) {
        throw new UserInputError('Invalid credentials');
      }

      const token = {username: user.username, id: user.id.toString()};
      // add this only after development {expiresIn: 60 * 60}
      // bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZ2VsIiwiaWQiOiI2MTQwY2NjYWNiZTAxNWNmYzQzMTU2MTgiLCJpYXQiOjE2MzE4MjUzNTZ9.TgXp8KqXIjxdxxz0fAxzrn3bFCSeZ32-hld3r2B1Xl8
      return {value: jwt.sign(token, config.SECRET)};
    },
    createUser: async (
      _: never,
      args: unknown
    ) => {
      const {credentials}: UserInput = await userSchema.validate(args, {stripUnknown: false});
      const user: UserDocument = new User({
        username: credentials.username,
        passwordHash: credentials.password,
      });

      try {
        await user.save();
      } catch (err) {
        throw err;
      }

      return user.toJSON();
    },
    addFriend: async (
      _: never, 
      args: unknown, 
      {currentUser}:{currentUser: UserDocument}
    ) => {
      if (!currentUser) throw new ApolloError("Only logged user can add friends");

      const {userId}: AddFriendInput = await
        addFriendSchema.validate(args);
      let user: UserDocument;
      user = await User.findById(userId);
      if (!user) return null;

      currentUser.friends.push(user.id);
      user.friends.push(currentUser.id);

      try {
        await currentUser.save();
        await user.save();
      } catch (err) {
        throw err;
      }

      return user.toJSON();
      
    }
  },
};

export default {typeDefs, resolvers};
