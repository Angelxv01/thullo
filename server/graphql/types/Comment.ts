import {gql} from 'apollo-server';
import DataLoader from 'dataloader';

const typeDefs = gql`
  type Comment {
    id: ID!
    text: String
    user: User!
    replies: [Comment!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Comment: {
    replies: async (
      {id}: {id: string},
      _args: never,
      {
        dataLoader,
      }: {
        dataLoader: {LoadReplies: DataLoader<unknown, unknown, unknown>};
      }
    ) => {
      const res = await dataLoader.LoadReplies.load(id);
      return res;
    },
    user: (
      {user}: {user: string},
      _args: never,
      {
        dataLoader: {UserLoader},
      }: {dataLoader: {UserLoader: DataLoader<unknown, unknown, unknown>}}
    ) => UserLoader.load(user),
  },
};
export default {typeDefs, resolvers};
