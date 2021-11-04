import {gql} from 'apollo-server';
import { IUser, UserDocument } from '../../../types';
import User from '../../models/User';

const typeDefs = gql`
  extend type Query {
    allUser: [User!]!
    authorizedUser: User
  }
`;

const resolvers = {
  Query: {
    allUser: async () => {
      const users: UserDocument[] = await User.find() as UserDocument[];
      return users.map(user => user.toJSON());
    },
    authorizedUser: (
      _root: never, _args: never, context: {currentUser: IUser}
    ) => context.currentUser,
  },
};

export default {typeDefs, resolvers};
