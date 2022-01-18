import { ApolloError, gql } from "apollo-server";
import DataLoader from "dataloader";
import mongoose, { ObjectId } from "mongoose";
import { BoardDocument, CardDocument, ICard, IUser } from "../../types";
import List from "../../models/List";
import { Context } from "../../..";
import { Card } from "../../models";

interface ChangeListNameInput {
  data: { name: string; listId: ObjectId };
}

interface DeleteListInput {
  data: {
    id: ObjectId;
  };
}

const typeDefs = gql`
  input CreateListInput {
    name: String!
    boardId: ID!
  }

  input DeleteListInput {
    id: ID!
  }

  input ChangeListNameInput {
    name: String!
    listId: ID!
  }

  extend type Mutation {
    createList(list: CreateListInput): List
    changeListName(data: ChangeListNameInput): List
    deleteList(data: DeleteListInput): Boolean
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
        throw new ApolloError("Only logged user can create a Board");
      }

      const newList = new List({ name: list.name, boardId: list.boardId });
      const board: BoardDocument = (await dataLoader.BoardLoader.load(
        list.boardId
      )) as BoardDocument;

      if (!board) {
        throw new ApolloError("Invalid Board Id");
      }

      try {
        await newList.save();
      } catch (error) {
        console.log((error as Error).message);
        throw new ApolloError("Cannot save the List");
      }

      return dataLoader.ListLoader.load(newList.id);
    },
    changeListName: async (
      _: never,
      args: ChangeListNameInput,
      ctx: Context
    ) => {
      if (!ctx.currentUser) throw new ApolloError("Logged User Only");
      const list = await List.findByIdAndUpdate(
        args.data.listId,
        { name: args.data.name },
        { new: true }
      );
      if (!list) throw new ApolloError("Invalid list");
      await list.save();
      return list;
    },
    deleteList: async (_: never, args: DeleteListInput, ctx: Context) => {
      if (!ctx.currentUser) throw new ApolloError("Logged User Only");
      const list = await List.findByIdAndDelete(args.data.id);
      return !list || !list.$isDeleted;
    },
  },
};

export default { typeDefs, resolvers };
