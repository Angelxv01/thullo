import {gql} from 'apollo-server';
import {UserInputError} from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import type {Asserts} from 'yup';

import User from '../../models/User';
import {UserDocument} from '../../../types';
import config from '../../../utils/config';

const userSchema = yup.object().shape({
  credentials: yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(),
    password: yup
      .string()
      .trim()
      .required()
      .min(8, 'Password should be long at least 8')
  })
});

type UserInput = Asserts<typeof userSchema>;

const typeDefs = gql`
  input CreateUserInput {
    username: String!
    password: String!
  }

  extend type Mutation {
    login(username: String!, password: String!): Token
    createUser(credentials: CreateUserInput): User
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
  },
};

export default {typeDefs, resolvers};
