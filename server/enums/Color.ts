import {gql} from 'apollo-server';

const typeDefs = gql`
  enum Color {
    GREEN
    YELLOW
    ORANGE
    RED
    BLUE
    AQUA
    SAGE
    GRAY1
    GRAY2
    GRAY3
    GRAY4
    GRAY5
  }
`;

const resolvers = {};

export default {typeDefs, resolvers};
