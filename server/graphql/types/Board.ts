import { gql } from 'apollo-server';
import { Context } from '../..';
import { BoardDocument, Member, Role, Visibility } from '../../../types';

const typeDefs = gql`
  type Member {
    user: User!
    role: Role!
  }

  type Board {
    id: ID!
    title: String
    visibility: Visibility!
    description: String
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
    lists: async (root: BoardDocument, _: never, ctx: Context) =>
      ctx.dataLoader.ListBoard.load(root.id),
    visibility: (root: BoardDocument) => Visibility[root.visibility],
    cards: async (root: BoardDocument, _: never, ctx: Context) =>
      ctx.dataLoader.CardBoard.load(root.id),
    labels: async (root: BoardDocument, _: never, ctx: Context) =>
      ctx.dataLoader.LabelLoader.load(root.id),
  },
  Member: {
    user: async (root: Member, _: never, ctx: Context) =>
      ctx.dataLoader.UserLoader.load(root.id),
    role: (root: { role: number }) => Role[root.role],
  },
};

export default { typeDefs, resolvers };
