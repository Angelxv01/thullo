"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  enum Role {
    OWNER
    ADMIN
    MEMBER
  }
`;
const resolvers = {};
exports.default = { typeDefs, resolvers };
