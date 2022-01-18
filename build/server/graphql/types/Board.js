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
const types_1 = require("../../types");
const typeDefs = (0, apollo_server_1.gql) `
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
        lists: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.ListBoard.load(root.id); }),
        visibility: (root) => types_1.Visibility[root.visibility],
        cards: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.CardBoard.load(root.id); }),
        labels: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.LabelBoard.load(root.id); }),
    },
    Member: {
        user: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.UserLoader.load(root.id); }),
        role: (root) => types_1.Role[root.role],
    },
};
exports.default = { typeDefs, resolvers };
