import { gql } from 'apollo-server';

const typeDefs = gql`
  enum Color {
    GREEN1
    YELLOW
    ORANGE
    RED
    BLUE1
    BLUE3
    GREEN3
    GRAY1
    GRAY2
    GRAY3
    GRAY4
    GRAY5
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
