import {makeExecutableSchema} from '@graphql-tools/schema';
import {mergeResolvers} from '@graphql-tools/merge';
import {gql} from 'apollo-server';

// TYPES
import Card from './types/Card';
import Board from './types/Board';
import List from './types/List';

// ENUMS
import Color from './enums/Color';
import Visibility from './enums/Visibility';

// QUERIES
import CardQuery from './queries/Card';
import BoardQuery from './queries/Board';

const rootTypeDefs = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [
  rootTypeDefs,
  Card.typeDefs,
  List.typeDefs,
  Board.typeDefs,
  Color.typeDefs,
  Visibility.typeDefs,
  CardQuery.typeDefs,
  BoardQuery.typeDefs,
];

const resolvers = mergeResolvers([
  Card.resolvers,
  List.resolvers,
  Board.resolvers,
  Color.resolvers,
  Visibility.resolvers,
  CardQuery.resolvers,
  BoardQuery.resolvers,
]);

const schema = makeExecutableSchema({typeDefs, resolvers});
export default schema;
