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
        replies: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.CommentReply.load(root.id); }),
        user: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.UserLoader.load(root.user); }),
    },
};
exports.default = { typeDefs, resolvers };
