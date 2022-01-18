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
  type Attachment {
    id: ID!
    title: String
    coverId: String
    filename: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type Label {
    id: ID!
    text: String!
    color: Color!
  }
  type Card {
    id: ID!
    title: String
    description: String
    members: [User!]!
    coverId: String
    list: List!
    comments: [Comment!]!
    labels: [Label!]!
    attachments: [Attachment!]!
    author: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
const resolvers = {
    Card: {
        comments: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.CommentCard.load(root.id); }),
        labels: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.LabelLoader.loadMany(root.labels); }),
        members: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.UserLoader.loadMany(root.members); }),
        list: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.ListLoader.load(root.listId); }),
        author: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.UserLoader.load(root.author); }),
        attachments: (root, _, ctx) => __awaiter(void 0, void 0, void 0, function* () { return ctx.dataLoader.AttachmentCard.load(root.id); }),
    },
    Label: {
        color: (root) => types_1.Color[root.color],
    },
    Attachment: {
        title: (root) => root.title.replace(/^.*_/, ""),
    },
};
exports.default = { typeDefs, resolvers };
