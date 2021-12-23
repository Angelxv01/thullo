import { ApolloError, gql } from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose, { ObjectId } from 'mongoose';
import { BoardDocument, IUser } from '../../../types';
import List from '../../models/List';
import { Context } from '../..';

interface ChangeListNameInput {
  name: string;
  listId: ObjectId;
}

const typeDefs = gql`
  input CreateListInput {
    name: String!
    boardId: ID!
  }

  input ChangeListNameInput {
    name: String!
    listId: ID!
  }

  extend type Mutation {
    createList(list: CreateListInput): List
    changeListName(data: ChangeListNameInput): List
  }
`;
const resolvers = {
  Mutation: {
    createList: async (
      _root: never,
      {
        list,
      }: {
        list: {
          name: string;
          boardId: mongoose.ObjectId;
        };
      },
      {
        currentUser,
        dataLoader,
      }: {
        currentUser: IUser | undefined;
        dataLoader: {
          UserLoader: DataLoader<unknown, unknown, unknown>;
          BoardLoader: DataLoader<unknown, unknown, unknown>;
          ListLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError('Only logged user can create a Board');
      }

      const newList = new List({ name: list.name, boardId: list.boardId });
      const board: BoardDocument = (await dataLoader.BoardLoader.load(
        list.boardId
      )) as BoardDocument;

      if (!board) {
        throw new ApolloError('Invalid Board Id');
      }

      try {
        await newList.save();
      } catch (error) {
        console.log((error as Error).message);
        throw new ApolloError('Cannot save the List');
      }

      return dataLoader.ListLoader.load(newList.id);
    },
    changeListName: async (
      _: never,
      args: ChangeListNameInput,
      ctx: Context
    ) => {
      if (!ctx.currentUser) throw new ApolloError('Logged User Only');
      await List.findByIdAndUpdate(args.listId, { name: args.name });
    },
  },
};

export default { typeDefs, resolvers };
