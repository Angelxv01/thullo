import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import {IUser} from '../../../types'
import Logger from '../../../utils/Logger';
import Board from '../../models/Board';

const typeDefs = gql`
  input CreateBoardInput {
    title: String!
    visibility: Visibility!
    description: String!
    coverId: String
    collaborators: [String!]!
  }
  extend type Mutation {
    createBoard(board: CreateBoardInput): Board
  }
`;
const resolvers = {
  Mutation: {
    createBoard: async (
      _root: never,
      {
        board,
      }: {
        board: {
          collaborators: string[];
          title: string;
          visibility: string;
          description: string;
        };
      },
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
      if (!currentUser) {
        throw new ApolloError('Only logged user can create a Board');
      }
      let collaborators: unknown[] = [];
      if (board.collaborators.length > 0) {
        collaborators = await UserLoader.loadMany(board.collaborators);
      }

      if (!collaborators.every(obj => obj)) {
        throw new ApolloError('Invalid collaborator id');
      }

      const newBoard = new Board({
        // owner: currentUser.id as string,
        title: board.title,
        visibility: board.visibility,
        description: board.description,
        collaborators: board.collaborators,
      });

      try {
        await newBoard.save();
        // currentUser.boards.push(newBoard._id);
        // await currentUser.save();

        const collaboratorsPromise = collaborators.reduce(
          (acc: Promise<IUser>[], obj) => {
            const user: IUser = obj as IUser;

            // user.boards.push(newBoard._id);
            // acc.push(user.save());
            return acc;
          },
          []
        );
        void Promise.all(collaboratorsPromise);
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save the board');
      }

      return BoardLoader.load(newBoard.id);
    },
  },
};

export default {typeDefs, resolvers};
