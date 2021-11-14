import {gql} from 'apollo-server';
import DataLoader from 'dataloader';
import {ObjectId} from 'mongoose';
import Card from '../../models/Card';
import Comment from '../../models/Comment';

const typeDefs = gql`
  type Comment {
    id: ID!
    card: Card
    text: String
    user: User!
    replies: [Comment!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Comment: {
    replies: async ({id}: {id: ObjectId}) => Comment.find({parentId: id}),
    user: (
      {user}: {user: string},
      _args: never,
      {
        dataLoader: {UserLoader},
      }: {dataLoader: {UserLoader: DataLoader<unknown, unknown, unknown>}}
    ) => UserLoader.load(user),
    card: async ({cardId}: {cardId: ObjectId}) => Card.findById(cardId),
  },
};
export default {typeDefs, resolvers};
