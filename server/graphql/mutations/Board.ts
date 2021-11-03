import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import {BoardDocument, IBoard, IUser} from '../../../types'
import Logger from '../../../utils/Logger';
import Board from '../../models/Board';
import {object, string, mixed, array, Asserts} from 'yup';
import { Maybe } from 'yup/lib/types';
import { Visibility } from '../../../types/IBoard';

const boardSchema = object().shape({
  boardData: object().shape({
    id: string().trim().optional(),
    title: string().trim().optional(),
    visibility: mixed<Visibility>()
      .oneOf(Object.values(Visibility) as Maybe<Visibility>[]),
    description: string().trim().optional(),
    coverId: string().trim().optional(),
    members: array().of(string()).optional()
  })
});
type BoardInput = Asserts<typeof boardSchema>;

const typeDefs = gql`
  input CreateBoardInput {
    id: ID
    title: String
    visibility: Visibility
    description: String
    coverId: String
    members: [ID!]
  }

  extend type Mutation {
    createBoard(boardData: CreateBoardInput): Board
  }
`;

const resolvers = {
  Mutation: {
    createBoard: async (
      _root: never,
      args: unknown,
      {
        currentUser,
        dataLoader: {UserLoader, BoardLoader},
      }: {
        currentUser: IUser | undefined;
        dataLoader: {
          UserLoader: DataLoader<unknown, unknown, unknown>;
          BoardLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => {
      const {boardData}: BoardInput = await boardSchema.validate(args);
      if (!currentUser) {
        throw new ApolloError('Only logged user can create a Board');
      }
      let board: BoardDocument | undefined;
      if (boardData.id) {
        const {id, otherProps} = boardData; 
        board = Board.findByIdAndUpdate(id, otherProps, { new: true }) as unknown as BoardDocument;
      } else {
        board = new Board(boardData);
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
