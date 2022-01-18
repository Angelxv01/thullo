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
const apollo_server_express_1 = require("apollo-server-express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const yup_1 = require("yup");
const User_1 = __importDefault(require("../../models/User"));
const config_1 = require("../../utils/config");
const userSchema = (0, yup_1.object)().shape({
    credentials: (0, yup_1.object)().shape({
        username: (0, yup_1.string)().trim().required(),
        password: (0, yup_1.string)()
            .trim()
            .required()
            .min(8, "Password should be long at least 8"),
    }),
});
const addFriendSchema = (0, yup_1.object)().shape({ userId: (0, yup_1.string)().trim().required() });
const typeDefs = (0, apollo_server_1.gql) `
  input UserInput {
    username: String!
    password: String!
  }

  extend type Mutation {
    login(credentials: UserInput): Token
    createUser(credentials: UserInput): User
    addFriend(userId: String!): User
  }
`;
const resolvers = {
    Mutation: {
        login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { credentials } = yield userSchema.validate(args, {
                stripUnknown: false,
            });
            const user = (yield User_1.default.findOne({
                username: credentials.username,
            }));
            const isPasswordValid = user
                ? yield user.comparePasswords(credentials.password)
                : false;
            if (!(user && isPasswordValid)) {
                throw new apollo_server_express_1.UserInputError("Invalid credentials");
            }
            const token = { username: user.username, id: user.id };
            // add this only after development {expiresIn: 60 * 60}
            // bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZ2VsIiwiaWQiOiI2MTQwY2NjYWNiZTAxNWNmYzQzMTU2MTgiLCJpYXQiOjE2MzE4MjUzNTZ9.TgXp8KqXIjxdxxz0fAxzrn3bFCSeZ32-hld3r2B1Xl8
            return { value: jsonwebtoken_1.default.sign(token, config_1.SECRET) };
        }),
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { credentials } = yield userSchema.validate(args, {
                stripUnknown: false,
            });
            const user = new User_1.default({
                username: credentials.username,
                passwordHash: credentials.password,
            });
            yield user.save();
            return user.toJSON();
        }),
        addFriend: (_, args, { currentUser }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!currentUser)
                throw new apollo_server_express_1.ApolloError("Only logged user can add friends");
            const { userId } = yield addFriendSchema.validate(args);
            const user = yield User_1.default.findById(userId);
            if (!user)
                return null;
            currentUser.friends.push(user.id);
            user.friends.push(currentUser.id);
            yield currentUser.save();
            yield user.save();
            return user.toJSON();
        }),
    },
};
exports.default = { typeDefs, resolvers };
