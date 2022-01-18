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
const Label_1 = __importDefault(require("../../models/Label"));
const ILabel_1 = require("../../types/ILabel");
const models_1 = require("../../models");
const typeDefs = (0, apollo_server_1.gql) `
  input createLabelInput {
    boardId: ID!
    text: String!
    color: Color
    cardId: ID
  }

  extend type Mutation {
    createLabel(labelData: createLabelInput): Label
  }
`;
const resolvers = {
    Mutation: {
        createLabel: (_root, { labelData, }, { currentUser, }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!currentUser) {
                throw new apollo_server_1.ApolloError("Only logged user can create a List");
            }
            const board = yield models_1.Board.findById(labelData.boardId);
            if (!board)
                throw new apollo_server_1.ApolloError("Invalid board");
            const label = new Label_1.default({
                text: labelData.text,
                color: ILabel_1.Color[labelData.color],
                boardId: labelData.boardId,
            });
            yield label.save();
            if (!labelData.cardId)
                return label.toJSON();
            const card = yield models_1.Card.findById(labelData.cardId);
            if (!card)
                throw new apollo_server_1.ApolloError("Invalid Card");
            card.labels.push(label.id);
            yield card.save();
            return label.toJSON();
        }),
    },
};
exports.default = { typeDefs, resolvers };
