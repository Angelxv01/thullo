"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Card_1 = __importStar(require("../../models/Card"));
const Board_1 = __importDefault(require("../../models/Board"));
const List_1 = __importDefault(require("../../models/List"));
const models_1 = require("../../models");
const fs_1 = require("fs");
const path_1 = require("path");
const promises_1 = require("stream/promises");
const fs_2 = __importDefault(require("fs"));
const typeDefs = (0, apollo_server_1.gql) `
  input CreateCardInput {
    id: ID
    title: String
    description: String
    boardId: ID
    listId: ID
    members: [ID!]
    coverId: String
  }
  input CreateAttachmentInput {
    cardId: ID
    title: String
    coverId: String
    url: String
    file: Upload
  }
  input ChangeList {
    cardId: ID!
    listId: ID!
  }
  input AddMemberInput {
    members: [ID!]!
    cardId: ID!
  }
  input AddLabelInput {
    id: ID!
    cardId: ID!
  }
  extend type Mutation {
    createCard(cardData: CreateCardInput): Card
    removeCard(id: ID): Boolean
    changeList(data: ChangeList): Card
    addMember(data: AddMemberInput): Card
    addLabel(data: AddLabelInput): Card
    createFileAttachment(data: CreateAttachmentInput): Attachment
    removeAttachment(id: ID): Boolean
  }
`;
const resolvers = {
    Mutation: {
        createCard: (_root, { cardData }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Login to create");
            const boardExist = yield Board_1.default.findById(cardData.boardId);
            const listExist = cardData.listId
                ? yield List_1.default.findById(cardData.listId)
                : true;
            if (!(boardExist && listExist))
                throw new apollo_server_1.ApolloError("Invalid Board or List ID");
            const { id } = cardData, newData = __rest(cardData, ["id"]);
            let card;
            if (id) {
                card = (yield Card_1.default.findByIdAndUpdate(id, newData, {
                    new: true,
                }));
            }
            else {
                card = new Card_1.default(Object.assign(Object.assign({}, newData), { author: ctx.currentUser.id }));
                card.members.push(ctx.currentUser.id);
            }
            if (!card)
                return;
            yield card.save();
            return card.toJSON();
        }),
        removeCard: (_root, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const cardToDelete = yield Card_1.default.findById(id);
            if (!cardToDelete ||
                String(cardToDelete.author) !== String(ctx.currentUser.id))
                throw new apollo_server_1.ApolloError("Unauthorized");
            yield Card_1.default.findByIdAndDelete(id);
            return true;
        }),
        createFileAttachment: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            // I receive a file and some data
            // {file: Upload, ...others}
            // Upload has properties like filename and createReadStream
            // I have to:
            // - create a unique name for the file
            // - create the pathname to save the file
            // - pipe the file
            const card = yield Card_1.default.findById(args.data.cardId);
            if (!card)
                throw new apollo_server_1.ApolloError("Invalid resources");
            // create the resource
            const attachment = new Card_1.Attachment({ cardId: args.data.cardId });
            // get the file
            const { createReadStream, filename } = yield args.data.file;
            // get the file details
            const name = `${attachment.id}_${filename}`;
            const path = (0, path_1.join)("./public", name);
            attachment.filename = name;
            attachment.title = (0, path_1.parse)(name).name;
            // pipe the file
            const stream = createReadStream();
            const out = (0, fs_1.createWriteStream)(path);
            stream.pipe(out);
            yield (0, promises_1.finished)(stream);
            // after making sure the file is saved, save the resource
            yield attachment.save();
            return attachment;
        }),
        removeAttachment: (_root, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const attachment = yield Card_1.Attachment.findByIdAndDelete(id);
            if (!attachment)
                return false;
            fs_2.default.unlinkSync((0, path_1.join)("./public", attachment.filename));
            return true;
        }),
        changeList: (_, { data }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Unauthorized");
            const cardExists = yield Card_1.default.findById(data.cardId);
            const listExists = yield List_1.default.findById(data.listId);
            if (!(cardExists && listExists) ||
                String(cardExists.boardId) !== String(listExists.boardId)) {
                throw new apollo_server_1.ApolloError("Invalid operation");
            }
            cardExists.listId = listExists.id;
            yield cardExists.save();
            return cardExists.toJSON();
        }),
        addMember: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const card = yield Card_1.default.findById(args.data.cardId);
            if (!card)
                throw new apollo_server_1.ApolloError("Invalid resource");
            const isAuthor = String(card.author) === String(ctx.currentUser.id);
            if (!isAuthor)
                throw new apollo_server_1.ApolloError("Unauthorized");
            const memberIds = card.members.map((member) => String(member));
            const users = args.data.members.filter((id) => memberIds.indexOf(String(id)) === -1);
            users.forEach((user) => card.members.push(user));
            card.save();
            return card.toJSON();
        }),
        // !!! This mutation is a toggle, not an add
        addLabel: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const label = yield models_1.Label.findById(args.data.id);
            const card = yield Card_1.default.findById(args.data.cardId);
            if (!(card && label))
                throw new apollo_server_1.ApolloError("Invalid resources");
            const isLabelInCard = card.labels.find((label) => String(label) === String(args.data.id));
            if (isLabelInCard) {
                card.labels = card.labels.filter((label) => String(label) !== String(args.data.id));
            }
            else {
                card.labels.push(label.id);
            }
            yield card.save();
            return card;
        }),
    },
};
exports.default = { typeDefs, resolvers };
