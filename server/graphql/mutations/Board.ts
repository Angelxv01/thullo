import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import {BoardDocument, IBoard, IUser, Member, Role} from '../../../types'
import Logger from '../../../utils/Logger';
import Board from '../../models/Board';
import {object, string, mixed, Asserts} from 'yup';
import { Maybe } from 'yup/lib/types';
import { Visibility } from '../../../types';
import { ObjectId } from 'mongoose';

const boardSchema = object().shape({
  boardData: object().shape({
    id: string().trim().optional(),
    title: string().trim().optional(),
    visibility: mixed<Visibility>()
      .oneOf(Object.values(Visibility) as Maybe<Visibility>[]),
    description: string().trim().optional(),
    coverId: string().trim().optional(),
    // members: array().optional().of(string())
  })
});
// type BoardInput = Asserts<typeof boardSchema>;

interface BoardInput {
  id?: ObjectId;
  title?: string;
  visibility?: Visibility;
  description?: string;
  coverId?: string;
  members?: (ObjectId)[];
}

interface PromoteUserInput {
  id: ObjectId;
  role: Role;
  boardId: ObjectId;
}

const typeDefs = gql`
  input CreateBoardInput {
    id: ID
    title: String
    visibility: Visibility
    description: String
    coverId: String
    members: [ID!]
  }

  input PromoteUserInput {
    id: ID
    role: Role
    boardId: ID
  }

  extend type Mutation {
    createBoard(boardData: CreateBoardInput): Board
    promoteUser(userInput: PromoteUserInput): Board
  }
`;

const resolvers = {
  Mutation: {
    createBoard: async (
      _root: never,
      args: {boardData: BoardInput},
      {
        currentUser,
        dataLoader: {BoardLoader},
      }: {
        currentUser: IUser | undefined;
        dataLoader: {
          UserLoader: DataLoader<unknown, unknown, unknown>;
          BoardLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => {
      // const {boardData}: BoardInput = await boardSchema.validate(args);
      if (!currentUser) {
        throw new ApolloError('Only logged user can create a Board');
      }
      const out = {
        ...args.boardData,
        members: args.boardData.members?.map((id) => ({id, role: Role.MEMBER})) as Member[]
      }
      let board: BoardDocument | undefined;
      if (args.boardData.id) {
        board = await Board.findByIdAndUpdate(args.boardData.id, out, { new: true }) as unknown as BoardDocument;
      } else {
        board = new Board(out);
      }

      if (!board) {
        return null;
      }

      try {
        await board.save();
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save or update the board');
      }

      return BoardLoader.load(board.id);
    },
  },
};

export default {typeDefs, resolvers};
