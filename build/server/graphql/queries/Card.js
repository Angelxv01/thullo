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
const models_1 = require("../../models");
const Label_1 = __importDefault(require("../../models/Label"));
const config_1 = require("../../utils/config");
const typeDefs = (0, apollo_server_1.gql) `
  input FindCardInput {
    keyword: String
  }
  extend type Query {
    card(id: ID!): Card
    labels: [Label!]!
    findCard(data: FindCardInput): [Card!]!
    getAllAttachments: [Attachment]
  }
`;
const resolvers = {
    Query: {
        card: (_root, args, { dataLoader: { CardLoader }, }) => __awaiter(void 0, void 0, void 0, function* () { return CardLoader.load(args.id); }),
        findCard: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const user = ctx.currentUser;
            if (!user) {
                throw new apollo_server_1.ApolloError("Logged User only");
            }
            const boards = yield models_1.Board.find({ "members.id": user.id });
            const ids = boards.map((board) => board.id);
            const cards = yield models_1.Card.find({
                title: { $regex: args.data.keyword, $options: "i" },
                boardId: { $in: ids },
            }).limit(5);
            return cards;
        }),
        labels: () => __awaiter(void 0, void 0, void 0, function* () { return Label_1.default.find(); }),
        getAllAttachments: () => {
            console.log(config_1.UPLOAD_URL);
        },
    },
};
exports.default = { typeDefs, resolvers };
