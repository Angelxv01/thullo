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
const User_1 = __importDefault(require("../../models/User"));
const typeDefs = (0, apollo_server_1.gql) `
  extend type Query {
    allUser: [User!]!
    authorizedUser: User
    friendsNotInBoard(id: ID): [User!]!
  }
`;
const resolvers = {
    Query: {
        allUser: () => __awaiter(void 0, void 0, void 0, function* () {
            const users = (yield User_1.default.find());
            return users.map((user) => user.toJSON());
        }),
        authorizedUser: (_root, _args, context) => context.currentUser,
        friendsNotInBoard: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const userFriends = ctx.currentUser.friends;
            const currentBoard = (yield ctx.dataLoader.BoardLoader.load(args.id));
            const boardMemberIds = currentBoard.members.map((member) => String(member.id));
            const friendsNotInBoard = userFriends.filter((friend) => boardMemberIds.indexOf(String(friend)) === -1);
            return ctx.dataLoader.UserLoader.loadMany(friendsNotInBoard);
        }),
    },
};
exports.default = { typeDefs, resolvers };
