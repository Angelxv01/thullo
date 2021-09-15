import {gql} from 'apollo-server';
import List, {IList} from '../../models/List';

const typeDefs = gql`
  type List {
    id: ID!
    name: String
    cards: [Card!]!
    cardCount: Int!
  }
`;

const resolvers = {
  List: {
    cardCount: async (root: {id: string}) => {
      const list = (await List.findById(root.id)) as IList;
      return list.cards.length;
    },
  },
};

export default {typeDefs, resolvers};
