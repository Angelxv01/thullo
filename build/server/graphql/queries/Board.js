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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const Board_1 = __importDefault(require("../../models/Board"));
const typeDefs = (0, apollo_server_1.gql) `
  extend type Query {
    allBoards: [Board!]!
    board(id: ID!): Board
  }
`;
const resolvers = {
    Query: {
        allBoards: () => __awaiter(void 0, void 0, void 0, function* () { return yield Board_1.default.find(); }),
        board: (_root, args, { dataLoader: { BoardLoader }, }) => __awaiter(void 0, void 0, void 0, function* () { return BoardLoader.load(args.id); }),
    },
};
exports.default = { typeDefs, resolvers };
