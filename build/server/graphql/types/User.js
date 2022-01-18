"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type User {
    id: ID!
    username: String!
    avatar: String
    bio: String
    phone: String
    email: String
    boards: [Board!]!
    friends: [User!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Token {
    value: String!
  }
`;
const resolvers = {
    User: {
        friends: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.UserLoader.loadMany(root.friends); }),
        boards: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.UserBoard.load(root.id); }),
    },
};
exports.default = { typeDefs, resolvers };
