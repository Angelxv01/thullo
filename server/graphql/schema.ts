import {makeExecutableSchema} from '@graphql-tools/schema';
import {mergeResolvers} from '@graphql-tools/merge';
import {gql} from 'apollo-server';
import {DateTimeTypeDefinition, DateTimeResolver} from 'graphql-scalars';

// TYPES
import Card from './types/Card';
import Board from './types/Board';
import List from './types/List';
import User from './types/User';

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
  Color.typeDefs,
  Visibility.typeDefs,
  CardQuery.typeDefs,
  BoardQuery.typeDefs,
  UserQuery.typeDefs,
  UserMutation.typeDefs,
  createBoard.typeDefs,
  createList.typeDefs,
  createCard.typeDefs,
];

const resolvers = mergeResolvers([
  {DateTime: DateTimeResolver},
  Card.resolvers,
  List.resolvers,
  Board.resolvers,
  User.resolvers,
  Color.resolvers,
  Visibility.resolvers,
  CardQuery.resolvers,
  BoardQuery.resolvers,
  UserQuery.resolvers,
  UserMutation.resolvers,
  createBoard.resolvers,
  createList.resolvers,
  createCard.resolvers,
]);

const schema = makeExecutableSchema({typeDefs, resolvers});
export default schema;
