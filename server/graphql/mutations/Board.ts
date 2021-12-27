import { ApolloError, gql } from 'apollo-server';
import DataLoader from 'dataloader';
import { BoardDocument, Member, Role, UserDocument } from '../../types';
import Board from '../../models/Board';
import { Visibility } from '../../types';
import { ObjectId } from 'mongoose';
import { User } from '../../models';

interface BoardInput {
  id?: ObjectId;
  title?: string;
  visibility?: Visibility;
  description?: string;
  coverId?: string;
  members?: ObjectId[];
}

interface InviteUserInput {
  data: {
    userId: ObjectId[];
    boardId: ObjectId;
  };
}

interface DeleteUserInput {
  data: {
    userId: ObjectId;
    boardId: ObjectId;
  };
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

  input InviteUserInput {
    userId: [ID!]!
    boardId: ID!
  }

  input DeleteUserInput {
    userId: ID!
    boardId: ID!
  }

  extend type Mutation {
    createBoard(boardData: CreateBoardInput): Board
    promoteUser(userInput: PromoteUserInput): Board
    inviteUser(data: InviteUserInput): Board
    deleteUser(data: DeleteUserInput): Board
  }
`;

const resolvers = {
  Mutation: {
    createBoard: async (
      _root: never,
      args: { boardData: BoardInput },
      {
        currentUser,
        dataLoader: { BoardLoader },
      }: {
        currentUser: UserDocument | undefined;
        dataLoader: {
          UserLoader: DataLoader<unknown, unknown, unknown>;
          BoardLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError('Only logged user can create a Board');
      }

      const { id, ...data } = args.boardData;
      if (!id && !data.visibility) {
        throw new ApolloError('Required Visibility');
      }
      const out = {
        ...data,
        visibility:
          data.visibility &&
          (Visibility[data.visibility] as unknown as Visibility),
        members: args.boardData.members?.map(id => ({
          id,
          role: Role.MEMBER,
        })) as Member[],
      };

      let board: BoardDocument | undefined;
      if (id) {
        board = (await Board.findByIdAndUpdate(id, out, {
          new: true,
        })) as unknown as BoardDocument;
      } else {
        board = new Board(out);
      }

      if (!board) {
        return null;
      }

      await board.save();
      return BoardLoader.load(board.id);
    },
    inviteUser: async (
      _: never,
      args: InviteUserInput,
      ctx: {
        currentUser: UserDocument;
      }
    ) => {
      if (!ctx.currentUser) throw new ApolloError('Logged User Only');
      const board = await Board.findById(args.data.boardId);
      if (!board) throw new ApolloError('Invalid Resource');

      const canInvite = board.members.find(
        member => String(member.id) === String(ctx.currentUser.id)
      );
      if (!canInvite) throw new ApolloError('Unable to invite your friend');
      const memberIds = board.members.map(member => String(member.id));
      const members = args.data.userId.filter(
        id => memberIds.indexOf(String(id)) === -1
      );
      const pushMember = (id: ObjectId) =>
        board.members.push({ id, role: Role.MEMBER });
      members.map(pushMember);
      await board.save();

      return board;
    },
    deleteUser: async (
      _: never,
      args: DeleteUserInput,
      ctx: { currentUser: UserDocument }
    ) => {
      if (!ctx.currentUser) {
        throw new ApolloError('Only logged user can remove members');
      }

      const userToRemove = await User.findById(args.data.userId);
      const board = await Board.findById(args.data.boardId);
      if (!(userToRemove && board)) {
        throw new ApolloError('Invalid input');
      }

      const userBelongToBoard = board?.members.find(
        member => String(member.id) === userToRemove.id && member.role === 2
      );
      const isCurrentAdmin = board?.members.find(
        member => String(member.id) === ctx.currentUser.id && member.role !== 2
      );
      if (!(userBelongToBoard && isCurrentAdmin)) {
        console.log({
          members: board.members,
          toFind: userBelongToBoard,
          current: isCurrentAdmin,
        } as Record<string, unknown>);
        throw new ApolloError('Invalid operation');
      }

      board.members = board.members.filter(
        member => String(member.id) !== String(args.data.userId)
      );

      await board.save();
      return board.toJSON();
    },
  },
};

export default { typeDefs, resolvers };
