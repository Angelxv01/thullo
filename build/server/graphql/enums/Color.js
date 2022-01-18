"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
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
exports.default = { typeDefs, resolvers };
