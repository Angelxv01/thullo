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
const List_1 = __importDefault(require("../../models/List"));
const typeDefs = (0, apollo_server_1.gql) `
  input CreateListInput {
    name: String!
    boardId: ID!
  }

  input DeleteListInput {
    id: ID!
  }

  input ChangeListNameInput {
    name: String!
    listId: ID!
  }

  extend type Mutation {
    createList(list: CreateListInput): List
    changeListName(data: ChangeListNameInput): List
    deleteList(data: DeleteListInput): Boolean
  }
`;
const resolvers = {
    Mutation: {
        createList: (_root, { list, }, { currentUser, dataLoader, }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!currentUser) {
                throw new apollo_server_1.ApolloError("Only logged user can create a Board");
            }
            const newList = new List_1.default({ name: list.name, boardId: list.boardId });
            const board = (yield dataLoader.BoardLoader.load(list.boardId));
            if (!board) {
                throw new apollo_server_1.ApolloError("Invalid Board Id");
            }
            try {
                yield newList.save();
            }
            catch (error) {
                console.log(error.message);
                throw new apollo_server_1.ApolloError("Cannot save the List");
            }
            return dataLoader.ListLoader.load(newList.id);
        }),
        changeListName: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const list = yield List_1.default.findByIdAndUpdate(args.data.listId, { name: args.data.name }, { new: true });
            if (!list)
                throw new apollo_server_1.ApolloError("Invalid list");
            yield list.save();
            return list;
        }),
        deleteList: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const list = yield List_1.default.findByIdAndDelete(args.data.id);
            return !list || !list.$isDeleted;
        }),
    },
};
exports.default = { typeDefs, resolvers };
