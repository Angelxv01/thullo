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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const types_1 = require("../../types");
const Board_1 = __importDefault(require("../../models/Board"));
const types_2 = require("../../types");
const models_1 = require("../../models");
const typeDefs = (0, apollo_server_1.gql) `
  input CreateBoardInput {
    id: ID
    title: String
    visibility: Visibility
    description: String
    coverId: String
    members: [ID!]
  }

  input PromoteUserInput {
    id: ID
    role: Role
    boardId: ID
  }

  input InviteUserInput {
    userId: [ID!]!
    boardId: ID!
  }

  input DeleteUserInput {
    userId: ID!
    boardId: ID!
  }

  extend type Mutation {
    createBoard(boardData: CreateBoardInput): Board
    promoteUser(userInput: PromoteUserInput): Board
    inviteUser(data: InviteUserInput): Board
    deleteUser(data: DeleteUserInput): Board
  }
`;
const resolvers = {
    Mutation: {
        createBoard: (_root, args, { currentUser, dataLoader: { BoardLoader }, }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!currentUser) {
                throw new apollo_server_1.ApolloError("Only logged user can create a Board");
            }
            const _b = args.boardData, { id } = _b, data = __rest(_b, ["id"]);
            if (!id && !data.visibility) {
                throw new apollo_server_1.ApolloError("Required Visibility");
            }
            const out = Object.assign(Object.assign({}, data), { visibility: data.visibility &&
                    types_2.Visibility[data.visibility], members: (_a = args.boardData.members) === null || _a === void 0 ? void 0 : _a.map((id) => ({
                    id,
                    role: types_1.Role.MEMBER,
                })) });
            let board;
            if (id) {
                board = (yield Board_1.default.findByIdAndUpdate(id, out, {
                    new: true,
                }));
            }
            else {
                // assuming on creating members is list with only one member, the owner
                board = new Board_1.default(Object.assign(Object.assign({}, out), { members: [Object.assign(Object.assign({}, out.members[0]), { role: types_1.Role.OWNER })] }));
            }
            if (!board) {
                return null;
            }
            yield board.save();
            return BoardLoader.load(board.id);
        }),
        inviteUser: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const board = yield Board_1.default.findById(args.data.boardId);
            if (!board)
                throw new apollo_server_1.ApolloError("Invalid Resource");
            const canInvite = board.members.find((member) => String(member.id) === String(ctx.currentUser.id));
            if (!canInvite)
                throw new apollo_server_1.ApolloError("Unable to invite your friend");
            const memberIds = board.members.map((member) => String(member.id));
            const members = args.data.userId.filter((id) => memberIds.indexOf(String(id)) === -1);
            const pushMember = (id) => board.members.push({ id, role: types_1.Role.MEMBER });
            members.map(pushMember);
            yield board.save();
            return board;
        }),
        deleteUser: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser) {
                throw new apollo_server_1.ApolloError("Only logged user can remove members");
            }
            const userToRemove = yield models_1.User.findById(args.data.userId);
            const board = yield Board_1.default.findById(args.data.boardId);
            if (!(userToRemove && board)) {
                throw new apollo_server_1.ApolloError("Invalid input");
            }
            const userBelongToBoard = board === null || board === void 0 ? void 0 : board.members.find((member) => String(member.id) === userToRemove.id && member.role === 2);
            const isCurrentAdmin = board === null || board === void 0 ? void 0 : board.members.find((member) => String(member.id) === ctx.currentUser.id && member.role !== 2);
            if (!(userBelongToBoard && isCurrentAdmin)) {
                console.log({
                    members: board.members,
                    toFind: userBelongToBoard,
                    current: isCurrentAdmin,
                });
                throw new apollo_server_1.ApolloError("Invalid operation");
            }
            board.members = board.members.filter((member) => String(member.id) !== String(args.data.userId));
            yield board.save();
            return board.toJSON();
        }),
    },
};
exports.default = { typeDefs, resolvers };
