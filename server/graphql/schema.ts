import {makeExecutableSchema} from '@graphql-tools/schema';
import {mergeResolvers} from '@graphql-tools/merge';
import {gql} from 'apollo-server';
import {DateTimeTypeDefinition, DateTimeResolver} from 'graphql-scalars';

// TYPES
import Card from './types/Card';
import Board from './types/Board';
import List from './types/List';
import User from './types/User';
import Comment from './types/Comment';

// ENUMS
import Color from './enums/Color';
import Visibility from './enums/Visibility';

// QUERIES
import CardQuery from './queries/Card';
import BoardQuery from './queries/Board';
import UserQuery from './queries/User';

// MUTATIONS
import UserMutation from './mutations/User';
import createBoard from './mutations/createBoard';
import createList from './mutations/createList';
import createCard from './mutations/createCard';
import createComment from './mutations/createComment';
import createReply from './mutations/createReply';

const rootTypeDefs = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [
  DateTimeTypeDefinition,
  rootTypeDefs,
  Card.typeDefs,
  List.typeDefs,
  Board.typeDefs,
  User.typeDefs,
  Comment.typeDefs,
  Color.typeDefs,
  Visibility.typeDefs,
  CardQuery.typeDefs,
  BoardQuery.typeDefs,
  UserQuery.typeDefs,
  UserMutation.typeDefs,
  createBoard.typeDefs,
  createList.typeDefs,
  createCard.typeDefs,
  createComment.typeDefs,
  createReply.typeDefs,
];

const resolvers = mergeResolvers([
  {DateTime: DateTimeResolver},
  Card.resolvers,
  List.resolvers,
  Board.resolvers,
  User.resolvers,
  Comment.resolvers,
  Color.resolvers,
  Visibility.resolvers,
  CardQuery.resolvers,
  BoardQuery.resolvers,
  UserQuery.resolvers,
  UserMutation.resolvers,
  createBoard.resolvers,
  createList.resolvers,
  createCard.resolvers,
  createComment.resolvers,
  createReply.resolvers,
]);

const schema = makeExecutableSchema({typeDefs, resolvers});
export default schema;
