"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const merge_1 = require("@graphql-tools/merge");
const apollo_server_1 = require("apollo-server");
const graphql_scalars_1 = require("graphql-scalars");
const graphql_upload_1 = require("graphql-upload");
// TYPES
const Card_1 = __importDefault(require("./types/Card"));
const Board_1 = __importDefault(require("./types/Board"));
const List_1 = __importDefault(require("./types/List"));
const User_1 = __importDefault(require("./types/User"));
const Comment_1 = __importDefault(require("./types/Comment"));
// ENUMS
const Color_1 = __importDefault(require("./enums/Color"));
const Visibility_1 = __importDefault(require("./enums/Visibility"));
const Role_1 = __importDefault(require("./enums/Role"));
// QUERIES
const Card_2 = __importDefault(require("./queries/Card"));
const Board_2 = __importDefault(require("./queries/Board"));
const User_2 = __importDefault(require("./queries/User"));
// MUTATIONS
const User_3 = __importDefault(require("./mutations/User"));
const Board_3 = __importDefault(require("./mutations/Board"));
const List_2 = __importDefault(require("./mutations/List"));
const Card_3 = __importDefault(require("./mutations/Card"));
const Comment_2 = __importDefault(require("./mutations/Comment"));
const Label_1 = __importDefault(require("./mutations/Label"));
const rootTypeDefs = (0, apollo_server_1.gql) `
  scalar Upload

  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;
const typeDefs = [
    graphql_scalars_1.DateTimeTypeDefinition,
    rootTypeDefs,
    Card_1.default.typeDefs,
    List_1.default.typeDefs,
    Board_1.default.typeDefs,
    User_1.default.typeDefs,
    Comment_1.default.typeDefs,
    Color_1.default.typeDefs,
    Visibility_1.default.typeDefs,
    Role_1.default.typeDefs,
    Card_2.default.typeDefs,
    Board_2.default.typeDefs,
    User_2.default.typeDefs,
    User_3.default.typeDefs,
    Board_3.default.typeDefs,
    List_2.default.typeDefs,
    Card_3.default.typeDefs,
    Comment_2.default.typeDefs,
    Label_1.default.typeDefs,
];
const resolvers = (0, merge_1.mergeResolvers)([
    { Upload: graphql_upload_1.GraphQLUpload },
    { DateTime: graphql_scalars_1.DateTimeResolver },
    Card_1.default.resolvers,
    List_1.default.resolvers,
    Board_1.default.resolvers,
    User_1.default.resolvers,
    Comment_1.default.resolvers,
    Color_1.default.resolvers,
    Visibility_1.default.resolvers,
    Role_1.default.resolvers,
    Card_2.default.resolvers,
    Board_2.default.resolvers,
    User_2.default.resolvers,
    User_3.default.resolvers,
    Board_3.default.resolvers,
    List_2.default.resolvers,
    Card_3.default.resolvers,
    Comment_2.default.resolvers,
    Label_1.default.resolvers,
]);
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
exports.default = schema;
