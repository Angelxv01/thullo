import {gql} from 'apollo-server';
import {UserInputError} from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import User, {IUser} from '../../models/User';
import config from '../../../utils/config';
import Logger from '../../../utils/Logger';

const typeDefs = gql`
  extend type Mutation {
    login(username: String!, password: String!): Token
    createUser(username: String!, password: String!): User
  }
`;

const resolvers = {
  Mutation: {
    login: async (_root: never, args: {username: string; password: string}) => {
      const user = (await User.findOne({
        username: args.username,
      })) as IUser | null;

      if (!(user && (await user.comparePasswords(args.password)))) {
        throw new UserInputError('Invalid credentials');
      }

      const token = {username: user.username, id: user.id};
      // add this only after development {expiresIn: 60 * 60}
      // bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZ2VsIiwiaWQiOiI2MTQwY2NjYWNiZTAxNWNmYzQzMTU2MTgiLCJpYXQiOjE2MzE4MjUzNTZ9.TgXp8KqXIjxdxxz0fAxzrn3bFCSeZ32-hld3r2B1Xl8

      return {value: jwt.sign(token, config.SECRET)};
    },
    createUser: async (
      _root: never,
      args: {username: string; password: string}
    ) => {
      const user = new User({
        username: args.username,
        passwordHash: args.password,
      });

      try {
        return await user.save();
      } catch (e) {
        Logger.error(e);
        throw new UserInputError('invalid');
      }
    },
  },
};

export default {typeDefs, resolvers};
