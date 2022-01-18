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
const Card_1 = __importDefault(require("../../models/Card"));
const typeDefs = (0, apollo_server_1.gql) `
  type List {
    id: ID!
    name: String
    cards: [Card!]!
    cardCount: Int!
  }
`;
const resolvers = {
    List: {
        cardCount: (root) => __awaiter(void 0, void 0, void 0, function* () { return Card_1.default.find({ listId: root.id }).countDocuments(); }),
        cards: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.CardList.load(root.id); }),
    },
};
exports.default = { typeDefs, resolvers };
