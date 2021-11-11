import {gql} from 'apollo-server';
import DataLoader from 'dataloader';
import {ObjectId} from 'mongoose';
import {Role} from '../../../types';
import List from '../../models/List';
import Card from '../../models/Card';

const typeDefs = gql`
  type Member {
    user: User!
    role: Role!
  }

  type Board {
    id: ID!
    title: String!
    visibility: Visibility!
    description: String!
    lists: [List!]!
    cards: [Card!]!
    coverId: String
    members: [Member!]!
    labels: [Label!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Board: {
    labels: async (
      {labels}: {labels: string[]},
      _args: never,
      {
        dataLoader,
      }: {
        dataLoader: {
          LabelLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => dataLoader.LabelLoader.loadMany(labels),
    lists: async (root: {id: ObjectId}) => {
      const lists = await List.find({board_id: root.id});
      return lists.map(list => list.toJSON());
    },
    cards: async ({id}: {id: ObjectId}) => Card.find({board_id: id}),
  },
  Member: {
    user: async (
      root: {id: ObjectId},
      _: never,
      ctx: {dataLoader: Record<string, DataLoader<unknown, unknown>>}
    ) => ctx.dataLoader.UserLoader.load(root.id),
    role: (root: {role: number}) => Role[root.role],
  },
};

export default {typeDefs, resolvers};
