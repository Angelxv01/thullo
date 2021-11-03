import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose from 'mongoose';
import Logger from '../../../utils/Logger';
import {BoardDocument, IUser} from '../../../types';

import List from '../../models/List';


const typeDefs = gql`
  input CreateListInput {
    name: String!
    boardId: ID!
  }
  extend type Mutation {
    createList(list: CreateListInput): List
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

      // const isOwner = currentUser.boards.includes(list.boardId);
      // if (!isOwner) {
      //   throw new ApolloError('Only owner can create Lists');
      // }

      const newList = new List({name: list.name});
      const board: BoardDocument = (await dataLoader.BoardLoader.load(
        list.boardId
      )) as BoardDocument;
      // board.lists.push(newList.id);

      try {
        await newList.save();
        await board.save();
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save the List');
      }

      return dataLoader.ListLoader.load(newList.id);
    },
  },
};

export default {typeDefs, resolvers};