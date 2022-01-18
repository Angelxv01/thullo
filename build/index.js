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
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./server/utils/config");
const schema_1 = __importDefault(require("./server/graphql/schema"));
const User_1 = __importDefault(require("./server/models/User"));
const createDataLoaders_1 = __importDefault(require("./server/utils/createDataLoaders"));
const express_1 = __importDefault(require("express"));
const graphql_upload_1 = require("graphql-upload");
const fs_1 = require("fs");
const path_1 = require("path");
mongoose_1.default
    .connect(config_1.MONGODB || "")
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.error(err));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.default,
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                const auth = req ? req.headers.authorization : null;
                const dataLoader = (0, createDataLoaders_1.default)();
                if (auth && auth.toLowerCase().startsWith("bearer ")) {
                    const { id } = jsonwebtoken_1.default.verify(auth.substring(7), config_1.SECRET);
                    const currentUser = yield User_1.default.findById(id);
                    return { currentUser, dataLoader };
                }
                return { dataLoader };
            }),
        });
        yield server.start();
        const app = (0, express_1.default)();
        app.use(express_1.default.static("client/build"));
        app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 5000000, maxFiles: 1 }));
        app.use(express_1.default.json());
        app.post("/download", (req, res) => {
            // console.log(req.body);
            const path = (0, path_1.join)(config_1.UPLOAD_URL.href, "public", req.body.path);
            if ((0, fs_1.existsSync)(path))
                return res.download(path, req.body.path);
            return res.status(400);
        });
        server.applyMiddleware({ app });
        yield new Promise((r) => app.listen({ port: config_1.PORT || 4000 }, r));
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}
startServer();
