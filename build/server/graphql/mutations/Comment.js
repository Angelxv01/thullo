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
const Comment_1 = __importDefault(require("../../models/Comment"));
const Card_1 = __importDefault(require("../../models/Card"));
const typeDefs = (0, apollo_server_1.gql) `
  input CreateComment {
    commentId: ID
    cardId: ID
    text: String
  }
  input EditComment {
    commentId: ID
    text: String
  }
  extend type Mutation {
    createComment(commentData: CreateComment): Comment
    editComment(data: EditComment): Comment
    deleteComment(id: ID): Boolean
  }
`;
const resolvers = {
    Mutation: {
        createComment: (_, { commentData }, { currentUser, }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!currentUser) {
                throw new apollo_server_1.ApolloError("Only logged user can create Comment");
            }
            try {
                const card = yield Card_1.default.findById(commentData.cardId);
                if (!(card || commentData.commentId))
                    throw new apollo_server_1.ApolloError("Invalid Card");
            }
            catch (error) {
                throw new apollo_server_1.ApolloError("Invalid Card");
            }
            const comment = new Comment_1.default({
                cardId: commentData.cardId,
                parentId: commentData.commentId,
                text: commentData.text,
                user: currentUser.id,
            });
            try {
                yield comment.save();
            }
            catch (error) {
                console.error(error);
                throw new apollo_server_1.ApolloError("Cannot save the comment");
            }
            return comment;
        }),
        editComment: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const comment = yield Comment_1.default.findById(args.data.commentId);
            const card = yield Card_1.default.findById(comment === null || comment === void 0 ? void 0 : comment.cardId);
            if (!(comment && card))
                throw new apollo_server_1.ApolloError("Invalid resources");
            if (String(card.author) !== String(ctx.currentUser.id))
                throw new apollo_server_1.ApolloError("Unauthorized");
            comment.text = args.data.text || comment.text;
            yield comment.save();
            return comment.toJSON();
        }),
        deleteComment: (_, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.currentUser)
                throw new apollo_server_1.ApolloError("Logged User Only");
            const comment = yield Comment_1.default.findById(id);
            const card = yield Card_1.default.findById(comment === null || comment === void 0 ? void 0 : comment.cardId);
            if (!(comment && card))
                throw new apollo_server_1.ApolloError("Invalid resources");
            if (String(card.author) !== String(ctx.currentUser.id))
                throw new apollo_server_1.ApolloError("Unauthorized");
            yield comment.remove();
            return true;
        }),
    },
};
exports.default = { typeDefs, resolvers };
