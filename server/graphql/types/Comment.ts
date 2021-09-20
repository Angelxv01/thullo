import {gql} from 'apollo-server';
import DataLoader from 'dataloader';

const typeDefs = gql`
  type Comment {
    id: ID!
    text: String
    user: User!
    parentId: ID
    replies: [Comment!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

const resolvers = {
  Comment: {
    replies: (
      {id}: {id: string},
      _args: never,
      {
        dataLoader,
      }: {
        dataLoader: {LoadReplies: DataLoader<unknown, unknown, unknown>};
      }
    ) => id && dataLoader.LoadReplies.load(id),
  },
};
export default {typeDefs, resolvers};
