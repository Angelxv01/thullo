import {ApolloServer, gql} from 'apollo-server';
import {connect} from 'mongoose';

import Logger from '../utils/Logger';
import Card from './models/Card';
import config from '../utils/config';

connect(config.MONGODB || '')
  .then(() => Logger.info('connected to MongoDB'))
  .catch(err => Logger.error(err));

const typeDefs = gql`
  type Cover {
    url: String!
  }
  type Attachment {
    url: String!
    added_at: String!
    abbreviation: String
    cover: Cover
  }
  type Label {
    id: ID!
    value: String!
    # color: Color!
  }
  type Comment {
    id: ID!
    created_at: String!
    edited_at: String
    text: String
    # User: User!
  }
  type Card {
    id: ID!
    title: String!
    description: String!
    labels: [Label!]!
    attachments: [Attachment!]!
    cover: Cover!
    comments: [Comment!]!
  }
  type Query {
    cardCount: Int!
    allCards: [Card!]!
    card(id: ID!): Card!
  }
`;

const resolvers = {
  Query: {
    cardCount: async () => await Card.count(),
    allCards: async () => await Card.find(),
    card: async (_root: never, args: {id: String}) =>
      await Card.findById(args.id),
  },
};
const server = new ApolloServer({typeDefs, resolvers});

void server.listen().then(({url}) => Logger.info(`Server ready at ${url}`));
